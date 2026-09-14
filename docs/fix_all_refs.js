const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');

const SOURCE = path.resolve(__dirname, '..', 'source');
const targets = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(md|yml|yaml)$/.test(e.name)) targets.push(p);
  }
})(SOURCE);

const dry = process.argv.includes('--dry');
let converted = 0;

function toMd(v) {
  if (typeof v === 'string') return v.trim();
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const keys = Object.keys(v);
    if (keys.includes('title') || keys.includes('url')) {
      const t = v.title != null ? String(v.title) : '';
      const u = v.url != null ? String(v.url) : '';
      if (t && u) return `[${t}](${u})`;
      return t || u;
    }
    return '';
  }
  return '';
}

for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes('references')) continue;
  // front-matter block
  const m = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  let data = null;
  const block = m ? m[1] : s;
  try { data = YAML.load(block); } catch (e) { continue; }
  if (data == null || data.references === undefined) continue;
  let refs = data.references;
  if (!['object', 'string'].includes(typeof (Array.isArray(refs) ? 'array' : typeof refs))) continue;
  // only touch if nested-array or object
  const flat = Array.isArray(refs) ? refs : [refs];
  const anyNonStr = flat.some(r => typeof r !== 'string');
  if (!anyNonStr) continue;
  // build new array of md strings
  let newRefs = [];
  for (const r of flat) {
    if (Array.isArray(r)) { for (const rr of r) { const md = toMd(rr); if (md) newRefs.push(md); } }
    else { const md = toMd(r); if (md) newRefs.push(md); }
  }
  // if already md strings, keep; if empty skip
  if (newRefs.some(x => /^\[.*\]\(.*\)$/.test(x))) {
    // mix - just keep all as-is strings
    newRefs = flat.map(toMd).filter(Boolean);
  }
  // rebuild front matter: replace references line & following lines
  const newMeta = block.replace(/^\s*references:[^\n]*\n(?:\s+.*\n)*/m, '');
  const refBlock = newRefs.length
    ? `references:\n${newRefs.map(x => `  - '${x.replace(/'/g, "\\'")}'`).join('\n')}\n`
    : '';
  const rebuilt = m
    ? `---\n${newMeta.trimEnd()}\n${refBlock}---\n${s.slice(m[0].length)}`
    : `---\n${newMeta.trimEnd()}\n${refBlock}---\n`;
  if (dry) {
    console.log('=====', path.relative(process.cwd(), f));
    console.log('refs =>', JSON.stringify(newRefs));
  } else {
    fs.writeFileSync(f, rebuilt);
    converted++;
  }
}
console.log(converted + ' files converted', dry ? '(DRY)' : '(APPLIED)');
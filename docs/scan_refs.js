const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');

const ROOT = path.resolve(__dirname, '..', 'source', 'wiki');
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) files.push(p);
  }
})(ROOT);

let bad = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const m = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) continue;
  let data;
  try { data = YAML.load(m[1]); } catch (e) { console.log('YAML ERR:', f, e.message); continue; }
  if (data == null) continue;
  const refs = data.references;
  if (refs === undefined) continue;
  // ensure array of strings
  let issue = null;
  if (!Array.isArray(refs)) { issue = 'not an array: ' + JSON.stringify(refs).slice(0,60); }
  else {
    const nonStr = refs.filter(r => typeof r !== 'string');
    if (nonStr.length) issue = 'non-string elements: ' + JSON.stringify(nonStr).slice(0,60);
    else if (refs.some(r => r.trim() === '')) issue = 'empty string element';
  }
  if (issue) {
    bad++;
    console.log('BAD:', path.relative(process.cwd(), f), '=>', issue);
    console.log('   refs=', JSON.stringify(refs));
  }
}
console.log('total bad:', bad);
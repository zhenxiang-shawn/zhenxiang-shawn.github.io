const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');

const ROOT = path.resolve(__dirname, '..', 'source');
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md') || e.name.endsWith('.yml') || e.name.endsWith('.yaml')) files.push(p);
  }
})(ROOT);

let bad = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  let content = s;
  let data = null;
  const m = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (m) {
    try { data = YAML.load(m[1]); } catch (e) { /* not front-matter yml whole file */ }
  } else {
    try { data = YAML.load(s); } catch (e) { continue; }
  }
  if (data == null) continue;
  let refs = data.references;
  if (refs === undefined) continue;
  let issue = null;
  if (!Array.isArray(refs)) issue = 'not array';
  else {
    const nonStr = refs.filter(r => typeof r !== 'string');
    if (nonStr.length) issue = 'non-string: ' + JSON.stringify(nonStr).slice(0,80);
  }
  if (issue) { bad++; console.log('BAD:', path.relative(process.cwd(), f), issue); }
}
console.log('bad:', bad);
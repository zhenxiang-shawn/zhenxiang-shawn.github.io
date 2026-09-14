const fs = require('fs');
const path = require('path');
const SOURCE = path.resolve(__dirname, '..', 'source');
const files = [];
(function walk(dir){ for (const e of fs.readdirSync(dir,{withFileTypes:true})) { const p=path.join(dir,e.name); e.isDirectory()?walk(p):(/\.(md|yml)$/.test(e.name)&&files.push(p)); } })(SOURCE);
const dry = process.argv.includes('--dry');
let n=0;
for (const f of files){
  const s=fs.readFileSync(f,'utf8');
  // remove any line that is ONLY whitespace + "url: ..." found in the front-matter (before first ---) 
  const m=s.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if(!m) continue;
  const fm=m[1];
  const lines=fm.split('\n');
  const out=lines.filter(l=>!/^\s+url:\s*\S+\s*$/.test(l));
  const cleaned=out.join('\n');
  if(cleaned!==fm){
    n++;
    const rebuilt=s.replace(fm,cleaned);
    if(!dry) fs.writeFileSync(f,rebuilt);
    else console.log('fixed:',path.relative(process.cwd(),f));
  }
}
console.log(n+' files cleaned',dry?'(DRY)':'(APPLIED)');
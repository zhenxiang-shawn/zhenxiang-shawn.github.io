const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'source', 'wiki');
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) files.push(p);
  }
})(ROOT);

const dry = process.argv.includes('--dry');

// 混乱结构有两种：
//   A)   -   - 'TITLE'
//          url: URL
//   B)   -   - '\'TITLE\''
//          url: URL   (title 被转义引号包裹导致 term 前后带 \'，实际 title 中间无转义引号时是单引号外再叠单引号)
// 观察实际 leetcode 是:   -   - '\'LeetCode 226. 翻转二叉树\''
// 而 learn_python 是:     -   - 'Python 100 Days'
// 差异在于第一版脚本写入时 title 含 ' 才会转义，纯文本 title 只被单引号包裹。
// 但 leetcode 的 title 本身无单引号，为何有 \'？因为第一版脚本用 replace(/'/g,"\\'") 对所有 title 做了转义。
// 而 learn_python 用的分支不同。 为稳妥，两种 title 提取都做。

// 处理每个文件：把 "  -   - '__TITLE__'\n    url: URL" 转成 "  - '[TITLE](URL)'"
function cleanTitle(v) {
  // strip any leading/trailing mix of quote and backslash-quote wrappers
  v = v.trim();
  while (/^['\\]+/.test(v) || /['\\]+$/.test(v)) {
    v = v.replace(/^['\\]+/, '');
    v = v.replace(/['\\]+$/, '');
  }
  return v;
}

function transform(s) {
  // chunk-based: match a title line then a following url line within references block
  const lines = s.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const next = lines[i + 1];
    // title line starting with "  -   - "
    const m = ln.match(/^(\s*-)   - (.+)$/); // "  -" + "   - " title
    if (m && next) {
      const urlM = next.match(/^\s*(?:-\s*)?url:\s*(\S+)\s*$/);
      if (urlM) {
        const title = cleanTitle(m[2]);
        out.push(`  - '[${title}](${urlM[1]})'`);
        i++; // skip url line
        continue;
      }
    }
    out.push(ln);
  }
  return out.join('\n');
}

let changed = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const before = s;
  const ns = transform(s);
  if (ns !== before) {
    changed++;
    if (!dry) fs.writeFileSync(f, ns);
    else {
      console.log('=====', path.relative(process.cwd(), f));
      // show only refs diff
      const o = before.split('\n').filter(l => /references|  -|    url/.test(l)).join('\n');
      const n = ns.split('\n').filter(l => /references|  -|    url/.test(l)).join('\n');
      console.log('OLD:\n'+o+'\nNEW:\n'+n+'\n');
    }
  }
}
console.log('changed files:', changed, dry ? '(DRY)' : '(APPLIED)');
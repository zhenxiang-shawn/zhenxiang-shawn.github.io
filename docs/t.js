const x = "'\\'LeetCode 226. 翻转二叉树\\''";
console.log('raw:', JSON.stringify(x));
let v = x;
v = v.replace(/^\\'+/, '').replace(/\\'+$/, '');
console.log('after escapes:', JSON.stringify(v));
v = v.replace(/^'+/, '').replace(/'+$/, '');
console.log('after quotes:', JSON.stringify(v));
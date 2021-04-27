const path = require('path');
const fpath = 'a/b/c/d/f/index.html';

const filename = path.basename(fpath);
console.log(filename); // index.html
// 加入扩展名会把扩展名去掉
const filename2 = path.basename(fpath, ".html");
console.log(filename2); // index
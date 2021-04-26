const path = require('path');

// ../ 会抵消前面的路径 ./ 不会
const pathStr = path.join('a/', 'b/c/d', '../', './f');
console.log(pathStr); // 'a\b\c\f'

const pathStr2 = path.join(__dirname, './files/1.txt');
console.log(pathStr2);
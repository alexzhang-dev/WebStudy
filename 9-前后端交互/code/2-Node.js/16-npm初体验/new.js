// 老旧的方法步骤繁多
// 我们直接使用moment包
// 1. npm install moment
// 2. 去看 moment 的api  http://momentjs.cn/
const moment = require('moment');
const date = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(date);
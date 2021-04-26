const fs = require('fs');

// 第1个参数：写入的文件路径
// 第2个参数：需要写入的内容
// 第3个参数：以什么编码写入，默认utf8
// 第4个参数，写入后执行的回调函数，参数err错误信息
fs.writeFile("files/2.txt", "使用Node.js的fs模块向文件写入内容", "utf8", err => {
    console.log(err);
})
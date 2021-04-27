const fs = require('fs');

fs.readFile('files/1.txt', 'utf-8', (err, msg) => {
    // 如果失败信息对象有内容，那么就是读取失败
    if (err) {
        return console.log("文件读取失败：" + err);
    }
    console.log("文件读取成功：" + msg);
});
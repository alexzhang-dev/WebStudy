const fs = require('fs');
fs.writeFile('files/2.txt', 'hello, Node.js!', err => {
    if (err) {
        return console.log("文件写入失败，原因如下：" + err);
    }
    console.log("文件写入成功！");
});
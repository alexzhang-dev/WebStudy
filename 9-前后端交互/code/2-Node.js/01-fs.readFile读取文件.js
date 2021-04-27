// 1. 导入 fs 模块
const fs = require('fs');
// 2. fs 内置方法 readFile 读取文件
//    参数1：读取文件的路径
//    参数2：编码，可选
//    参数3：读取成功后的回调
fs.readFile('files/1.txt', 'utf8', (err, dataStr) => {
    // 2.1 打印失败的结果
    // 如果读取成功，显示null
    // 如果读取失败，err的值为错误对象，dataStr的值为undefined
    console.log(err);
    console.log('------------');
    // 2.2 打印成功的结果
    console.log(dataStr);
});
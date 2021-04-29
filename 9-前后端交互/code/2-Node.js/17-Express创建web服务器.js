// 1. 导入 express
const express = require('express');
// 2. 创建 web 服务器
const app = express();

// 3. 调用 app.listen(端口号,启动成功的回调函数)即可启动服务器
app.listen(80, () => {
    console.log('express server is running at http://127.0.0.1');
});
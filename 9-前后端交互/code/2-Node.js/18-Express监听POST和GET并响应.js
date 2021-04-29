const express = require('express');
const app = express();

// 监听 GET 请求
app.get('/user', (req, resp) => {
    // resp.send() 向客户端响应信息
    resp.send({
        name: "zs",
        age: 18
    });
});

// 监听 POST 请求
app.post('/user', (req, resp) => {
    // resp.send() 向客户端响应信息
    resp.send('请求成功');
});

app.listen(80, () => {
    console.log('express server is running at http://127.0.0.1');
});
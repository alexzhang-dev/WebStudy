const express = require('express');
const app = express();

// URL 地址中，可以通过 :参数名 的形式，匹配动态参数值
// 动态字符串请求： http://127.0.0.1/user/2 
app.get('/user/:id', (req, resp) => {
    // req.params默认是一个空对象
    // 里面存放动态参数
    resp.send(req.params);
});

app.listen(80, () => {
    console.log('express server is running at http://127.0.0.1');
});
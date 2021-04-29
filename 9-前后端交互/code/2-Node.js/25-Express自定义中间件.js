// 此中间件用于解析客户端传入的查询字符串  name=zs&age=18 将类似数据转为对象格式
const express = require('express');
const app = express();
// 引入 模块
const router = require('./router/parseRequst');

app.use(router);

app.post('/user', (req, res) => {
    res.send(req.body);
})

app.listen(80);
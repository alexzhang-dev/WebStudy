const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    // req.query 默认是一个空对象
    // 客户端使用 ?name=zs&age=20 这种请求
    // 可以使用 req.query 访问
    // req.name   req.age
    resp.send(req.query);
});

app.listen(80, () => {
    console.log('express server is running at http://127.0.0.1');
});
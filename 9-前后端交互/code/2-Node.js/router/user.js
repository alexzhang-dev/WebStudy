// 1. 加载 express 模块
const express = require('express');
// 2. 创建路由
const router = express.Router();

// 3. 挂载 GET 请求
router.get('/user/getlist', (req, resp) => {
    resp.send('get user list.');
});
// 4. 挂载 POST 请求
router.post('/user/add', (req, resp) => {
    resp.send('add user.');
});

// 5. 暴露路由对象
module.exports = {
    router
}
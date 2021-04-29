// 此中间件用于解析客户端传入的查询字符串  name=zs&age=18 将类似数据转为对象格式
const express = require('express');
const router = express.Router();
const qs = require('querystring');

router.use((req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str = '';
    // 2. 监听 req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk;
    });
    // 3. 监听 req 的 end 事件
    req.on('end', () => {
        // 在 str 中存放的是完整的请求体数据
        // console.log(str);
        // 利用Node.js内置querystring处理字符串
        req.body = qs.parse(str);
        // 写在这里面才可以，写在这里面表示处理完毕了再转发
        next();
    });
});

// 暴露router
module.exports = router;
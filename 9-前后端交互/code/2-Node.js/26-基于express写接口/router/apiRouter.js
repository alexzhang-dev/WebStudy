// apiRouter.js 【路由模块】
const express = require('express');
const apiRouter = express.Router();

// GET 请求
apiRouter.get('/', (req, res) => {
    // 获取请求的查询字符串
    const query = req.query;
    // 响应数据
    res.send({
        status: 0,
        message: "GET请求成功",
        data: query
    })
});

// 配置中间件
// 获取到 urlencoded 格式的数据
apiRouter.use(express.urlencoded({
    extended: false
}));

// POST 请求
apiRouter.post('/', (req, res) => {
    // 获取请求体
    const body = req.body;
    // 响应数据
    res.send({
        status: 0,
        message: "POST请求成功",
        data: body
    });
});



module.exports = apiRouter;
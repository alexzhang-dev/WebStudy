// 导入 Express
const express = require('express');
// 创建服务器实例
const app = express();

const joi = require('@hapi/joi');

// 配置 CORS 跨域和解析表单数据的中间件
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

// 由于需要多次res.send()，所以干脆直接封装一个函数
app.use((req, res, next) => {
    // status=0 成功 status=1 失败
    res.cc = (err, status = 1) => {
        res.send({
            // 状态
            status,
            // 状态描述，判断err是字符串还是对象
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
});

// 用户相关路由
const userRouter = require('./router/user');
app.use('/api/user', userRouter);


// 加入全局捕获 joi 错误的中间件
app.use((err, req, res, next) => {
    // 如果数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    // 未知错误
    res.cc(err);
});

// 启动服务器
app.listen(3007, () => {
    console.log("The Express server is running at http://127.0.0.1:3007");
});
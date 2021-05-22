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

// 【配置解析token的中间件】
const config = require('./config');
// 配置解析 token 的中间件
const expressJWT = require('express-jwt');
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 用户相关路由
const userRouter = require('./router/user');
app.use('/api', userRouter);
<<<<<<< HEAD
=======
// 用户信息相关理由
const userInfoRouter = require('./router/userinfo');
app.use('/my', userInfoRouter);
>>>>>>> 96fc87d12a96f640d93bb6849bcc5142726b528d


// 全局错误中间件
app.use((err, req, res, next) => {
    // 如果数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
    // 未知错误
    res.cc(err);
});

// 启动服务器
app.listen(3007, () => {
    console.log("The Express server is running at http://127.0.0.1:3007");
});
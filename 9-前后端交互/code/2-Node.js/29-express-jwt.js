// 1. 安装两个模块 npm i jsonwebtoken express-jwt
const express = require('express');
const app = express();
// 2. 引入2个模块
//    (1). 这是生成 JWT 的模块
const jwt = require('jsonwebtoken');
//    (2). 这是将 JWT 还原为 JSON 的模块
const expressJWT = require('express-jwt');

// 3. 定义一个加密解密的字符串 secret
const secretKey = 'helloMyNameIsAlex';

app.use(express.urlencoded({ extends: false }));


// 5. 解析 JWT 
// 使用app.use()注册中间件
// expressJWT({secret: secretKey}) 解析 JWT
// .unless({ path: [/^\/api\//] }); 指定哪些接口不需要访问权限
app.use(expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({
    path: [/\/api\//]
}));


// 4. 生成 JWT
app.post('/api/login', (req, res) => {
    if (req.body.username !== 'admin' || req.body.password !== '123') {
        return res.send({
            status: 1,
            msg: '登录失败'
        });
    }
    res.send({
        status: 0,
        msg: "登录成功",
        // jwt.sign() 生成字符串，3个参数分别是：用户信息对象，加密密钥，配置对象
        token: jwt.sign({
            username: req.body.username,
        }, secretKey, {
            expiresIn: '60s'
        }),
    });
});



// 这是一个有权限的接口
app.get('/user/getinfo', (req, res) => {
    res.send({
        status: 0,
        msg: 'success',
        data: req.user
    });
});

// 捕获 JWT 解析失败
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.send({
            status: 401,
            msg: '无效Token'
        });
    }
    // 其他原因导致的错误
    res.send({
        status: 500,
        msg: "未知错误"
    });
});

app.listen(80)
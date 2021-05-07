// 1. npm i express-session
const express = require('express');
const app = express();
// 2. 引入模块
const session = require('express-session');

// 3. 配置session
app.use(session({
    // secret 属性的值可以是任意字符
    secret: "users",
    // 以下两个是固定写法
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 4. 向 session 中存数据
app.post('/api/login', (req, res) => {
    // 判断用户名和密码是否正确
    if (req.body.username !== 'admin' || req.body.password !== '123') {
        return res.send({
            status: 1,
            msg: '登录失败'
        });
    }

    // 将用户的信息存储到 session 中
    req.session.user = req.body;
    // 将用户的登录状态存储到 session 中
    req.session.isLogin = true;

    res.send({
        status: 0,
        msg: '登录成功'
    });
});

// 5. 向 session 中取数据
app.get('/api/username', (req, res) => {
    // 判断用户是否登录
    if (!req.session.isLogin) {
        return res.send({
            status: 1,
            msg: "fail"
        });
    }
    res.send({
        status: 0,
        msg: "success",
        username: req.session.user.username
    });
});

// 6. 退出登录，清空session
app.post('/api/logout', (req, res) => {
    // 清空 session
    req.session.destroy();
    res.send({
        status: 0,
        msg: '登出成功'
    });
});

app.listen(80);
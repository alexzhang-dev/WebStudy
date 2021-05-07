// 在这里定义和用户相关的路由处理函数， 供 ./router/user.js 模块进行调用
// 数据库
const db = require('../db/index');

// 加密储存密码模块
const bcrypt = require('bcryptjs');

// 注册
exports.register = (req, res) => {
    // 用户信息
    const userinfo = req.body;
    // 判断用户名和密码不为空
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不可为空！');
    }
    // 判断用户名是否存在
    const checkUserSQL = 'select * from users where username = ?';
    db.query(checkUserSQL, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.cc('用户名已存在，请换一个！');
        // 使用【bcryptjs】加密密码
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        // 注册
        const registerSQL = 'insert into users(username, password) values(?, ?)';
        db.query(registerSQL, [userinfo.username, userinfo.password], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试！');
            res.cc('注册成功！', 0);
        });

    });
};

// 登录
exports.login = (req, res) => {
    res.send('登录OK');
};

// 登出
exports.logout = (req, res) => {
    res.send('登出OK');
};
// 在这里定义和用户相关的路由处理函数， 供 ./router/user.js 模块进行调用
// 数据库
const db = require('../db/index');

// 加密储存密码模块
const bcrypt = require('bcryptjs');

const config = require('../config');

const jwt = require('jsonwebtoken');

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
    });
    // 使用【bcryptjs】加密密码
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // 注册
    const registerSQL = 'insert into users(username, password) values(?, ?)';
    db.query(registerSQL, [userinfo.username, userinfo.password], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试！');
        res.cc('注册成功！', 0);
    });
};

// 登录
exports.login = (req, res) => {
    // 获取登录信息
    const userinfo = req.body;
    // 判断用户名是否存在
    const SQL = 'select * from users where username = ?';
    db.query(SQL, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) {
            return res.cc('用户名不存在！')
        } else {
            // 通过【bryptjs】判断加密后的密码和输入的密码是否匹配
            const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
            if (!compareResult) {
                return res.cc('密码不匹配！');
            }
            // 【登陆成功，加入Token】
            // 生成Token，剔除密码和用户头像
            const user = {...results[0], password: '', user_pic: '' };
            // 将用户信息加密
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: '10h', // 有效期10小时
            });
            // 将token响应给客户端
            res.send({
                status: 0,
                message: "登陆成功！",
                token: 'Bearer ' + tokenStr
            });
        };
    });
};

// 登出
exports.logout = (req, res) => {
    res.send('登出OK');
};
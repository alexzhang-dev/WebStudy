// 在这里定义访问数据库相关信息，供/router/userinfo.js使用
const db = require('../db/index');

const bcrypt = require('bcryptjs');

// 获取用户基本信息
exports.getUserInfo = (req, res) => {
    const SQL = 'select id,username,nickname,email,user_pic from users where id = ?';
    db.query(SQL, req.user.id, (err, results) => {
        if (err) return res.cc(err.message);
        res.send({
            status: 0,
            message: "获取用户信息成功！",
            data: results[0]
        });
    });
};
// 更改用户基本信息【昵称 + 邮箱】
exports.updateUserInfo = (req, res) => {
    const SQL = 'update users set nickname = ?,email = ? where id = ?';
    db.query(SQL, [req.body.nickname, req.body.email, req.user.id], (err, results) => {
        if (err) return res.cc(err.message);
        if (results.affectedRows.length == 0) return res.cc('找不到指定的用户！');
        res.cc('修改用户信息成功！', 0);
    });
};
// 重置密码
exports.updatepwd = (req, res) => {
    // 验证原密码是否正确
    const SQL = 'select password from users where id = ?';
    db.query(SQL, req.user.id, (err, results) => {
        if (err) return res.cc(err.message);
        if (results.length !== 1) return res.cc('用户不存在！');
        // 判断新密码与数据库密码是否一致
        const check = bcrypt.compareSync(results[0].password, req.body.oldpwd);
        if (!check) {
            return res.cc('旧密码输入错误！');
        }
    });
    const updateSQL = 'update users set password = ? where id = ?';
    db.query(updateSQL, [req.body.newpwd, req.user.id], (err, results) => {
        if (err) return res.cc(err.message);
        if (results.affectedRows !== 1) return res.cc('更改密码失败，请重新再试！');
        res.cc('更改密码成功！');
    });
}
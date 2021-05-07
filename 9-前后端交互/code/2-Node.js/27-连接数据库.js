// 1. npm i mysql
// 2. 加载模块
const mysql = require('mysql');
// 3. 创建数据库连接
const db = mysql.createPool({
    host: "42.192.133.231",
    user: "bigevent",
    password: "bigevent",
    database: "bigevent"
});
// 4. 测试连接
//    (1). 查询
db.query('SELECT * FROM users', (err, results) => {
    if (err) {
        return console.log(err);
    }
    console.log(results);
});
//    (2). 添加
const user = {
    uname: "ls",
    upwd: '147258',
};
// ? 为占位符
const SQL = 'INSERT INTO users (uname, upwd) VALUES (?, ?)';
// 如果字段名和属性名相同，直接将user传入参数就可以
db.query(SQL, [user.uname, user.upwd], (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("数据插入成功");
});
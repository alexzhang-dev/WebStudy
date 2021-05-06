// 1. npm i mysql
// 2. 加载模块
const mysql = require('mysql');
// 3. 创建数据库连接
const db = mysql.createPool({
        host: "42.192.133.231",
        user: "root",
        password: "n4CN3rStwZxinS5t",
    })
    // 4. 测试连接
db.query('SELECT 1 from mysql', (err, results) => {
    if (err) {
        return console.log(err);
    }
    console.log(results);
})
//【连接数据库】
const mysql = require('mysql');

const db = mysql.createPool({
    host: '42.192.133.231',
    user: 'bigevent',
    password: 'bigevent',
    database: 'bigevent'
});

module.exports = db;
const express = require('express');
const app = express();

// 中间件就是用户请求与服务端响应之间的处理函数

// 1. 定义1个简单的中间件函数
//      中间件一定要包含 next
const mw1 = (req, res, next) => {
    console.log("这是第1个中间件函数，全局");
    // 中间件一定要写next()，用于转发到下个中间件或者路由
    next();
};
// 2. 全局生效的中间件，所有的请求都会先走一遍此中间件
app.use(mw1);

// 3. 可以有多个中间件
const mw2 = (req, res, next) => {
    console.log("这是第2个中间件函数，局部");
    next();
}


// 4. 全局生效的中间件可以简写
app.use((req, res, next) => {
    console.log("这是第3个中间件函数，全局");
    next();
});

// 5. 局部中间件
app.get('/', mw1, mw2, (req, res) => {
    res.send('Home page.');
});
//  以下为正常
app.get('/user', (req, res) => {
    res.send('User page.');
});

app.listen(80);
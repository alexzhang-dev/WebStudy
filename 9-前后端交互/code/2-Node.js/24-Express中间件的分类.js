const express = require('express');
const app = express();

// Express官方根据用途，将中间件分为以下5类

// 1. 应用类中间件
// app.use() app.get() app.post() 绑定的中间件就是应用类中间件
//      1.1 应用类中间件（全局）
app.use('/', (req, res, next) => {
    console.log('创建了一个全局的应用类的中间件');
    next();
});
//      1.2 应用类中间件（局部）
const mw = (req, res, next) => {
    console.log("这是一个局部的应用类中间件");
    next();
}
app.get('/user', mw, (req, res) => {
    res.send("这是一个局部的中间件");
});

app.listen(80);

// 2. 路由级别的中间件,绑定在express.Router()上的
const router = express.Router();
router.use((req, res, next) => {
    res.send('定义了一个路由级别的中间件');
});
app.use('/router', router)

// 3. 错误级别的中间件，需要定义在所有的路由后面
const errMiddleware = (err, req, res, next) => {
    res.send('err：' + err.message);
    next();
}
app.use('/', errMiddleware);

// 4. Express内置的中间件（详见markdown文件）
// 5. 第三方的中间件（详见markdown文件）
const express = require('express');
const app = express();

// 我们可以直接在 app 上挂载路由，但是为了方便管理
// 建议将路由剥离出来，作为单独的模块来处理
// /router 存放路由

// 1. 使用自定义的路由模块
const userRouter = require('./router/user');

// 2. app挂载路由,可以定义一个前缀
app.use("/api", userRouter.router);

// 3. 启动服务器
app.listen(80, () => {
    console.log("server is running at 127.0.0.1");
});
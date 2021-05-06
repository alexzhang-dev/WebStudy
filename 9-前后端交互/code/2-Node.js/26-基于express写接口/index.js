// 加载 express 模块
const express = require('express');
// 创建 express 实例
const app = express();
// 加载 apiRouter 自定义模块
const apiRouter = require('./router/apiRouter');
const jsonpApiRouter = require('./router/jsonpApiRouter');
// 加载 cors 中间件
const cors = require('cors');

// 在配置 CORS 之前写 JSONP 接口，否则JSONP将视为开启了CORS的接口
app.use('/api/jsonp', jsonpApiRouter);

// 路由之前配置 cors
app.use(cors());

// 绑定 apiRouter
app.use('/api', apiRouter);

// 调用 app.listen(), 启动服务器
app.listen(80, () => {
    console.log('Express server is running at 127.0.0.1...')
});
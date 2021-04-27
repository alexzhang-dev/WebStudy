// 1. 导入 http 模块
const http = require('http');
// 2. 创建服务器实例
const server = http.createServer();
// 3. 给服务器绑定 request 事件
// 使用.on() 绑定事件
server.on('request', (req, res) => {
    // req是请求对象，包含了与客户端有关的数据和属性
    // req.url 客户端请求的url地址
    // req.method 客户端请求的方式
    const str = `您的请求地址是：${req.url}，您的请求类型是：${req.method}。`;
    // 发送的数据有中文，需要解决乱码问题，设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res是响应对象，包含了与服务器有关的数据和属性
    // res.end() 服务器向客户端发送指定信息
    res.end(str);
});
// 4. 调用 server.listen(端口号, 回调函数)方法启动服务器
server.listen(80, () => {
    console.log("http server is running at 127.0.0.1");
});
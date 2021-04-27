const http = require('http');

const server = http.createServer();
server.on('request', (req, resp) => {
    // 1. 获取用户请求的 url 地址
    const url = req.url;
    // 2. 设置默认的响应内容为 404 Not Found
    let respText = '<h1>404 Not Found</h1>';
    // 3. 判断是否访问的是/或者/index.html
    if (url == "/" || url == "/index.html") {
        respText = '<h1>这里是首页</h1>';
        // 4. 判断是否访问的是/about.html
    } else if (url == "/about.html") {
        respText = '<h1>这里是关于页</h1>';
    }
    // 5. 设置响应头，防止中文乱码
    resp.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 6. 把响应发送
    resp.end(respText);
});

server.listen(80, () => {
    console.log("server is running at 127.0.0.1");
});
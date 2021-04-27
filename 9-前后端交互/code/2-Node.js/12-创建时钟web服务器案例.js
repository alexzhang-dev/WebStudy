// 1. 导入需要的模块
const http = require('http');
const path = require('path');
const fs = require('fs');

// 2. 创建基本的 web 服务器
const server = http.createServer();
server.on('request', (req, resp) => {
    // 3. 将资源的 url 请求地址映射为资源的存放路径
    //    所有的请求都定向到了/clock这个文件夹里3
    // 5. 优化资源的请求路径
    if (req.url == "/") {
        // 如果访问的是/,就不知道访问哪个文件了，强制性指定为index.html
        req.url = "/index.html";
    }
    const fpath = path.join(__dirname, "./clock", req.url);
    // 4. 读取内容并响应给客户端
    fs.readFile(fpath, 'utf-8', (err, str) => {
        if (err) {
            return resp.end("404 Not Found.");
        }
        resp.end(str);
    });
});
server.listen(80, () => {
    console.log("server is running at 127.0.0.1");
});
const express = require('express');
const app = express();

// 用 express.static() 可以设置静态资源的托管
// 此时访问就不需要加public了
// http://127.0.0.1/files/1.txt
app.use(express.static('public'));
// 如果需要多个托管就需要多个express.static()
app.use(express.static('clock'));
// 如果需要路径前缀需要这么写
app.use('/static', express.static('files'));

app.listen(80, () => {
    console.log('express server is running at http://127.0.0.1');
});
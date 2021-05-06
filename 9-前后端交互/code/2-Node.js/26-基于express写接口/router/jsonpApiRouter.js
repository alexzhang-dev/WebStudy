const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // 1. 获取到客户端发来的函数名
    const funcName = req.query.callback;
    // 2. 得到通过 JSONP 形式发送的数据
    const data = {
        name: 'zs',
        age: 18
    };
    // 3. 根据前两步得到的数据，拼接出一个函数调用的字符串 == funcName({name='zs',age=18})
    const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    // 4. 把上述数据响应给客户端
    res.send(scriptStr);
});

module.exports = router;
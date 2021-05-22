const express = require('express');
const router = express.Router();

// GET 测试请求
router.get('/get', (req, res) => {
    res.send("传统的URL传递参数：" + req.query.id);
});
router.get('/get/:id', (req, res) => {
    res.send("RESTful的URL传递参数：" + req.params.id);
});
router.get('/get2', (req, res) => {
    res.json({
        status: 200,
        message: "success"
    });
});
router.get('/async1', (req, res) => {
    res.send('async1111')
});
router.get('/async2', (req, res) => {
    res.send(req.query.info)
});
router.get('/axiosget', (req, res) => {
    res.send('axios get 传参：' + req.query.id);
});
router.get('/axiosget/:id', (req, res) => {
    res.send('axios get RESTful 传参：' + req.params.id);
});
router.delete('/get/:id', (req, res) => {
    res.send('DELETE传递参数：' + req.params.id);
});
router.delete('/get', (req, res) => {
    res.send('axios delete 传参：' + req.query.id);
});
// POST 测试请求
router.post('/add', (req, res) => {
    res.send("POST请求传递参数：" + req.body.uname + req.body.pwd);
});
router.post('/axiosadd', (req, res) => {
    res.send("axios post 传参：" + req.body.name + req.body.age);
});

router.put('/books/:id', (req, res) => {
    res.send('PUT请求传递参数：' + req.params.id + '----' + req.body.username + "---" + req.body.pwd);
});
router.put('/axiosput/:id', (req, res) => {
    res.send('axios put 传参' + req.params.id + '----' + req.body.name + "---" + req.body.age);
});


module.exports = router;
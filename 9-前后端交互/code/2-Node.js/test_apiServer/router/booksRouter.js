const express = require('express');
const router = express.Router();

// GET 测试请求
router.get('/getlist', (req, res) => {
    res.send({
        status: 200,
        message: "获取成功！",
        data: [{
            id: 1,
            bookName: "水浒传"
        }, {
            id: 2,
            bookName: "三国演义"
        }, {
            id: 3,
            bookName: "红楼梦"
        }],
    });
});

module.exports = router;
// 【用户登录/注册/登出】
const express = require('express');

// 创建路由
const router = express.Router();

// 引入路由处理模块
const handler = require('../router_handler/user');

// 注册新用户
router.post('/register', handler.register);

// 登录
router.post('/login', handler.login);

// 登出
router.post('/logout', handler.logout);

module.exports = router;
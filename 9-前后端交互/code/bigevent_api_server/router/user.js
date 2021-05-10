// 【用户登录/注册】
const express = require('express');

// 创建路由
const router = express.Router();

// 【joi】
const expressJoi = require('@escook/express-joi');
// 【username-schema】
const userSchema = require('../schema/user');

// 引入路由处理模块
const handler = require('../router_handler/user');

// 注册新用户  加上自定义的schema中间件
router.post('/register', expressJoi(userSchema.reg_login_schema), handler.register);

// 登录  加上验证表单是否合法的中间件
router.post('/login', expressJoi(userSchema.reg_login_schema), handler.login);

module.exports = router;
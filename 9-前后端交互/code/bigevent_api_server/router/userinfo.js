//【获取/更新用户基本信息，重置密码，更换头像】
const express = require('express');
const router = express.Router();

const handler = require('../router_handler/userinfo');

const expressJoi = require('@escook/express-joi');

// 验证规则
const userSchema = require('../schema/user');

// 获取用户信息
router.get('/userinfo', handler.getUserInfo);
// 修改用户信息 【修改信息时需要对修改的信息验证】
router.post('/userinfo', expressJoi(userSchema.update_userinfo_schema), handler.updateUserInfo);
// 重置密码
router.post('/updatepwd', handler.updatepwd);

module.exports = router;
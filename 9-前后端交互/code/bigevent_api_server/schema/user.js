const joi = require('@hapi/joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则  字符串，只能是a-zA-Z0-9，最小1位，最大10位，必填
const username = joi.string().alphanum().min(1).max(10).required();

// 密码的验证规则       字符串，不包含空格，6-12位，必填
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义 id nickname email 的校验规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 注册和登录的验证对象
exports.reg_login_schema = {
    // 对 req.body 进行验证
    body: {
        username,
        password
    }
}

// 修改用户信息验证规则
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 修改密码验证规则
exports.update_password = {
    body: {
        oldpwd: password,
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newpwd: joi.not(joi.ref('oldpwd')).concat(password),
    }
}
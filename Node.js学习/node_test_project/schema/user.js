/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-17 15:40:37
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-10-16 13:35:59
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\schema\user.js
 * @Description: 用户信息的校验规则定义文件
 */
// 导入 @hapi/joi 第三方插件进行数据验证
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是 a-z A-Z 0-9
 * min() 最小长度
 * max() 最大长度
 * required() 值为必填项
 * pattern() 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// id 的验证规则
const id = joi.number().integer().min(1).required()
// nickname 的验证规则
const nickname = joi.string().required()
// email 的验证规则
const email = joi.string().email().required()
// oldPassword 旧密码的验证规则
const oldPassword = password
// newPassword 的验证规则
const newPassword = joi.not(joi.ref('oldPassword')).concat(password)

// 导出注册和的登录表单的验证规则对象
module.exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}

// 导出更新用户信息时的验证规则对象
module.exports.update_userInfo__schema = {
  body: {
    id,
    nickname,
    email
  }
}

module.exports.update_password_schema = {
  body: {
    oldPassword,
    newPassword
  }
}
/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:55:21
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-10-15 19:53:22
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\router\user.js
 * @Description: 存放客户端请求与处理函数之间的映射关系
 */

// 导入 express 模块
const express = require('express')

// 1.导入 验证表单数据 的中间件
const expressJoi = require('@escook/express-joi');
// 2.导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const { register, login } = require('../router_handler/user')

// 导入定义的路由处理函数

// 注册用户对应的路由
// 使用局部中间件 expressJoi 进行表单数据的验证
// 如果数据验证通过，会把这次请求流转给后面的路由处理函数
// 如果数据验证失败，终止后续代码的执行，并抛出一个全局的Error错误，进行全局的错误级别中间件中进行处理
router.post('/register', expressJoi(reg_login_schema), register)

// 用户登录对应的路由
router.post('/login', expressJoi(reg_login_schema), login)

module.exports = router;
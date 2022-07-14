/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:55:21
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-07-14 20:48:59
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\router\user.js
 * @Description: 存放客户端请求与处理函数之间的映射关系
 */

// 导入 express 模块
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const { register, login } = require('../router_handler/user')

// 导入定义的路由处理函数

// 注册用户对应的路由
router.post('/register', register)

// 用户登录对应的路由
router.post('/login', login)

module.exports = router;
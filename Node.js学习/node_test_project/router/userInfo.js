const express = require('express')
const expressJoi = require('@escook/express-joi')
const { update_userInfo__schema, update_password_schema }  = require('../schema/user.js')
const router = express.Router()
const { userinfo, updateUserInfo, updatePassword } = require('../router_handler/userInfo')




// 获取用户信息的路由
router.get('/userinfo', userinfo)
// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userInfo__schema), updateUserInfo)
// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)













module.exports = router
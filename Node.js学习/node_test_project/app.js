/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:47:55
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-07-14 20:49:26
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\app.js
 * @Description: node项目的入口文件
 */

// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例对象
const app = express()

// 导入 cors 中间件
const cors = require('cors')
// 注册为全局可用的中间件
// 注意：跨域中间价的注册一定要在路由挂载之前
app.use(cors())

// 配置解析表单数据的中间件, 注意这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入用户路由模块
const userRouter = require('./router/user')
// 注册路由模块
// 注意： 为这个路由模块添加了统一的访问前缀 /api
app.use('/api', userRouter)

// 启动一个服务器
app.listen(9000, () => {
    console.log('server run at http://127.0.0.1:9000')
})

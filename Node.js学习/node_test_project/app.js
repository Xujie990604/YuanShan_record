/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:47:55
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-10-15 00:04:25
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\app.js
 * @Description: node 项目的入口文件
 */

// 导入 express 模块
const express = require('express')
// 导入 @hapi/joi 第三方插件进行数据验证
const joi = require('joi')
// 创建 express 的服务器实例对象
const app = express()

// 导入 cors 中间件(用于跨域的)
const cors = require('cors')
// 注册为全局可用的中间件
// 注意：跨域中间价的注册一定要在路由挂载之前
app.use(cors())

// 配置解析表单数据的中间件, 注意这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 业务流程中的中间件，要在 路由注册 之前进行注册
// 注册一个全局的中间件， 在 res 上添加一个 res.cc 函数。用于进行错误信息的提示
app.use((req, res, next) => {
  // status 默认值为0，表示失败的情况
  // err 的值，可以是一个错误对象，也可以是一个错误的描述字符串
  res.cc = function (err, status = 0) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 要在路由之前配置解析 Token 的中间件
const expressJwt = require('express-jwt')
const config = require('./config')
// 定义全局中间件来解析 Token，指定不需要解析的路由正则(api 开头的接口不需要验证 Token)
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: [/^\/api/]}))

// 导入用户路由模块
const userRouter = require('./router/user')
// 注册路由模块
// 注意： 为这个路由模块添加了统一的访问前缀 /api
app.use('/api', userRouter)

// 定义全局的错误级别的中间件
// 注意：全局的错误级别的中间件要在 路由注册 之后注册
app.use((err, req, res, next) => {
  // 如果 错误对象 来自于 Joi插件中定义的错误对象
  if(err instanceof joi.ValidationError) { return res.cc(err) }
  // 身份认证失败的错误
  if(err.name === "UnauthorizedError") { return res.cc("身份认证失败") }
  // 未知错误
  return res.cc(err)
})

// 启动一个服务器
app.listen(9000, () => {
    console.log('server run at http://127.0.0.1:9000')
})

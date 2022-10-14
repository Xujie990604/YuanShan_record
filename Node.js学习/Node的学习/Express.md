# Express

* Express 是一个三方的用来创建 Web 服务器的模块(基于 node 内置的 http 模块进一步封装的)

## 基本使用

```js
const express = require('express');
const path = require('path')
// 通过 express 方法来创建Web服务器
const app = express();

// 调用 express.static('public')方法， 快速的对外提供静态资源
// 注意: public 这个目录名不会出现在 URL 中
// 注意: 如果要托管多个静态文件，就要多次调用express.static('public'),文件夹的优先级和文件夹的调用顺序一致
// app.use(express.static(path.join(__dirname, '/dist')))

// 挂载路径前缀
// 需要在 URL 地址中加入 'public' 前缀才能访问 "clock" 目录中的文件
app.use('/public', express.static( path.join(__dirname, '/clock')))

// 通过 listen 方法启动Web服务器，并配置指定端口
app.listen(80,()=> {
    console.log("创建web服务器")
})

// 通过 get 方法用于 监听 客户端对应的get请求
app.get('/user',(req,res) => {
    // res.send()用来向客户端响应数据
    res.send({name: 'xujie', gender: '男'})
})

// 通过 post 方法用于 监听 客户端对应的post请求
app.post('/user', (req, res) => {
    res.send("得到post请求")
})

// 通过 req.query 可以获取到客户端发送过来的 查询参数(?name="xxx"&age=111)
// 注意: 默认情况下，req.query 是一个空对象
app.get('/',(req,res) => {
    console.log(req.query)
    res.send(req.query)
})

// 通过 req.params 来获取URL中的通过: 动态匹配的参数值
// 注意: 默认情况下，req.params 是一个空对象
app.get('/user/:id', (req, res) => {
    console.log(req.params)
    res.send(req.params)
})
```

## 路由

* express中，路由指的是 客户端的请求 和 服务器处理函数 之间的映射关系
* 每一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的回调函数
* 路由的匹配会按照路由路由的定义顺序进行匹配

### 模块化路由

```js
//1. 导入express模块
const express = require('express')
//2. 通过 Router 方法来创建路由对象
const router = express.Router()
// 3.挂载具体的路由
router.get('/user/list', (req,res) => {
    res.send("get /user/list")
})

router.post('/user/add', (req, res) => {
    res.send("post /user/add")
})
// 4. 向外导出路由对象
module.exports = router;

// 导入路由对象
const router = require('./router.js')
// 注册路由模块
// app.use()的作用就是 注册 中间件
app.use(router)
// 注册路由模块时，可以为这个路由模块添加统一的访问前缀
app.use('/public', router)

```

## 中间件

* 业务处理过程中的中间环节(所以中间件要在路由之前定义，注册)
* 客户端发起的任何请求，到达服务器之后，都会触发全局的中间件。通过app.use(中间件函数)注册全局中间件
* 多个中间件 共享 req和res属性，可以在上游给req，res定义属性，方法。在下游的中间件或者路由中使用。(可以在中间件中定义一些通用的函数，这样所有的路由都能使用这个函数，不然的话就得去每个路由里面把这个函数都给定义一遍)(例如一个记载当前请求所处时间的函数)
  
* 全局的中间件

```js
// 定义中间件函数
const vm = function(req,res,next) {
    console.log("我是一个中间件函数")
    next()
}
// 注册全局中间件函数
app.use(vm)
// 全局中间件函数的简化写法
app.use(function(req, res, next) {
    console.log("我是一个简化的中间件函数")
    next()
})
```

* 局部的中间件

```js
const vm = function(req,res,next) {
    console.log("我是局部的中间件")
    next()
}
// 使用单个局部中间件
app.get('/user',vm,(req,res)=> {
    console.log("i am get user")
})
// 使用多个局部中间件
app.get('/user',vm1,vm2,vm3(req,res)=> {
    console.log("i am get user")
})
app.get('/user',[vm1,vm2.vm3],(req,res)=> {
    console.log("i am get user")
})
```

### 中间件的分类

1. 应用级别的中间件: 绑定到app实例上的中间件
2. 路由级别的中间件: 绑定到router实例上的中间件
3. 错误级别的中间件: (err,req,res,next)有四个参数 专门用来捕获整个项目中发生的异常错误，使用app.use()全局注册。错误级别的中间件必须要放到所有的路由之后
4. express内置的中间件: 1. express.static()快速托管静态资源 2. express.json()解析JSON格式的请求体数据 3.express.urlencoded()解析URL-encoded格式的请求体数据

```js
// 只需要在路由之前注册一下这个中间件，不需要和js的JSON方法一样调用函数去解析得到的数据。
// 通过 express.json 这个中间件解析表单中的JSON格式的数据
app.use(express.json())
// 通过 express.urlencoded 这个中间件来解析表单中的 url-encoded 格式的数据
app.use(express.urlencoded({extended: false}))

```

5. 第三方的中间件，需要下载，导入，注册

## 跨域问题的解决

* cors中间件的使用

```js
//导入cors中间件
const cors = require('cors')
// 跨域中间件的注册必须在路由挂载之前
app.use(cors())
```

* 响应头部的相关字段

1. ```Access-Control-Allow-Origin: <origin> | *``` 允许哪些域的网站访问服务器，可以设置制定域名，或者通配符

## Session认证

* express-session中间件的使用

```js
// 导入 session 模块
const session = require('express-session')
// 注册 session 全局中间件， 并进行配置
// session 中间件配置成功之后就可以使用req.session来访问和使用session对象，从而存储用户的关键信息
app.use(session({
    secret: 'xujie', // 属性的值可以为任意的字符串
    resave: false, // 固定写法
    saveUninitialized: true //固定写法
}))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if(req.body.username != 'xujie' || req.body.password !='xujie123') {
        return res.send({ status: 0, msg: '登陆失败' })
    }

    // 登陆成功之后，将用户信息保存到 session 中
    req.session.user = req.body  // 用户的信息
    req.session.isLogin = true // 用户的登录状态

    res.send({ status: 1, msg: '登录成功' })
})
```

## JWT认证

* jsonwebtoken (用于生成JWT字符串)  express-jwt(用于将JWT字符串还原成JSON对象)
* 需要定义一个secret密钥。在加密和还原过程中都需要使用这个secret(secret本质上就是一个字符串，定义的时候越是复杂越好)

```js
// 在用户登陆成功之后， 调用 jwt.sign() 方法生成 JWT 字符串
// 参数1：用户的信息对象
// 参数2：加密的密钥(定义的 secret 字符串)
// 参数3：配置对象，可以配置当前 Token 的有效期
const Token = jwT.sign({ username: 'xxx' }, secretKey, { expiresIn: '1h' })

// 在收到客户端发送的 JWT 字符串时，使用 expressJWt 将字符串解析成 JSON 对象
app.use(expressJWt({ secret: secretKey }))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 注意： 只要 expressJWt 中间件配置成功之后，就会把解析出来的用户信息，挂载到 req.user 属性上
  // 现在在这里就可以访问到 req.user 属性
  console.log(req.user)
})

// 如果 JWT 解析失败后会抛出错误，需要自己定义一个 全局的错误处理中间件 来捕获和处理错误
app.use((err, req, res, next) => {
    // 这个错误是由于 Token 解析失败导致的
    if(err.name === 'UnauthorizedError') {
        return res.send({
            status: 0,
            msg: '无效的Token'
        })
    }
})
```
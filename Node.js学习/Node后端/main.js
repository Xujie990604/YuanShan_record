const express = require('express');
const cors = require('cors')

const path = require('path')
const app = express();

app.use(express.static( path.join(__dirname, '/clock')))

app.listen(80,()=> {
    console.log("创建web服务器")
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// 跨域中间件的注册必须在路由之前
app.use(cors())

const router = require('./router.js')
app.use(router)

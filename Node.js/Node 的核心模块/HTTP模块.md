<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\Node的学习\HTTP模块.md
 * @Description: node 的 Http 模块
-->
# HTTP模块

* HTTP 模块是用来创建 Web 服务器的模块。通过 HTTP 的方法就能把一台电脑变成一台 Web 服务器，从而对外提供 Web 资源服务。
* 127.0.0.1 IP地址 对应的域名是 localhost 用来访问本机(测试用)

```js
const http = require('http');
// 创建web服务器的实例
const serve = http.createServer();
// 为服务器实例绑定request事件
serve.on('request',(req, res) => {
    // 只要客户端请求服务器，就会触发request事件，从而调用回调函数
    // req 参数中都是和客户端相关的数据和属性
    // req.ul 客户端的请求 URL 地址
    // req.method 是客户端的 method 请求类型

    // res 参数中都是服务器的数据和属性
    // res.end (message) 向客户端响应一些内容
    // 响应内容是中文的话，会有乱码的问题。需要在 res 上调用 setHeader() 方法来设置响应头部

    res.setHeader('Content-Type','text/html; charset=utf-8' )
    // 如果把 res.end 中的参数换成 fs.readFile() 方法获取到的 index.html 的内容。就相当于返回了一个网页。
    // 如果这个 index.html 网页中有外链的引用，css 或者 js。客户端会自动的发起请求，来获取这些在 index.html 中引入的文件
    res.end("<h1>徐杰</h1>")
})
// 启动服务器 serve.listen (端口号，callback)
serve.listen(80, () => {
    console.log("服务器启动成功")
})

```

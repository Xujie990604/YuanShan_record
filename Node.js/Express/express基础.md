# express 基础

- express xxx 创建项目
- Express 是一个三方的用来创建 Web 服务器的模块(基于 node 内置的 http 模块进一步封装的)

## 基本使用

```js
const express = require("express");
const path = require("path");
const app = express();

// 调用 express.static('public')方法， 快速的对外提供静态资源
// 注意: 如果要托管多个静态文件，就要多次调用express.static('public'),文件夹的优先级和文件夹的调用顺序一致
app.use(express.static(path.join(__dirname, "/dist")));

// 挂载路径前缀
// 需要在 URL 地址中加入 'public' 前缀才能访问 "clock" 目录中的文件
app.use("/public", express.static(path.join(__dirname, "/clock")));

// 通过 listen 方法启动Web服务器，并配置指定端口
app.listen(80, () => {
  console.log("创建web服务器");
});

// 通过 get 方法用于 监听 客户端对应的get请求
app.get("/user", (req, res) => {
  // res.send()用来向客户端响应数据
  res.send({ name: "xujie", gender: "男" });
  res.json(); // 以 JSON 格式进行返回
  res.status(); // 返回状态码
});

// 通过 post 方法用于 监听 客户端对应的 post 请求
app.post("/user", (req, res) => {
  res.send("得到post请求");
});

// 通过 req.query 可以获取到客户端发送过来的 查询参数(?name="xxx"&age=111)
// 注意: 默认情况下，req.query 是一个空对象
app.get("/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

// 通过 req.params 来获取 URL 中的通过: 动态匹配的参数值
// 注意: 默认情况下，req.params 是一个空对象
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
```

## 覆盖 express API

1. 全局的原型 express.response express.request
2. 特定应用程序的原型 app.response app.request

- 可以通过原型来自定义一些属性，方法。或者覆盖原来的属性方法
- req.baseUrl req.originalUrl 等方法是在当前请求-响应周期上动态分配的，因此使用原型的方式无法修改

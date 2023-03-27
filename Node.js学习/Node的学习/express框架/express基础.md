# express

* Express 是一个三方的用来创建 Web 服务器的模块(基于 node 内置的 http 模块进一步封装的)

## 基础使用

```js
const express = require('express');
const path = require('path')
// 通过 express 方法来创建Web服务器
const app = express();

// 使用 express.static() 方法来快速托管静态文件
app.use(express.static(path.join(__dirname, '/dist')))

// 通过 listen 方法启动Web服务器，并配置指定端口
app.listen(80,()=> {})
```

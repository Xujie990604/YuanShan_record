# Vite

* 开发阶段: 开发服务器
* 打包阶段: 构建指令服务器
* Vite 是依赖于 Node 的

## Vite的服务器

* Vite 搭建本地服务器使用的是 Connect

## ESBuild

* 使用 GO 语言编写，可以直接转换成机器代码。
* 能够充分利用 CPU 多核的运算

## index.html

* index.html 会被 Vite 视为依赖图的一部分
* 在开发阶段整个 Vite 项目目录会被视为服务器的根目录，index.html 是入口文件。在 index.html 中可以直接基于 Vite 项目目录的结构进行资源引入

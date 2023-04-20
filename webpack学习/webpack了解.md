# 基础使用

* 是一个现代的 javascript 应用的静态(打包完成的文件是静态资源)模块(支持模块化开发)打包工具
* 依赖 node 环境

## 前端模块化

* 使用模块化开发完项目之后，需要借助其他的工具来处理模块之间的依赖关系
* 不仅仅是 js 代码，图片，css，json 文件在 webpack 中都可以被当做模块来使用。
* 主要功能还是前端的模块化开发，压缩处理只是附加的功能。

## 打包

* 把各种资源文件进行打包，合成一个或者多个包。
* 在打包的过程中，还可以进行资源的处理，压缩图片，scss 转化为 css，ES6 语法转化为 ES5 语法，typeScript 转化为 javascript

## 和 grunt/gulp 对比

* 他们只是一系列的任务，压缩，转化。
* 并不涉及到模块化的概念，不会处理模块化之间的依赖

## 使用

* npm init 生成 package.json 文件
* npm init -y 一键生成 package.json 文件(不需要手动输入一些信息)
* 局部安装 webpack 的话目录下会生成 node_modules 文件
* node_modules 文件下的 bin 目录包含了可以使用的指令, 同时拥有全局和局部的 webpack,想要使用局部的 webpack 时，需要到本地目录中执行 webpack node_modules/.bin/webpack。 想要直接使用局部 webpack 打包，可以使用 npx webpack 指令
* 在项目的 package.json 的 scripts 中执行的命令时会自动使用局部的插件
* 打包时，webpack 默认会把 src/index.js 当作入口文件
* webpacK 打包时会默认使用 webpack.config.js 配置文件中的配置项，想要指定配置文件 webpack --config xxx.config.js

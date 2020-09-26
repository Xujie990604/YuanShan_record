# 安装

## 指令

* node -v用来查看node的版本
* webpack -v是查看webpack的版本
* -g 是全局安装

## 全局安装和局部安装

### 全局安装

* 在终端(cmd和vscode的终端都算)里面使用的webpack都是全局安装的
* 使用的是-g

### 局部安装

* 使用--save-dev是开发时依赖(dev是开发的意思)，项目打包之后就不在需要使用的比如 babel-loader
* 使用--save是运行时的依赖。比如Vue
* 在package.json文件里面的是局部的依赖不是全局的依赖

## 全局和本地的区别

* 在终端直接使用webpack使用的是全局的webpack
* 一般来说每个项目都需要一个自己的webpack，放置项目的webpack版本和全局的webpack的版本不一样导致错误
* 使用 npm install webpack来本地安装webpack
* 如果想要使用本地的webpack怎么办，在package.json配置文件里面进行映射的配置

```js
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack" //这里是一种映射，使用npm run build的时候就会执行webpack命令，并且是本地的webpack
  },
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "webpack": "^3.6.0"
  }
}
```

## 知识点

* 现在安装的是webpack的3.6.0 配套的是vue cli2

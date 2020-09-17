# 脚手架

* 快速搭建Vue开发环境以及对应的webpack配置
* 脚手架的使用环境需要node
* e2e端到端的测试
* env 是environment环境的意思
* preset 配置

* 包的版本@之后是确切的版本 ^的后面不是一个确切的版本

## npm cnpm yarn

* npm和cnpm在我现在的电脑上可以使用
* yarn的使用以后再说，先把npm的搞明白。
* 使用npm install -g @vue/cli 命令全局安装vue cli3的版本
* 然后使用npm install @vue/cli-init -g命令拉取vue cli2的版本

## vue cli的版本

* 讲师演示的是vue cli3的版本，其中使用到vue cli2的一些语法的话，需要使用命令拉取vue cli2的模板
* 使用vue -V的命令查看vue cli的版本

## 使用命令

### 安装vue的项目

* vue cli2使用 vue init webpack my-project
* vue cli3使用 vue create my-project
* 项目的名字不要有中文

### 插件

* EsLint很严格的js代码规范

## vue cli2的项目目录

* build文件夹放置的都是配置文件(抽离过的)
* config文件夹里面都是配置文件需要的变量
* node_modules放置的是使用到的包
* src里面放置的开发的代码
* static放置的是一些静态的文件，这个文件夹的好处就是，图片之类的不会经过处理(src中文件都会根据配置进行处理，专户为base64或者更改名字)，会把static文件夹里面的东西直接放到dist文件夹中。
* babelrc文件时专门对ES6语法转化为ES5语法的配置文件
* editorconfig是对代码的风格进行一定的统一(比如代码的缩进格式)
* eslintignore(代码格式检查时忽略那些文件)
* gitignore(git上传时忽略那些文件)
* index.html模板html文件
* package.json有关于包的管理，还有执行命令的配置
* package-lock.json指定的是每个包的真实的版本，而package.json里面都是指定的大概的版本
* README.md写的是项目的介绍

## vue cli3

### vue cli3的一些变化

* vue cli 3基于webpack4打造 vue cli 2基于webpack3
* vue-cli 3的原则是零配置，移除config和build文件夹
* 提供了vue ui命令
* 移除了static文件夹，新增了public文件夹，并且把index.html文件移动到public中

### vuecli3的一些命令

* vue create 文件名
* vue ui启动一个本地的服务器,用于图形化的管理本地的项目。

### vue cli3的目录结构

* public相当于static，并且其中包含index.html文件

## vue cli4

### vue cli 4的一些变化

### vue cli 4的结构目录
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

* npx webpack --analyze 来分析 bundle

## 配置

* webpack 是开箱即用的，可以不使用任何配置文件进行打包。但是 webpack 默认会把 src/index.js 当作入口文件, dist/main.js 当做出口，生产环境默认压缩。(一般情况下项目是需要定义一个配置文件进行能力的扩展的)
* 不指定配置文件 webpacK 打包时会默认使用 webpack.config.js 配置文件中的配置项，想要指定配置文件 webpack --config xxx.config.js，可以使用 --merge 命令来合并配置文件。
* 命令行参数的优先级，高于配置文件的参数优先级

* 配置文件导出的是函数时，可以在命令行中添加环境参数(函数会接收到环境变量，用于开发者生成不同的配置文件)
* 配置文件可通过导出数组的方式来导出多种配置集合，可在命令行中通过 --config-name 来指定配置项

## webpack cli

`"build": "webpack --config wk.config.js"`

* 在执行 npm run build 时，会使用 webpack cli 来处理命令行中的参数，并通过参数构建 compiler 对象，然后对代码进行打包(webpack cli 对于打包不是必须的，因为可以使用默认参数打包)。
* 通常在执行 webpack 时会添加一些额外参数(入口，出口，指定配置文件....)

```js
// 命令行参数除了显式的 --config wk.config.js 还会有一个固定的参数
[
  'E:\nodejs\node.exe',
  'D:\webpack\node_modules\webpack\bin\webpack.js',
  '--config',
  'wk.config.js'
]
```

* webpack cli 会提供一些方便的命令，例如 npx webpack init, 初始化一个 webpack 文件。并且会询问很多事项(像 Vue cli 一样 )

## 环境的区分

* 如果 webpack 配置文件的导出内容为函数的话，函数的参数为默认传进入环境变量

### 本地环境

1. 更快的构建速度
2. 打印 debug 信息
3. 热更新功能
4. 需要 sourcemap

### 生产环境

1. 更小的体积
2. 对代码进行分割

## sourceMap

* 是一种映射关系，可以用来在线上反向定位源码

## 资源模块的使用

* webpack 5 之前需要加载 file-loader 和 url-loader 来处理图片资源
* webpack 5 新增了资源模块，允许使用资源文件(字体，图标)而无需额外 loader
  
1. asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
2. asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
3. asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
4. asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource

# Webpack 基础

## 一、基础概念

- 是一个现代的 javascript 应用的`静态`(打包完成的文件是静态资源)`模块`(支持模块化开发)打包工具
- 依赖 node 环境

### 1.1 前端模块化

- 使用模块化开发完项目之后，需要借助 webpack 工具来处理模块之间的依赖关系
- 不仅仅是 js 代码，图片，css，json 文件在 webpack 中都被当做模块

### 1.2 打包

- 把各种资源文件进行打包整合，合成一个或者多个包。
- 在打包的过程中，还可以进行资源的处理，压缩图片，scss 转化为 css，ES6 语法转化为 ES5 语法，typeScript 转化为 javascript

### 1.3 和 grunt/gulp 对比

- 他们只是一系列的任务，压缩，转化。
- 并不涉及到模块化的概念，不会处理模块化之间的依赖

## 二、使用

- npm init 生成 package.json 文件
- npm init -y 一键生成 package.json 文件(不需要手动输入一些信息)
- node_modules 文件下的 bin 目录包含了可以使用的指令, 同时拥有全局和局部的 webpack,想要使用局部的 webpack 时，需要到本地目录中执行 webpack node_modules/.bin/webpack。 想要直接使用局部 webpack 打包，可以使用 npx webpack 指令
- 在项目的 package.json 的 scripts 中执行的命令时会自动使用`局部的插件`
- 命令行参数的优先级，高于配置文件的参数优先级
- npx webpack --analyze 来分析 bundle
- webpack 的强大特性之一就是能通过 `import` 导入任何类型的模块(eg: .css)

## 三、配置

- webpack 允许不引入配置文件来打包项目(各种字段都会有自己的默认值)，为了高度的可定制性，一般项目都会有独立的配置文件

## 五、资源模块的使用

- webpack 5 之前需要加载 file-loader 和 url-loader 来处理图片资源
- webpack 5 新增了资源模块，允许使用资源文件(字体，图标)而无需额外 loader

1. asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
2. asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
3. asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
4. asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource

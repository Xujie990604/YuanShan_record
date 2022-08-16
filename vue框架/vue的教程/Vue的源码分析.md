<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-08-16 17:30:03
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\Vue的源码分析.md
 * @Description: Vue的源码分析
-->
# Vue的源码分析

* Vue内部使用flow来进行静态类型检验

## Vue的源码目录

![Vue源码目录](../img/Vue源码目录.png)

1. compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。编译是一项比较耗时的工作
2. core 目录包含了 Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。重点学习的目录
3. Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 native 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。重点学习WEB打包后的Vue文件
4. Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器。
5. 通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件来编写组件。sfc目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。
6. Vue.js 会定义一些工具方法，shared 定义的工具方法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的

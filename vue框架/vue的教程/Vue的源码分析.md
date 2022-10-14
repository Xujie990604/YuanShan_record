<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-08-16 17:30:03
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\Vue的源码分析.md
 * @Description: Vue的源码分析
-->
# Vue的源码分析

* Vue 内部使用 flow 来进行静态类型检验

## Vue的源码目录

![Vue源码目录](../img/Vue源码目录.png)

1. compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。编译是一项比较耗时的工作
2. core 目录包含了 Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。重点学习的目录
3. Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 native 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。重点学习WEB打包后的 Vue 文件
4. Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器。
5. 通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件来编写组件。sfc目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。
6. Vue.js 会定义一些工具方法，shared 定义的工具方法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的

## Vue 中的实例方法

* 实例方法指的是挂载到 Vue 的 prototype 上
* 全局方法指的是挂在到 Vue(构造函数) 上

```js
function Vue() {
  ...
  // 这五个函数的作用就是向 Vue 的原型中挂载方法
  initMixin(Vue)
  stateMixin(Vue)
  eventsMixin(Vue)
  lifecycleMixin(Vue)
  renderMixin(Vue)
}
```

### initMixin

* 会向 Vue 的 protoType 中 添加 _init 方法，在 new Vue() 的时候，会执行这个方法。这个方法实现了一系列的初始化操作，包括生命周期和响应式系统流程的启动

### stateMixin

* vm.$watch()
* vm.$set()
* vm.$delete()

### eventsMixin

* vm.$on
* vm.$once
* vm.$off
* vm.$emit

### lifecycleMixin

* vm.$mount
* vm.$forceUpdate
* vm.$nextTick
* vm.$destroy

## Vue 中的全局 API

### Vue.extend()

* Vue.extend() 是 Vue 的基础构造器
* Vue.extend 的作用是创建一个子类，所以可以创建一个子类，然后让它继承 Vue 身上的一些功能。

```js
// 子类的原型，继承于父类的原型
// 这个子类之后就可以使用父类上的一些属性和方法
02  Sub.prototype = Object.create(Super.prototype)
03  Sub.prototype.constructor = Sub
04  Sub.cid = cid++
```

### Vue.component()

* 注册或获取全局组件

### Vue.nextTick()

### Vue.set()

### Vue.delete()

### Vue.directive

* 注册或获取全局指令

### Vue.filter()

* 注册或获取全局过滤器

### Vue.use()

* 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。调用 install 方法时，会将 Vue 作为参数传入。install 方法被同一个插件多次调用时，插件也只会被安装一次

### Vue.mixin

* 安装Vue.js插件。如果插件是一个对象，必须提供install方法。如果插件是一个函数，它会被作为install方法。调用install方法时，会将Vue作为参数传入。install方法被同一个插件多次调用时，插件也只会被安装一次

### Vue.compile

* 编译模板字符串并返回包含渲染函数的对象

### Vue.version

* 编译模板字符串并返回包含渲染函数的对象

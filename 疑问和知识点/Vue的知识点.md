# Vue的知识点

## npm的区别

* npm install X 不会修改package.json 以后运行npm install时，不会自动安装
* npm install X --save 修改package.json文件 以后运行 npm install 会自动安装
production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中 安装到生成环境 vue react
* npm install X --save-dev 修改package.json文件 以后运行 npm install 会自动安装
production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中 安装到开发环境 例如gulp babel webpack等辅助工具

## npm install 和 Vue add 的区别

* Vue add 安装时(好像和创建Vue项目时选择的插件一样，自动创建目录引用，被Vue实例引用之后就可以全局使用了)Vue cli脚手架会自动生成目录来存放你安装的东西(例如axios)然后就可以直接在组件中用axios来使用axios方法
* npm install 安装时不会自动创建目录，不能直接全局使用 需要自己手动引入 并且需要自己手动给Vue函数的原型上设置属性才能全局引用 Vue.prototype.$axios = axios; 使用this.axios全局引用
* router store 需要Vue.use
* 使用npm安装axios时不需要Vue.use但是需要手动在Vue的原型上添加一个axios属性。axios使用vue add安装时，直接使用axios来使用(里面好像使用到了vue.use)

## 生产环境和开发环境

* npm run serve 时开发环境 在本地的服务器上模拟启动
* npm run build 时为生成环境 生成打包好的文件，用来部署到服务器上。

## vuex的使用

* 如果使用了vuex提供的方法，就可以直接调用对应的方法，或者数据

  ```javascript
  import { mapActions } from "vuex";
  mapActions(["fetchTodos"]),
  created() {
    this.fetchTodos();
  }
  ```

* 如果没有使用vuex提供的方法就要使用this.$store.dispatch(调用action函数的时候),commit(调用mutation的时候)，getters(调用getters的时候)，state(调用state的时候，通常放在computed里面)

## 其他知识点

* 用a来给router-link书写样式
* 只要修改了vue.config.js就要重启项目
* 切换路由并不会刷新页面。
* this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
* Vue绑定事件时加括号和不加括号 不加括号可以使用event访问事件对象，加了括号就必须传参数($event),加不加括号好像是有区别的好像是默认应该要加括号，不过能省略，但是需要使用函数的返回值的时候就必须要加括号(比如动态绑定class使用对象的时候，就可以使用一个函数的返回值).
* Vue 里面的数据方法都是在一个Vue的实例里面定义的，因此需要使用数据和方法时候就直接使用this，代指当前对象(Vue)，可是本来在method里面调用的函数，使用this时，this应该是指代的method对象。这是由于Vue框架使用了代理(proxy)。
* 语法糖：简写
* 遍历的时候如果有很多地方不是直接使用遍历的数据，那么推荐一个一个列出来(图书购物车实例的小案例)
* 今天在使用vue的路由传值的时候，死活得不到数据，重新编译进入之后才好，不是因为重新编译的问题，而是因为需要路由的跳转才能得到数据，我一直在当前界面刷新当然得不到上个页面跳转来的数据！！！！
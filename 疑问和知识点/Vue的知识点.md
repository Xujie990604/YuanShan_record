# Vue的知识点

## npm的区别

* npm install X 不会修改package.json 以后运行npm install时，不会自动安装
* npm install X --save 修改package.json文件，把版本号和插件名字写进dependencies(生成环境)模块中。 以后运行 npm install 会自动安装到node_modules目录中 安装到生成环境例如 vue react axios。
* npm install X --save-dev 修改package.json文件，把版本号和插件名字写进devDependencies(开发环境)模块中。使用npm install时根据是npm包还是项目会有不同的作用。例如gulp babel webpack等辅助构建工具

* 在发布npm包的时候，本身dependencies(生成环境)下的模块会作为依赖，一起被下载；devDependencies(开发环境)下面的模块就不会自动下载了；但对于项目而言，npm install 会自动下载devDependencies和dependencies下面的模块。

## npm install 和 Vue add 的区别

* Vue add 安装时(好像和创建Vue项目时选择的插件一样，自动创建目录引用，被Vue实例引用之后就可以全局使用了)Vue cli脚手架会自动生成目录来存放你安装的东西(例如axios)然后就可以直接在组件中用axios来使用axios方法
* npm install 安装时不会自动创建目录，不能直接全局使用 需要自己手动引入 并且需要自己手动给Vue函数的原型上设置属性才能全局引用 Vue.prototype.$axios = axios; 使用this.axios全局引用,或者是手动在Vue的实例中引入该插件。
* 使用npm安装axios时不需要Vue.use但是需要手动在Vue的原型上添加一个axios属性。axios使用vue add安装时，直接使用axios来使用

## Vue.use()

* 使用Vue.use(插件),之后会自动执行插件的install方法。防止重复注册。并且install方法的第一个参数会被默认传进去Vue。
* axios不需要注册组件，element-ui，router， Vuex需要注册组件

## 其他知识点

* 用a来给router-link书写样式
* 只要修改了vue.config.js就要重启项目
* 切换路由并不会刷新页面。
* Vue 里面的数据方法都是在一个Vue的实例里面定义的，因此需要使用数据和方法时候就直接使用this，代指当前对象(Vue)，可是本来在method里面调用的函数，使用this时，this应该是指代的method对象。这是由于Vue框架使用了代理(proxy)。
* 遍历的时候如果有很多地方不是直接使用遍历的数据，那么推荐一个一个列出来(图书购物车实例的小案例)
* vue中的this指向的是当前的Vue组件对象VueComponent。
* 父组件传给子组件的是对象(传的地址)的话，子组件修改数据不需要再进行emit事件了。
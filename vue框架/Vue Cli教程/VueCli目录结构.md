# 脚手架

## Vue使用命令

* vue create 文件名 
* vue ui 启动一个本地的服务器,用于图形化的管理本地的项目。
* 单独运行一个vue文件的方式，不在src下，在总目录下建一个xx.vue文件，执行vue serve xx.vue 或者vue build xx.vue
* Vue add xx  在vue-cli项目中安装插件并调用

* Vue add 安装时(好像和创建Vue项目时选择的插件一样，自动创建目录引用，被Vue实例引用之后就可以全局使用了)Vue cli脚手架会自动生成目录来存放你安装的东西(例如axios)然后就可以直接在组件中用axios来使用axios方法
* npm install 安装时不会自动创建目录，不能直接全局使用 需要自己手动引入 并且需要自己手动给Vue函数的原型上设置属性才能全局引用 Vue.prototype.$axios = axios; 使用this.axios全局引用,或者是手动在Vue的实例中引入该插件。
* 使用npm安装axios时不需要Vue.use()但是需要手动在Vue的原型上添加一个$axios属性。axios使用vue add安装时，直接使用axios来使用

## vue cli2的项目目录

* build文件夹放置的都是配置文件(抽离过的)
* config文件夹里面都是配置文件需要的变量
* node_modules放置的是使用到的包
* src里面放置的开发的代码
* static放置的是一些静态的文件，这个文件夹的好处就是，图片之类的不会经过处理(src中文件都会根据配置进行处理，转化为base64或者更改名字)，会把static文件夹里面的东西直接放到dist文件夹中。
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

* vue-cli 3的原则是零配置，移除config和build文件夹
* 提供了vue ui命令
* 移除了static文件夹，新增了public文件夹，并且把index.html文件移动到public中

### public和assets的区别

* Vue在打包之后，会将一些业务级的js文件合并到一个js文件夹中去。再开发时我们可能会使用一些第三方的插件(比如layer.js弹窗文件)。这些第三方我们我们不愿意在打包时被压缩到业务级的js文件中。那么就需要一个静态的，非改变的目录来存放这些第三方插件。
* build文件夹在打包的时候，会被原封不动的移动到dist目录中
* assets文件夹在打包时，会被压缩，合并到js业务代码中。

## vue cli4

* node_modules：用于存放我们项目的各种依赖；
* public：用于存放静态资源（不会变动的）；
    public/index.html：模板文件，作用是生成项目的入口文件。
    浏览器访问项目的时候就会默认打开的是生成好的 index.html。
* src：是存放各种 .vue 文件的地方。
* src/assets：用于存放着各种静态文件（可能会变动），比如图片。
* src/components：存放公共组件（可复用），比如 header.  vue、footer.vue 等。
* src/router/index.js：vue-router 路由文件。
    需要引入 src/views 文件夹下的 .vue，配置 path、name、component。
* src/store/index.js：是 vuex 的文件，主要用于项目里边的一些状态保存。
比如 state、mutations、actions、getters、modules。
* src/views，存放页面组件（不可复用），比如 Login.vue，Home.vue。
* src/App.vue：App.vue 是项目的主组件；
* App.vue 中使用 router-link 引入其他模块，所有的页面都是在 App.vue 下切换的。
* src/main.js：入口文件，主要作用是初始化 vue 实例，同时可以在此文件中引用某些组件库或者全局挂载一些变量。
* .gitignore：配置 git 上传想要忽略的文件格式。
* babel.config.js：一个工具链，主要用于在当前和较旧的浏览器或环境中将 ES6 的代码转换向后兼容（低版本ES）。
* package.json：模块基本信息项目开发所需要的模块，版本，项目名称。
* package-lock.json：是在 npm install 时候生成的一份文件，用于记录当前状态下实际安装的各个 npm package 的具体来源和版本号。

### vue项目部署到springBoot

* 打包之后，把dist目录放到springBoot项目的static目录下

### editorConfig

* 这是对于代码风格的要求的文件，在Vue cli2之后移除了这个文件，需要手动的去添加
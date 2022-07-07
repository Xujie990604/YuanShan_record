# VueCli基础

* Vue CLI使用了一套基于插件的架构，如果查阅一个新创建项目的package.json 就会发现依赖都是以 @vue/cli-plugin-开头的

## vue命令

* vue create 文件名 生成一个Vue项目
* vue ui 启动一个本地的服务器,用于图形化的管理本地的项目。
* 单独运行一个vue文件的方式，不在src下，在总目录下建一个xx.vue文件，执行vue serve xx.vue 或者vue build xx.vue
* vue add xx  在vue-cli项目中安装插件并调用(目前对于vue add的理解就是在npm的基础上添加一些功能比如说使用vue add axios会多创建一个文件夹进行axios的自动引入和简单配置)

## public和assets的区别

* Vue在打包之后，会将一些业务级的js文件合并到一个js文件夹中去。再开发时我们可能会使用一些第三方的插件(比如layer.js弹窗文件)。这些第三方我们我们不愿意在打包时被压缩到业务级的js文件中。那么就需要一个静态的，非改变的目录来存放这些第三方插件。(这些文件可以在index.html文件中通过相对路径引入,因为打包后(build文件不受影响)资源和index.html的相对路径并不会变化)
* build文件夹中的内容在打包的时候，会被原封不动的移动到dist目录中
* assets文件夹在打包时，会被webpack处理，合并到js业务代码中。(所以不可以在index.html文件中通过 相对路径来引入assets文件夹中的资源，打包过后资源和index.html的相对位置会发生变化)

## Vue 请求静态资源中的路径

* URL中是绝对路径，URL会被直接保存下来(适合请求public文件夹中的内容)
* URL中是相对路径。URL中的内容会被作为一个模块进行请求。且基于你的文件系统中的目录结构进行解析。(适合请求assets文件夹中的内容)
* URL开头是~  其后任何内容都会被当做模块解析(可以加载含有别名的静态资源，又能够加载node-modules中的资源)
* URL开头是@  好处是@是一个别名

## 配置文件

* 在node module的@vue下面的cli-serve下面的lib下面的service文件中隐藏了很多的配置

```js
module.exports = {
   configureWebpack: {
    //起别名 系统默认的配置@是文件夹src
    // 在DOM中使用别名的话，需要加上~
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}
```

# VueCli基础

* Vue CLI使用了一套基于插件的架构，如果查阅一个新创建项目的package.json 就会发现依赖都是以 @vue/cli-plugin-开头的

## vue命令

* vue create 文件名 生成一个Vue项目
* vue ui 启动一个本地的服务器,用于图形化的管理本地的项目。
* 单独运行一个vue文件的方式，不在src下，在总目录下建一个xx.vue文件，执行vue serve xx.vue 或者vue build xx.vue
* vue add xx  在vue-cli项目中安装插件并调用(目前对于vue add的理解就是在npm的基础上添加一些功能比如说使用vue add axios会多创建一个文件夹进行axios的自动引入和简单配置)

## public和assets文件夹的区别

* Vue在打包之后，会将一些业务级的js文件合并到一个js文件夹中去。再开发时我们可能会使用一些第三方的插件(比如layer.js弹窗文件)。这些第三方我们我们不愿意在打包时被压缩到业务级的js文件中。那么就需要一个静态的，非改变的目录来存放这些第三方插件。
* build文件夹在打包的时候，会被原封不动的移动到dist目录中
* assets文件夹在打包时，会被压缩，合并到js业务代码中。
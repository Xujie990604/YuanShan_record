<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-05-25 23:06:32
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2022-12-26 16:26:40
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue 脚手架\VueCli\VueCli基础.md
 * @Description:
-->
# VueCli基础

* Vue CLI(cli 命令行简写)使用了一套基于插件的架构，如果查阅一个新创建项目的package.json 就会发现依赖都是以 @vue/cli-plugin-开头的
* 在一个 Vue CLI 项目中，@vue/cli-service 安装了一个名为 vue-cli-service 的命令

## vue命令

* vue create 文件名 生成一个 Vue 项目
* vue ui 启动一个本地的服务器,用于图形化的管理本地的项目。
* 单独运行一个 vue 文件的方式，不在src下，在总目录下建一个xx.vue文件，执行vue serve xx.vue 或者vue build xx.vue
* vue add xx  在vue-cli项目中安装插件并调用(vue add 就是在 npm 安装依赖的的基础上还会创建一些文件)

## 插值

* 因为 index.html 被当做模板，所以可以使用一些插值。(插值可以使用客户端环境变量中的值)
* <%= BASE_URL %> 插值和 Vue 的 publicPath 配置项保持一致

## CSS

* Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。
* 使用脚手架的好处就是能够省去配置 webpack 的时间

## webpack 配置

* 在 node module 的 @vue 下面的 cli-serve 下面的 lib 下面的 service 文件中隐藏了很多的配置

```js
module.exports = {
  // configureWebpack 会被 webpack-merge 合并入最终的 webpack 配置
  configureWebpack: {
  //起别名 系统默认的配置 @ 是文件夹 src
    alias: {
      'assets': '@/assets',
      'common': '@/common',
      'components': '@/components',
      'network': '@/network',
      'views': '@/views',
    }
  }
}
```

## 模式和环境变量

### 模式

* development 模式用于 vue-cli-service serve
* test 模式用于 vue-cli-service test:unit
* production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e

### 环境变量

* 只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中。通过 process.env.xxx 进行访问
* 被载入的变量将会对 vue-cli-service 的所有命令、插件和依赖可用。

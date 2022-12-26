<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:10:59
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\webpack学习\笔记\PluginAndLoader.md
 * @Description: 
-->
# plugin 插件

## 插件的定义

* 对于 webpack 现有功能的扩展，比如打包优化，文件压缩。

## 常见的插件

### plugin

* 版权插件的使用 BannerPlugin 这个插件是 webpack 自带的

* 打包 html  的插件，html-webpack-plugin，发布网站时，只发布 dist 文件夹，但是默认的 webpack 的配置下。dist 文件中缺少 index.html 文件，需要使用插件来让 index.html 进入到 dist 文件夹中。并且自动将打包生成的 js 文件引入到 index.html 文件中

* 压缩js的插件。uglifyjs-webpack-plugin， 压缩 js 文件

* cleanWebpackPlugin 打包文件时，会自动删除之前的包在生成新的包

* copy-webpack-plugin 在webpack 进行打包时，直接将某个文件复制过去

* EsLint 很严格的 js 代码规范-

### loader

* 将高级的 Es6 转化为 es5，typescript 转化为 ES5 代码，scss 转化为 less，.vue 转化为 js 文件等。webpack 本身并不能做到的，需要借助 loader 扩展。

* css-loader 是用来加载 css。
* style-loader 是用来解析 css，把 css 渲染到 DOM 上

* less-loader， 需要使用 less-loader 进行文件的加载，less 进行文件的转化从 less 转化为 css 文件

* 图片，file-loader
* url-loader 和 file-loader 类似，但是可以将较小的文件转成 base64的URI.然后图片可以和其他资源放在一个请求中，减少对服务器的压力

* ES6 转化的 loader。babel-loader babel-core babel-preset-es2015，这三个包都需要安装。

* vue-loader(vue加载) 和 vue-template-compiler(vue模板编译)

## postCSS

* postCSS 不仅仅是一个简单的 loader。它和 webpack 一样，是一个工具。postCSS 的运行也会依赖很多插件

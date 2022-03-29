# plugin 插件

## 插件的定义

* 对于webpack现有功能的扩展，比如打包优化，文件压缩。

## 常见的插件

### 普通插件

* 版权插件的使用 BannerPlugin这个插件时webpack自带的

* 打包html的插件，html-webpack-plugin，发布网站时，只发布dist文件夹，但是默认的webpack的配置下。dist文件中缺少index.html文件，需要使用插件来让index.html进入到dist文件夹中。并且自动将打包生成的js文件引入到index.html文件中

* 压缩js的插件。uglifyjs-webpack-plugin， 压缩js文件

* EsLint很严格的js代码规范

### loader

* 将高级的Es6转化为es5，typescript转化为ES5代码，scss转化为less，.vue转化为js文件等，。webpack本身并不能做到的，需要借助loader扩展。

* css-loader是用来加载css，style-loader是用来解析css，把css渲染到DOM上

* less-loader， 需要使用less-loader进行文件的加载，less进行文件的转化从less转化为css文件

* 图片，url-loader

* ES6转化的loader。babel-loader babel-core babel-preset-es2015，这三个包都需要安装。

## vue使用到的包

* vue-loader(vue加载) 和 vue-template-compiler(vue模板编译)
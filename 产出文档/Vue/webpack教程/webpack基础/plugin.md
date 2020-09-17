# plugin 插件

## 插件的定义

* 对于webpack现有功能的扩展，比如打包优化，文件压缩。

## 版权插件的使用

* BannerPlugin这个插件时webpack自带的

```js
// 先导入这个webpack
const webpack = require('webpack');

// 在配置文件中进行定义
plugins:[
        new webpack.BannerPlugin("风情岂止万种")
    ]
```

## 打包html的插件

* html-webpack-plugin
* 发布网站时，只发布dist文件夹，但是默认的webpack的配置下。dist文件中缺少index.html文件
* 需要使用插件来让index.html进入到dist文件夹中。并且自动将打包生成的js文件引入到index.html文件中

```js
// 导入插件
const htmlWebpackPlugin = require('html-webpack-plugin')

// 配置的改动
 // publicPath:'dist/'因为使用了htmlWebpackPlugin插件所以不再需要配置这样一个目录了

// 配置
 plugins:[
        new webpack.BannerPlugin("风情岂止万种"),
         new htmlWebpackPlugin({
            template:'index.html'//使用当前目录下的index为模板
            //由于系统会自动把生成的js文件插入到index.html文件中，所以index.html的模板中不用在引入js文件了
        })
    ]
```

## 压缩js的插件

* uglifyjs-webpack-plugin
* 压缩js文件

```js
// 导入
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// 配置
plugins:[
        new webpack.BannerPlugin("风情岂止万种"),
        new htmlWebpackPlugin({
            template:'index.html'
        }),
        new uglifyjsWebpackPlugin(),
    ]
```
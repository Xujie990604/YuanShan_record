# 基础使用

## webpack的基础使用

* 安装完webpack之后，就可以按照es6或者commonjs的规范来开发
* 使用webpack ./src/main.js ./dist/bundle.js命令把js文件进行打包，然后在index.html中引用bundle文件即可

## webpack的配置文件

* 创建一个webpack.config.js文件
* 需要引入path这个包
* 在下载path这个包之前，需要使用npm init来初始化一下,然后需要一系列的配置生成一个package.json
* 在package.json文件中进行入口和出口文件的配置之后，就可以直接使用webpack命令来打包
* 使用npm install会生成一个package-lock.json文件
* node_modules文件夹里面都是默认安装的一些包和自己手动安装的局部依赖

## loader

* 将高级的Es6转化为es5，typescript转化为ES5代码，scss转化为less，.vue转化为js文件等，
* webpack本身并不能做到的，需要借助loader扩展。

### css

* 把css也当做模块来看待，webpack在打包的时候只会找入口文件。main.js，所以想要css最终被打包的话，需要在main.js中引入css

* css-loader是用来加载css
* style-loader是用来解析css，把css渲染到DOM上

* 安装完之后也需要去webpack的配置文件中去配置一些字段

```js
module.exports = {
    entry:'./src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),//出口文件的绝对路径，使用path来生成
        filename:'bundle.js',//出口的文件名字
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                //css-loader负责将css文件进行加载
                //style-loader负责将样式添加到DOM中
                //webpack在使用多个loader时，是从右到左解析
                use: ['style-loader','css-loader']
            }
        ]
    }
}
```

### less-loader

* 需要使用less-loader进行文件的加载
* less进行文件的转化从less转化为css文件

```js
module: {
        rules: [
            {
                test:/\.css$/,
                //css-loader负责将css文件进行加载
                //style-loader负责将样式添加到DOM中
                //webpack在使用多个loader时，是从右到左解析
                use: ['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:[{
                    // 最后渲染到DOM上
                    loader:"style-loader"
                },{
                    // 在转化
                    loader:"css-loader"
                },{
                    // 先加载
                    loader:"less-loader"
                }]
            }
        ]
    }
```

### 图片

* 图片被处理的时候也能被看成是模块

#### url-loader

* 安装这个loader然后在配置文件进行配置

```js
{
                test: /\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            // 当图片的大小小于这个limit的话webpack就会把图片转化为base64的格式，不需要打包了
                            // 当图片大小大于这个limit的话，需要使用file-loader包，这个包不需要配置，只需要安装
                            // 但是当图片的大小超过limit时，就会把图片打包。url的路径会发生错误，找不到图片，需要配置一个默认路径(在下面)
                            // 图片打包的时候生成的名字是一个32位的hash，为了防止名字重复
                            // 为了优化图片的打包。我们可以在option中添加选项
                            // img是要打包到的文件夹
                            // name获取图片原本的名字
                            // hash：8在原来的名字上加入八位的hash
                            // ext使用原来的扩展名
                            limit: 100000,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }

    output: {
        path: path.resolve(__dirname,'dist'),//出口文件的绝对路径，使用path来生成
        filename:'bundle.js',//出口的文件名字
        publicPath:'dist/' //只要是涉及到了url，就会上这里来添加默认路径，当可以使用一个插件把index.html文件也放到dist文件夹里面之后就又不需要了
        },
```

### ES6转化的loader

* babel-loader babel-core babel-preset-es2015
* 这三个包都需要安装

```js
{
                test:'/\.js$/',
                // exclude不包含
                exclude: /(node_modules|bower_component)/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets:['es2015']
                    }
                }
            }
```

### Vue

* import Vue from 'vue'如果from后面的字符串不是一个路径的时候，说明要去node_modules里面查找包
* 不需要我们自己export Vue，源码里面已经自动导出了，使用的是export default Vue
* import { add, mul} from './js/a.js'这种就是去当前文件的相对位置进行查找

#### vue

* 使用npm install vue --save进行安装，Vue是运行时需要使用的包，所以不用--save-dev
* 在哪个js文件想要使用Vue时，就使用import Vue from 'vue'来导入一下

#### 两个不同的版本

* runtime-only 版本的代码中不可以在main.js中有template。
* runtime-compiler版本中的代码可以有template，因为有compiler用于编译template

* 在webpack的配置文件中填写这一条属性，这条属性就是去node_modules文件下的dist文件，使用vue.esm.js的版本。

```js
resolve: {
    // alias别名
        alias: {
            'vue$':'vue/dist/vue.esm.js'
        }
    }
```

#### el和template的关系

* 同时有el和template属性时，template里面的内容会自动替换到el属性指定的DOM中
* 所以并不在需要去html文件中修改html标签

```js
new Vue({
    el:'#app',
    template: `
    <div>
        {{message}}
    </div>
    `,
    data :{
        message:"xujie"
    }
})
```

* 在vue实例里面写html会很麻烦,所以不再Vue的实例里面写，只在实例中插入一个组件

```js
const App = {
    template:`
    <div>
        {{message}}
    </div>
    `,
    data() {
        return {
            message:"徐杰"
        }
    }
}

// Vue实例里面只放置一个组件，组件内其他的东西去别的地方定义
new Vue({
    el:'#app',
    template: `<App/>`,
    components:{
        App
    }
})
```

<!-- 组件写成一个vue的文件，就能做到结构，样式，行为相分离 -->

```js
// 引入vue的包
import Vue from 'vue';
// 引入App根组件
import App from './vue/App.vue'


new Vue({
    el:'#app',
    template: `<App/>`,
    components:{
        App
    }
})
```

#### vue使用到的包

* vue-loader(vue加载) 和 vue-template-compiler(vue模板编译)
* 有一个注意的点是vue-loader的版本<=13的话，可以直接使用,不然的话需要配置一些东西(没有讲)
* 底下是配置

```js
{
    test: /\.vue$/,
        use :[{
                loader:'vue-loader',
            }]
}
```

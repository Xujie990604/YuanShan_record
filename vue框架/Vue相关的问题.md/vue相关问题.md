# Vue的问题

* 自定义组件的名字永远不要使用单个单词，以免和未来的html标签冲突

## 请求图片地址

想要通过变量的方式来引入图片，可以使用img:require('.....')
想要引入图片的数组的话，需要使用到node的require.context('')方法

```js
const images = require.context('../assets/images',false,/\.(png|jpg)$/i);
const imagesList = images.keys().map(item => images(item));
// imageLists就可以用来数组遍历
```

## css的问题

* 可以在控制台中查看引用子组件的最顶层DOM的class。可以直接在父组件中通过这些class来修改样式。顶层DOM里面的DOM就需要使用 >>> 击穿语法来修改

只需要在父元素上加上 >>> 语法，里面的子元素不需要再加>>> 语法了

## vscode终端

* 打开 ctrl + ~
* 终止 ctrl + c

## 在Vue的main.js index.html app.vue中引入css的区别

* 在main.js中使用的是@import语法，全局引入
* 在app.vue中根据coder加不加scoped。会有全局引用和组件内引用的不同
* 在index.html中使用的是`<link>`标签引入。使用link不仅仅是引入css，同时还支持更多的功能


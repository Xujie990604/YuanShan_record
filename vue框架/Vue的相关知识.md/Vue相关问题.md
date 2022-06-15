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

## template模板

* template的最重要特点就是不会被渲染成DOM元素
* 一般template搭配 v-for或者v-show使用。

```js
// 想要同时控制五个li的显示，需要给li外面加上一个容器，然后配合v-show指令使用。
// 外面这个容器的唯一功能就是配合v-show指令。所以用template代替div会更好
// 因为template不会被渲染为DOM结构，最终渲染出来的HTML结构嵌套层级会比较浅。不会引入无意义的DOM结构。
<template v-show="isTrue">
    <li class="xujie1">1</li>
    <li class="xujie2">1</li>
    <li class="xujie3">1</li>
    <li class="xujie4">1</li>
    <li class="xujie5">1</li>
</template>
```

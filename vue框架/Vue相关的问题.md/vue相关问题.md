# Vue的问题

## 请求图片地址

想要通过变量的方式来引入图片，可以使用img:require('.....')
想要引入图片的数组的话，需要使用到node的require.context('')方法

```js
const images = require.context('../assets/images',false,/\.(png|jpg)$/i);
const imagesList = images.keys().map(item => images(item));
// imageLists就可以用来数组遍历
```

## css的问题

* 可以在控制台中查看引用子组件的最顶层DOM的class。可以直接在父组件中通过这些class来修改样式。顶层DOM里面的DOM就需要使用>>> 击穿语法来修改

只需要在父元素上加上>>> 语法，里面的子元素不需要再加>>> 语法了。
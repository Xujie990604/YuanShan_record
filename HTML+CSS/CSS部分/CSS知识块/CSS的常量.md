# css的常量

## 定义形式

```css
/* 原来我一直以为常量只能定义在在:root上,其实不是的，可以定义在任何的元素上。并且有作用域,通常定义在:root上因为他是根元素 */
:root {
    <!-- 定义常量的时候必须要以--符号开头 -->
    --normal-height: 20px;
    --normal-height: 20px;
    --normal-color: red;
}

div {
    /* 使用常量的时候需要使用var字符来引用 */
    height: var(--normal-height);
    color: var(--normal-color);
}
```

## :root 和 html标签

* css的设计并不只是为了应用在html上
* :root在css中的意思是根元素。在html文档中代表的就是html标签。但是在其他文档中就不一定了。

## 在css中改变常量

* 因为常量不只是定义在:root伪元素,也可以定义在文档中的其他子节点中。
* 所以常量也和其他的css属性一样，具有层叠性和继承性。
* 可以实现局部的变量的更改。(其中animate.css中就需要使用到这个特性)

## 在js中改变常量

```js
// document.documentElement获取的就是html标签
// 可以在html上设置自定义属性
// 也就是可以理解为css中的常量差不多就是 html DOM 的属性
document.documentElement.style.setProperty("--animate-duration", '5s')
```
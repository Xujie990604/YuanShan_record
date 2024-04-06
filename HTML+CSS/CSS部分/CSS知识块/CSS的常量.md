<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\HTML+CSS\CSS部分\CSS知识块\CSS的常量.md
 * @Description: 
-->
# css的常量

## 定义形式

```css
/* 原来一直以为常量只能定义在在:root上,其实不是的，可以定义在任何的元素上。并且有作用域,通常定义在:root上因为他是根元素 */
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

## :root 和 html 标签

* css 的设计并不只是为了应用在 html 上
* :root 在 css 中的意思是根元素。在 html 文档中代表的就是 html 标签。但是在其他文档中就不一定了。

## 在 css 中改变常量

* 因为常量不只是定义在 :root 伪元素,也可以定义在文档中的其他子节点中。
* 所以常量也和其他的 css 属性一样，具有层叠性和继承性。
* 可以实现局部的变量的更改。(其中 animate.css 中就需要使用到这个特性)

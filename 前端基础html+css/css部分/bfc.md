# BFC

## 元素的BFC(块级格式上下文)

* 块级格式化上下文，一个独立的块级渲染区域，该区域拥有一套渲染规格来约束块级盒子的布局，且与区域外部无关。

### 如何触发BFC

* float 为 left,right
* overflow 的值为auto，hidden。
* display 的值为table-call，table-caption，inline-block，flex
* position 为 absolute,fixed

### 元素的BFC特性

* 元素BFC化后，与浮动元素做兄弟，不会与浮动元素重叠尽管元素不重叠，但是BFC元素想要与左边元素有间隔时

1. 如果使用BFC元素的margin时，数值 = 目标间隔 + 浮动元素宽度
2. 如果使用浮动元素的margin时，直接加上一个margin-right，就能拉开距离。
3. 计算bfc元素的高度时，浮动元素也会参加运算，不需要再去清除浮动。(格式化上下文自动包含该浮动元素)。
4. bfc就是一个独立的隔离容器，容器里面的子元素不会受到外面元素的影响
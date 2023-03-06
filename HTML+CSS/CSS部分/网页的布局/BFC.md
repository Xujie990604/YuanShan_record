# BFC

## 元素的BFC(块级格式上下文)

* 块级格式化上下文，一个独立的块级渲染区域，该区域拥有一套渲染规格来约束块级盒子的布局，且与区域外部无关。
* 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。

### Box 和 Formatting Context

* Box 就是 css 布局的的对象和基本单位，一个页面有很多个 Box 组成，元素的类型和 display 属性，决定了这个 Box 的类型，会参与不同的 Formatting Box。最常见的有 Block formatting Box(bfc) 和 inline formatting Box(IFC)
* Formatting Context 是页面中的一块渲染区域，有一套渲染的规则，他决定了子元素是如何的定位，以及和其他元素的关系和相互作用。

### 如何触发BFC

* float 为 left, right
* overflow 的值为 auto，hidden。
* display 的值为 table-call，table-caption，inline-block，flex
* position 为 absolute, fixed

### BFC 特性的理解

* 因为 BFC 内部的元素和外部的元素绝对不会互相影响。因此
* 当 BFC 外面存在浮动时，为了不受浮动而影响 BFC 内部元素的布局。BFC 会不与浮动重叠。
* 当 BFC 内部有浮动时为了不影响外部的元素的布局，BFC 高度会包含浮动。
* 避免 margin 重叠也是这个道理。两个元素直接相邻会产生 margin 重叠，但一个触发了 BFC 的元素包裹住其中一个的话，margin 就不会重叠。

### 元素的BFC特性

* 元素 BFC 化后，与浮动元素做兄弟，不会与浮动元素重叠尽管元素不重叠，但是 BFC 元素想要与左边元素有间隔时

1. 如果使用 BFC 元素的 margin 时，数值 = 目标间隔 + 浮动元素宽度
2. 如果使用浮动元素的 margin 时，直接加上一个 margin-right，就能拉开距离。
3. 计算 bfc 元素的高度时，浮动元素也会参加运算，不需要再去清除浮动。(格式化上下文自动包含该浮动元素)。
4. bfc 就是一个独立的隔离容器，容器里面的子元素不会受到外面元素的影响

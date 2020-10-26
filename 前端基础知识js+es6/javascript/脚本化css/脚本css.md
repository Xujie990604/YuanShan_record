# 脚本化css

## DOM.style

* dom.style返回一个类数组(包含所有属性，没定义过的是空值，只会读取行间样式的属性)。
* 赋值时用字符串形式。
* js里面访问css属性，不能有-(中划线)。变成小驼峰式。
* 碰到float这样的保留字(保留字有特殊的写法)，前面应该加上css。---> cssFloat  class---> className
* css复合属性尽量拆解。-->border

## getComputedStyle()

* window.getComputedStyle(Element,null);
* window.getComputedStyle(Element,"after");获取伪元素的唯一方法
* 只读css类数组。未定义的值全是默认值。不仅仅是获取行间样式的css属性。而是获取元素所真正表现出来的css样式。
* 返回的数据都是绝对值，没有相对值。
* IE8及以下不兼容。

## 更改伪元素的css样式

* 想要改变一个伪元素的css样式。没有办法通过js直接改变。
* 但是可以定义几种不一样的css样式。通过js来改变伪元素的类名。从而改变伪元素的样式。
* 改变一般Dom的样式也可以用这种方式，省效率。

## Element.currentStyle

* Element.currentStyle
* 计算样式只读，返回的不是经过转换的绝对值
* IE独有的属性

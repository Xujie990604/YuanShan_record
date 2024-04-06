# CSS-DOM

## 浏览器里面的网页其实是由以下三层信息构成的一个共同体

* 结构层
* 表示层
* 行为层
* 三个层次都会有重叠的部分，比如 html 会有默认的样式和行为，css 的伪类根据行为类改变，当然 DOM 也会有一定的技术来进军表现层。

## style属性

### 每个元素都会有一个 style 属性，这个属性是一个对象。样式都存放在这个对象中

* js 不能写-(会被识别为减号运算符)，只能用小驼峰方法写。如 background-color 写成 backgroundColor float(因为是关键字)所以写成 cssFloat
* style 对象上的属性可读可写。style 对象上的属性全是以字符串的形式来读取和赋值。

### 局限性

* 只能返回内嵌的样式，(表现信息和结构信息杂糅在一起了)，不能检索出使用外部 css 文件内和 head 内 style 标签中的样式。

## className 属性

* 如果想改变一个 html 结构的 class，直接用 div.className= "",就可以了，不用 setAttribute，使用这个设置属性时，是替换而不是追加。
* className 是一个可读可写的属性，但凡是元素节点都会有这个属性。
* 用起来很麻烦，除非是你想清空所有的类名，或者是完全重写元素的类名

## classList 属性

* add 添加 contains 是否包含 remove 移除 toggle 切换
* HTML5 规范中定义的属性，完美代替 className 属性的使用

## getComputedStyle()

* 会获得当前元素的所有特性(是计算后的值)，包括继承过来的。
* 数据都是只读的，不可以用来设置值。
* getComputedStyle(ele, null); 第二个参数可以添加伪元素，这是唯一一个用来获取伪元素的样式的方法

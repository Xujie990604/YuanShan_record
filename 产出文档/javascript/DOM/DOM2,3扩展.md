# DOM2,DOM3

## document

* 里面包含的不只是可以页面显示的DOM，html文件开头的文件声明也能通过document的属性来访问到。

## 方法和特性

* 增加好多有的没的的属性和方法，这辈子都不一定用得到。

## 元素的大小

### 元素的偏移量

* (对于无定位父级的元素，返回相对于文档的坐标，对于有定位父级的元素，返回相对于最近的有定位的父级的坐标)
* offsetHeight 指的是元素在垂直方向上占用的空间大小。包括宽度边框内边距的滚动条的宽度。
* offsetWidth 指的是元素在水平方向上占用的空间大小。包括宽度边框内边距的滚动条的宽度。
* offsetLeft 指的是元素的左外边框和元素的(包含元素)的左内边框的距离。
* offsetTop 指的是元素的上外边框和元素的(包含元素)的上内边框的距离。
* offsetParent 是元素的包含元素(查看最近的有定位的元素)   和元素的parentNode可不是一个概念
* 只读的，并且每次访问都需要重新计算，耗费性能

### 元素的客户区大小

* clientHeight 指的是元素的内容区及其内边距所占的高度(不包括边框和滚动条)
* clientWidth 指的是元素的内容区及其内边距所占的宽度(不包括边框和滚动条)
* 通常用来检测浏览器视口(不包括滚动条)的大小  使用document.documentElement.clientHeight(html元素的客户区大小)
* 只读的。每次访问都需要重新计算

### 元素的滚动大小

* scrollHeight 在没有滚动条的情况下，元素内容的高度，也就是元素的实际高度。
* scrollWidth 在没有滚动条的情况下，元素内容的宽度，也就是元素的实际宽度。
* scrollLeft 被隐藏在内容区域的左侧的像素数，通过这个属性可以设置元素的滚动位置
* scrollTop 被隐藏在内容区域的上方的像素数，通过这个属性可以设置元素的滚动位置
* 通常认为html元素是在WEb浏览器视口中滚动的元素，因此页面的真实的总高度是document.documentElement.scrollHeight
* 在确定文档的高度时，选用scrollHeight和clientHeight中的最大值

### 元素的大小方法

* 查看元素的几何尺位置。兼容性比较好。返回的不是实时的 getBoundingClientRect()
* 返回的有top，bottom，right，left和(x,y)  top - bottom 就是offsetHeight

## 遍历

* 对DOM结构采用深度优先的策略进行遍历操作，以给定节点为根节点。
* NodeIterator()
* TreeWalker() 高程p326

## 范围

* hasFeature()方法用于检测DOM的实现是否支持某个特性。
* 范围的特性在高程 p332
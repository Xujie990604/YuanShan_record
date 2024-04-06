# window对象

## 双重角色

* window既是javascript中访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。
* 在网页中定义的任何一个对象，变量和函数都是window的属性，但是直接访问变量和通过window访问属性还是有些不同。
* var过的属性不可以delete删除，window上的属性可以通过delete删除。
* 尝试访问未声明的变量会报错，但是通过window对象来访问一个没有定义属性不会报错，这属于查询。

## 框架与window

* 每个框架都有自己的window对象，每个对象都有一个name属性，是框架的名称。
* top指的是最高层的框架(浏览器窗口)
* parent指的是父级
* 在使用框架的情况下会存在很多Global对象，每个window对象都会包含自己的原生类型的构造函数，因此跨框架使用instanceof会出现问题。

>>> https://www.jianshu.com/p/62f691f4811c
>>> 简书上的文章，js的视口宽高，元素位置，滚动高度，尺寸属性
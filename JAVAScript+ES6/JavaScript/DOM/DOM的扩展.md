# DOM的扩展

## 焦点管理

* document.activeElement属性 这个属性会引用当前获得焦点的元素，文档刚加载完时保留的是body的引用，文档加载时值为null。
* document.hasFocus()方法 返回布尔值，该文档是否有焦点
* 获得焦点的方式：页面加载，用户输入和调用Element.focus()方法

## readyState属性

* document.readyState属性有两个值，指示文档是否已经加载完毕
* 正在加载文档时 loading
* 已经加载完文档 complete

## 兼容模式

* document.compatMode属性有两个值
* 在标准模式下 CSS1Compat
* 混杂模式下 BackCompat

## 自定义属性

* 自定义属性要添加前缀data-，目的是为了添加与渲染无关的信息。
* 使用元素的dataset属性可以访问自定义的属性构成的类数组，可读可写。
* 数组里面的自定义属性的name不带有data-。数组里面是以键值对的形式出现的。
* HTML5规范添加的

## contains()

* 用于知道某个节点是不是另一个节点的后代。
* 还没有被HTML5标准收入

## innerText outerText

* innerText属性在读取时会读取元素的文档树中的所有文本
* innerText属性在设置值得时候，会先删除元素的所有子元素然后把文本插入进去当做文本节点。
* outerText和innerText使用方法差不多，在进行设置时会把元素自身删除，使用文本节点代替。不常用。
* 没有被HTML5规范收入

## 滚动

### scrollIntView()

* HTML5规范制定

### scrollIntoViewIfNeeded()

* 没有被HTML5规定

### scrollBylines()

* 没有被HTML5规定

### scrollByPages()

* 没有被HTML5规范制定
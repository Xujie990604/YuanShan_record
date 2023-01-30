# DOM的扩展

## 焦点管理

* document.activeElement 属性 这个属性会引用当前获得焦点的元素，文档刚加载完时保留的是 body 的引用，文档加载时值为 null。
* document.hasFocus() 方法 返回布尔值，该文档是否有焦点
* 获得焦点的方式：页面加载，用户输入和调用 Element.focus() 方法

## readyState 属性

* document.readyState 属性有两个值，指示文档是否已经加载完毕
* 正在加载文档时 loading
* 已经加载完文档 complete

## 兼容模式

* document.compatMode 属性有两个值
* 在标准模式下 CSS1Compat
* 混杂模式下 BackCompat

## innerText outerText

* innerText 属性在读取时会读取元素的文档树中的所有文本
* innerText 属性在设置值的时候，会先删除元素的所有子元素然后把文本插入进去当做文本节点。
* outerText 和 innerText 使用方法差不多，在进行设置时会把元素自身删除，使用文本节点代替。不常用。
* 没有被 HTML5 规范收入

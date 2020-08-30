# DOM core 和 HTML-DOM

## DOM core

* document.getElementById,getAttribute等属性属于DOM core
* 他们不是专属于javascript，支持DOM的任何一种语言都可以使用。他们的用途也并不是局限于处理网页

## HTML_DOM

* 有一些比较简便的方法比如  ele.href 等价于 ele.getAttribute("href),ele.src = source 等价于ele.setAttribute("src","source")
* 任何元素的所有特性，都可以通过DOM元素本身的属性来访问，自定义的特性不可以。
* 只可以在javascript文档中使用

## 举例

* ```body.getElementByTagName("body")[0]```  等价于 document.body
* ele.href 等价于 ele.getAttribute("href)
* ele.src = source 等价于ele.setAttribute("src","source")
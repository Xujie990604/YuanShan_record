<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\JavaScript\DOM\DOM.md
 * @Description: 
-->
# DOM(文档对象模型)

* 文档对象模型(Document Object Model)，javaScript 提供了 DOM API 来操作 DOM
* 一份 HTML 文档就是一份节点树。

## Node 接口

* DOM1 级定义了一个 Node 接口，所有 DOM 节点类型都要实现该接口。
* 在 JS 中这个接口是作为 Node 类型类实现的。因此所有的 DOM 结点都共享相同的基本属性(nodeName, nodeValue, childNodes, previousSibling, nextSibling等属性)和方法(appendChild(), replaceChild(), removeChild()等方法)

### 节点的四个属性

1. nodeName 元素的标签名，大写形式表示，只读。

2. nodeValue(用于更改元素的文本，可读可写)

* 想要获取一个元素的文本，不能直接使用 nodeValue，而是要使用 ele.firstChild.nodeValue;
* 因为元素内的文本也是一个节点(文本节点)。获取的是元素节点的子节点的 nodeValue

3. nodeType 该节点的类型，只读

* 节点的类型元素节点    1属性节点    2文本节点    3

4. attributes   Element节点的属性(自身的属性例如 class 和 id )集合，根据 DOM 树动态检索的集合。

### 设置和获取节点的属性(一级DOM方法，兼容性好)

* getAttribute("title") 用来查询 DOM 节点的属性。
* setAttribute("title","xujie") 可以用来更改或者添加属性节点的值(可以设置文档中任何一个元素的任何属性
* 元素的特性，都可以通过 DOM 元素本身的属性来访问(作为对象属性进行读写这种形式比较简洁方便)(class 需要使用 className 来访问)，自定义的特性不可以(需要使用 getAttribute('xxx')方法)
* 用来操作自定义的特性，特性的名称不区别大小写，但是根据 HTML5 规范，自定义的特性要加上 data-前缀
* removeAttribute() 用来彻底删除元素的特性。

### 节点树相关属性

* parentNode   父节点
* childNodes    子节点们
* firstChild 第一个子节点
* lastChild  最后一个子节点  
* nextSibling  下一个兄弟节点
* previousSibling 前一个兄弟节点
  
* Node.hasChildNodes()节点是否拥有子节点

### 基于元素节点树的遍历(不包含属性结点，文本结点等)

* parentElement 返回当前元素的父元素节点
* children 只返回当前元素的子节点
* node.childElementCount === node.children.length 当前元素节点的子节点个数
* firstElementChild  返回的是第一个元素节点
* lastElementChild 返回的是最后一个元素节点
* nextElementSibling 返回下一个兄弟元素节点
* previousElementSibling 返回前一个兄弟元素节点

### childNodes 属性

* 用来获取一个元素的所有子元素(不仅仅是元素节点)。
* 返回结果是一个 NodeList 对象.是一种类数组对象。每次访问都会运行一次基于文档的查询。所以尽量减少对于 NodeList 的访问。
* 并不是 Array 的实例，因为这个 NodeList 对象是基于 DOM 结构动态执行查询的结果，是有生命的呼吸的对象。
* firstChild，lastChild，nextSibling，previousSibling 都是在 childNodes 的 NodeList 对象中进行遍历的。

## 获取元素的方法

### document.getElementById(id)

* 根据 id 获取元素
* 只定义在 document 对象上
  
### document.getElementsByTagName()

* 获取一个对象数组(类数组)，数组里面存储着所有符合类型的 DOM 对象
* 返回的这个数组里面的数据是根据 DOM树 动态获取的。不是静态的。
* 参数使用 "*"，通配符选择器
* 可以是某个 DOM 对象的方法

### document.getElementsByClassName()

* 返回值同样是一个对象数组(类数组)。
* 参数可以填写 "*" 通配符来选择所有的元素。
* 参数可以有多个类名，使用空格来隔开，该方法会选择所有包含了这些类名的 DOM。参数顺序无所谓。
* 是 HTML5 规范中制定的
* 可以是某个 DOM 对象的方法

### 按照 css 的选择方式进行选择的方法

* querySelector 可以直接按照 css 选择器类型进行选择。并且选择出来的是第一个。
* querySelectorAll 选择出来的是一组
* 返回值是一个 NodeList 对象，不过底层实现是一组元素的快照，而非不断的对文档进行搜索的动态查询，这样的实现避免因为 NodeList 的性能问题。
* document 和 Element 都可以调用这两个方法

## document 对象

* document 代表的是整个 HTML 文档(包含的不只是页面显示的 DOM，html 文件开头的文件声明也能通过document 属性访问到)
* document.documentElement 就是 ```<html>```
* document.body 就是  ```<body>```
* document.head 就是  ```<head>```
* document.title 获取页面标题
* document.url 包含当前页面的完整 URL
* document.domain 包含当前页面的域名
* document.referrer 包含链接到当前页面的那个页面的URL

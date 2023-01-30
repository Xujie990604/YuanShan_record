<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\JavaScript\DOM\Dom的增删改查.md
 * @Description: 借用 DOM API 来动态的修改 DOM
-->
# DOM的结构进行修改

## 动态创建标记

* 使用 document.createElement() 创建元素节点之后不会立马在页面显示，因为它虽然被创建但是并没有进入到 DOM 树上，只是游离在 JS 世界的孤儿。

### 增加

* document.createElement() 创建元素节点
* document.createTextNode() 创建文本节点
* document.createComment() 创建注释节点

插入:

* parent.appendChild()  用于向 childNodes 的列表末尾添加一个节点。和手写代码的不一样，手写的后面会带有一个 text 节点，要是插入的话就不会有 text 节点。如果插入的节点本身就是 childNodes 列表中的一部分，那么就会把那个节点抽离出来放到 childNodes 列表的后面，因为一个节点不可能被同时挂在节点树上两次。
* parent.insertBefore(a,b) 把 a 标签插入到 b 标签前面，要是 b 赋值为 null 的话，就和appendChild() 一样的操作。DOM 没有提供 insertAfter函数()
  
### 删除

* parent.removeChild()  被剪切出来有返回值
* child.remove() 自己销毁了没有返回值

### 替换

* parentNode.replaceChild(new, origin) 返回值是被替换出去的那个节点

## 其他方法

### cloneNode()

* 创建调用这个方法的节点的副本
* 可以传递一个布尔值的参数，如果传递的是true的话，执行深复制，复制节点以及整个节点树，如果传递的是false的话，只复制自身节点。不复制子节点。
* 使用该方法不会复制js属性(除了IE)，例如事件处理程序。

### normalize()

* 在某个节点上调用这个方法的时候。
* 处理文档树中的文本节点，会删除空的文本节点，合并多个文本节点。

## write

* document.write() 方法可以用来向页面中添加结构，可以识别 html 的标记类型
* 最好不要使用，因为违背了行为与结构相分离的宗旨。不容易阅读和维护。
* 如果在文档结束之后再调用 document.write()，输出的内容会覆盖整个页面。

## innerHTML(HTML5规范添加的)

* DOM 提供的方法就像是手术刀一样精准，每个节点包括他的属性节点文本节点子元素节点，然而 innerHtml 就像是大锤一样鲁莽
* innerHTML 是一股脑读取或者替换修改元素(内部)的所有内容。
* outerHTML 是一股脑的读取或者替换(元素自身及其元素内部)的内容
* 是 html 的特有属性
* innerHTML = 'Text' 是把原来的东西替换成'text'; innerHTMl += "text" 是在原来的基础上加上'text'
* 不是所有的 DOM 元素都完美支持 innerHtml 的使用，比如插入 script 和 style 标签，使用时就会有很多禁忌。然而html，head，table等标签不支持使用 innerHTML 属性。

* 使用 innerHTML 属性删除带有事件处理程序和 JS 对象的 DOM 后，事件处理程序和 JS 对象与 DOM 的引用并没有断，会造成内存泄漏。
* 因此使用 innerHTML，outerHTML方法时，最好手动删除事件处理程序和js对象的引用。
* 使用 innerHTML 也会耗费性能，尽量集中使用 innerHTML

# DOM的结构进行修改

## write

* document.write()方法可以用来向页面中添加结构，可以识别html的标记类型
* 最好不要使用，因为违背了行为与结构相分离的宗旨。不容易阅读和维护。
* 如果在文档结束之后再调用document.write()，输出的内容会覆盖整个页面。

## innerHTML(HTML5规范添加的)

* DOM提供的方法就像是手术刀一样精准，每个节点包括他的属性节点文本节点子元素节点，然而innerHtml就像是大锤一样鲁莽
* innerHTML是一股脑读取或者替换修改元素(内部)的所有内容。
* outerHTML是一股脑的读取或者替换(元素自身及其元素内部)的内容
* 是html的特有属性
* innerHTML = 'Text' 是把原来的东西替换成'text'; innerHTMl += "text" 是在原来的基础上加上'text'
* innerText 文本操作
* 不是所有的DOM元素都完美支持innerHtml的使用，比如插入script和style标签，使用时就会有很多禁忌。然而html，head，table等标签不支持使用innerHTML属性。

* 使用innerHTML属性删除带有事件处理程序和js对象的DOM后，事件处理程序和js对象与DOM的引用，并没有断，会造成内存泄漏。、
* 因此使用innerHTML，outerHTML和insertAdjacentHTML()方法时，最好手动删除事件处理程序和js对象的引用。
* 使用innerHTML也会需要性能，尽量集中使用innerHTMl
* ？？？ 以前的方法会吗？parent.removeChild()

## 动态创建标记

* 在使用DOM来修改DOM节点树的话，源代码不会发生任何的变化(源代码不变化，但是控制台会变化)，发生变化的是DOM节点树。
* 浏览器实际显示的是DOM节点树，而不是物理的文档(代码)。
* 使用document.createElement()创建元素节点之后不会立马在页面显示，因为它虽然被创建但是并没有进入到DOM树上，只是游离在js世界的孤儿。

### 增加

* document.createElement()创建元素节点
* document.createTextNode()创建文本节点
* document.createComment()创建注释节点

插入：

* parent.appendChild()  用于向childNodes的列表末尾添加一个节点。和手写代码的不一样，手写的后面会带有一个text节点，要是插入的话就不会有text节点。如果插入的节点本身就是childNodes列表中的一部分，那么就会把那个节点抽离出来放到childNodes列表的后面，因为一个节点不可能被同时挂在节点树上两次。
* parent.insertBefore(a,b)把a标签插入到b标签前面，要是b赋值为null的话，就和appendChild()一样的操作
* DOM没有提供insertAfter函数(),需要我们自己来编写

```javascript
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
```

### 删除

* parent.removeChild()  被剪切出来有返回值
* child.remove() 自己销毁了没有返回值

### 替换

* parentNode.replaceChild(new,origin) 返回值是被替换出去的那个节点

## 其他方法

### cloneNode()

* 创建调用这个方法的节点的副本
* 可以传递一个布尔值的参数，如果传递的是true的话，执行深复制，复制节点以及整个节点树，如果传递的是false的话，只复制自身节点。不复制子节点。
* 使用该方法不会复制js属性(除了IE)，例如事件处理程序。

### normalize()

* 在某个节点上调用这个方法的时候。
* 处理文档树中的文本节点，会删除空的文本节点，合并多个文本节点。

## 动态的加载js文件和css文件

* js和css也可以通过DOM来动态的添加
* IE在这方面有很多幺蛾子

## 处理表格

* 想要使用DOM来创建表格的话，需要很多的代码。
* 为了方便操作，提供了很多专门用来创建表格的快捷方法。
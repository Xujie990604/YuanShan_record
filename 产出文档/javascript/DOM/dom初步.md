# DOM 文档对象模型

## 节点

* 一份文档就是一份节点树。
* 元素节点里面可能会包含文本节点和属性节点

## IE

* IE中的所有DOM对象都是以COM对象的形式实现的，这意味着和js将会有很大的出入。

## node

* DOM1级定义了一个Node接口，(除了IE)所有浏览器的DOM的所有节点类型都要实现该接口。在js中这个接口是作为Node类型类实现的。

## 获取元素的方法

### document.getElementById(id)

* 获取独一无二的元素(获取的是一个对象，把这个对象存储到一个变量中，就可以操作这个对象的各种属性，和方法)

### document.getElementsByTagName()

* 获取一个对象数组(类数组)，数组里面存储着所有符合类型的DOM对象。即使只有一个DOM也会返回一个数组。
* 返回的这个数组里面的数据是根据DOM树动态获取的。不是静态的。
* 参数可以使用"*"，通配符选择器，表示获取文档中所有的DOM节点。
* 可以是某个DOM对象的方法
* 支持item()方法按照索引查找，和namedItem("xujie")方法按照html的name属性进行查找。

### document.getElementsByClassName()

* 返回值同样是一个对象数组(类数组)。
* 参数可以填写"*"通配符来选择所有的元素。
* 参数可以有多个类名，使用空格来隔开，该方法会选择所有包含了这些类名的DOM。顺序无所谓。
* 是HTML5中制定的
* 可以是某个DOM对象的方法

### 按照css的选择方式进行选择的方法

* querySelector可以直接按照css选择器类型进行选择。并且选择出来的是第一个。
* querySelectorAll选择出来的是一组但是不用
* 返回值是一个NodeList对象，不过底层实现是一组元素的快照，而非不断的对文档进行搜索的动态查询，这样的实现避免因为NodeList的性能问题。
* document和Element都可以调用这两个方法

## 节点对象身上的方法

### 设置和获取节点的属性(一级DOM方法，兼容性好)

* getAttribute("title") 用来设置DOM节点的属性。
* setAttribute("title","xujie") 可以用来更改或者添加属性节点的值(可以设置文档中任何一个元素的任何属性)
* 这两个方法不属于Document对象，只能通过元素节点来调用。
* 任何元素的所有特性，都可以通过DOM元素本身的属性来访问，自定义的特性不可以。
* 特性也被看成节点，也有创建的方法，但是一般不用，特性不被认为是DOM文档树的一部分。
* 也可以用来操作自定义的特性，特性的名称不区别大小写，但是根据HTML5规范，自定义的特性要加上data-前缀
* 由于两类特殊的特性(style和事件处理函数)，导致开发人员经常不使用getAttribute，只在访问自定义特性时，使用。
* 值得关注的是，使用setAttribute修改属性时，查看网页的源代码，做出的修改并没有反映在源代码中。这来源于DOM的工作模式，先加载静态的内容，在动态刷新，动态的刷新不会影响文档的静态内容，这正是DOM的威力所在，对页面的内容惊醒刷新却不需要在浏览器中刷新。
* removeAttribute()用来彻底删除元素的特性。

## 节点树

* parentNode   父节点
* childNodes    子节点们
* firstChild 第一个子节点
* lastChild  最后一个子节点  
* nextSibling  下一个兄弟节点
* previousSibling 前一个兄弟节点
* 元素节点的父元素一定是元素节点，属性节点和文本节点的子元素不允许是元素节点。

* Node.hasChildNodes()节点是否拥有子节点

### childNodes属性

* 用来获取一个元素的所有子元素(不仅仅是元素节点)。
* 返回结果是一个NodeList对象.是一种类数组对象。
* 并不是Array的实例，因为这个NodeList对象是基于DOM结构动态执行查询的结果，是有生命的呼吸的对象。
* item()方法，是DOM的方法，用于返回节点列表中的指定索引的节点。但是通常还是使用[]来访问这个节点列表，因为这样看起来更像是一个数组。
* 使用Array.prototype.slice()可以把arguments对象转化为数组，也可以把NodeList对象转换为数组。
* firstChild，lastChild，nextSibling，previousSibling都是在childNodes的NodeList对象中进行遍历的。最后一个节点的下一个节点为null，因为NodeList对象里面存储的是对象。

### 节点的四个属性

1. nodeName

* 元素的标签名，大写形式表示，只读。

1. nodeValue(用于更改元素的文本，可读可写)

* 想要获取一个元素的文本，不能直接使用nodeValue，而是要使用ele.firstChild.nodeValue;
* 因为元素内的文本也是一个节点(文本节点)。获取的是元素节点的子节点的nodeValue

1. nodeType
    该节点的类型，只读
        节点的类型
            元素节点    1
            属性节点    2
            文本节点    3

2. attributes   Element节点的属性(自身的属性例如class和id)集合，根据DOM树动态检索的集合。

### 基于元素节点树的遍历(除了children除外，全部在ie9及以下不兼容)

* parentElement 返回当前元素的父元素节点
* children 只返回当前元素的子节点
* node.childElementCount === node.children.length 当前元素节点的子节点个数
* firstElementChild  返回的是第一个元素节点
* lastElementChild 返回的是最后一个元素节点
* nextElementSibling 返回下一个兄弟元素节点
* previousElementSibling 返回前一个兄弟元素节点

## document对象

* document继承自HTMLDocument继承自Document。表示整个HTML页面
* document对象是window对象的一个属性，当window.onload事件触发时，document对象已经存在了。
* document代表的是整个文档。比html(文档元素)标签的范围要大。

## 使用NodeList

* NodeList元素的子节点数组，NameNodeMap元素的特性节点数组，HTMLCollection DOM节点对象数组
* 这三个的特点都是实时的，他们始终保持着最新最准确的信息.
* 每个访问他们，都会运行一次基于文档的查询。所以尽量减少对于NodeList的访问。
* 想要使用NodeList中的一个具体的值时，可以用变量把它保留起来。
* 都是类数组。

## byId取出来的是一个对象。少用id会被改变，多用class

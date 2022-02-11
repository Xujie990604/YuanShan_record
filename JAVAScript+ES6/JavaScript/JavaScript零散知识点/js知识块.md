# 其他的知识块

## Global对象

* 不属于任何的对象的属性和方法，最终都是它的属性和方法
* 没有办法直接访问Global对象，但是浏览器都是将Global对象当做window对象的一部分加以实现。

## URi解码方法

* encodeURI()主要应用于整个URI，只会把空格替换成编码。对应的解码方法为decodeURI()
* encodeURIComponent()只要应用于某一段，会把所有非标准字符进行编码(冒号，正斜杠...)，对应的解码方法为decodeURIComponent()

## eval()方法

* eval()方法会把字符串当做真正的代码来进行执行
* 在eval()中创建的任何变量和函数都不会被提升，因为他们被包含在一个字符串中只有在解析代码的时候才会识别内容。
* 很强大，很危险。尤其是在指定用户输入的数据情况下，会导致恶意用户输入(代码注入)

## 逗号运算符

* (a,b)会看一眼a，然后返回b

## 命名空间

* 为了解决命名冲突的问题，已经弃用。

## 区别数组和对象的三种方法

1. 用constructor          []的原型里构造函数是Array
                          {}的原型里的构造函数是Object
2. 用instanceof           [] instanceof Array true
                           {} instanceof Array false
3. 用Object.prototype.toString.call([])    [object Array]
   用Object.prototype.toString.call({})   [object Object]

## jq如何实现链式调用

* 方法的最后return this。

## for in 循环 专门用来遍历对象

```javascript
for(var prop in obj) {
    ...
}

```

* prop是变量存储着属性名，对象的.操作符没办法访问变量，但是([])运算符可以访问变量。所以通常配合obj[prop]的形式来访问对象的值
* 数组的下标不一定非得是数字，也可以是自己定义的字符串，因为数组本身也就是对象。键值对形式的数据集合。var a = []; a["xujie"] = 123;
* 也可以使用for in循环来访问数组，和访问对象一样，变量prop是属性名(在数组中也就是下标)不是属性值。
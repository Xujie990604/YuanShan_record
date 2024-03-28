# javascript零散知识点

* Number.toFixed(number) 四舍五入的截取number位小数
* Math.abs(取数字绝对值)
* DOM.style.width 和 dom.clientWidth 有什么区别
  
1. DOM.style.width只能获取到内联样式的值，所以通常添加css属性值用这个(得到的都是string类型数据)
2. dom.clientWidth能够读取到css值(只读，不可修改)，所以通常用来获取css属性值(得到的都是number类型的数据)

* DOM.classList 属性

1. classList 属性返回元素的类名，作为 DOMTokenList 对象。
2. 该属性用于在元素中添加，移除及切换 CSS 类。
3. classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。
  
* 清空数组的三种方法。
    1. arr.length = 0;
    2. arr.splice(0);
    3. arr = [];

* splice(0)的妙用，清空数组
* 页面刷新时自动聚焦到输入框  inputEl.focus();

## 对象的遍历

1. for...in方法
2. Object.keys(obj),把对象里面的所有key值，组成一个数组
3. Object.values(obj),把对象里面的所有value值，组成一个数组
4. 使用Object.getOwnPropertyNames(obj)，包含不可枚举的属性

* window.location.reload();强制进行页面刷新

* 页面刷新时自动聚焦到输入框 text.focus();

* 对象的key值正常情况下可以加引号也可以不加引号。但是当对象的key值命名不符合规则时(123name, test-name)这两个都不符合规则，需要用引号括起来，并且在调用时需要使用 obj['test-name']方括号语法来调用

* 对象的key值如果使用[]方括号括起来的话， 会将[]内的内容当做变量来解析

* 浏览器URL中使用斜杠 /   window系统的文件目录下使用反斜杠 \

* 为啥检测变量是否为空时，不能直接使用强等于号： xxx === undefined 而是非要使用 typeof： typeof(xxx) === "undefined" (答：在变量没有声明的情况下，如果直接使用 xxx === undefined 会报错， 但是typeof(xxx) === 'undefined' 就不会报错)

* var 过的属性是不可配置的属性。无法 delete 掉。delete只能删除可配置的属性(对象的属性)。

* 在全局作用域中使用 let const 声明的变量不会绑定到 window 对象中，而是会被绑定到 script 作用域上。script和 window 是平级别的。

* window.onload 事件是在页面加载的时候调用。

* 不能在控制台中直接使用{}来表示空对象，控制台会把{}认为是块。而不是对象。需要({})这种形式让控制台强制认为{}是一个空对象。

* 逗号运算符 (a,b)先运算前面的表达式，然后运算后面的表达式。最后输出后面的表达式

```js
// 一种类型检查的方式
// 如果传入的参数的 show 属性是一个 Function 的话，才会执行下面的语句
var renderMap = function( map ){
  if ( map.show instanceof Function ){
    map.show();
  }
};
```

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

## jq如何实现链式调用

* 方法的最后return this
* 前提是变量和方法属于同一个对象

```js
  function Person() {
    this.name = 'xujie'
    this.height = 18
  }
  Person.prototype.say = function() {
    console.log('我的名字是' + this.name)
    return this
  }
  Person.prototype.jump = function() {
    console.log('我的身高是' + this.name)
    return this
  }
  const person = new Person()
  // 实现链式调用
  person.say().jump()
```

## for in 循环 专门用来遍历对象

```javascript
for(var prop in obj) {
    ...
}

```

* prop是变量存储着属性名，对象的.操作符没办法访问变量，但是([])运算符可以访问变量。所以通常配合obj[prop]的形式来访问对象的值
* 数组的下标不一定非得是数字，也可以是自己定义的字符串，因为数组本身也就是对象。键值对形式的数据集合。var a = []; a["xujie"] = 123;
* 也可以使用for in循环来访问数组，和访问对象一样，变量prop是属性名(在数组中也就是下标)不是属性值。

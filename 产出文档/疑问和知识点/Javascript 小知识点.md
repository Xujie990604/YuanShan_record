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

* let x = arr[Math.floor(Math.random() * arr.length)]; 随机获取数组中的一个单词
  
* 清空数组的三种方法。
    1. arr.length = 0;
    2. arr.splice(0);
    3. arr = [];

* splice(0)的妙用，清空数组
* 页面刷新时自动聚焦到输入框  inputEl.focus();

* JSON.stringify() 把 JavaScript 对象(数组或者对象)转换为字符串。
* JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。

* toFixed(number)计算结果保留number位的小数。

* Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组

* 使用Array.prototype.slice.call(argument,0)可以把arguments对象转化为数组，也可以把NodeList对象转换为数组。

* 对象的遍历

1. for...in方法
2. Object.keys(obj),把对象里面的所有key值，组成一个数组
3. Object.values(obj),把对象里面的所有value值，组成一个数组
4. 使用Object.getOwnPropertyNames(obj)，包含不可枚举的属性
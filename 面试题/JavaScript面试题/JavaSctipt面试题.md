<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-09-06 20:57:39
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\面试题\JavaScript面试题\JavaSctipt面试题.md
 * @Description: 
-->
# 面试题

## 区别数组和对象的五种方法

1. 用constructor          []的原型里构造函数是Array
                          {}的原型里的构造函数是Object

2. 用instanceof           [] instanceof Array true
                         {} instanceof Array false
(使用了原型链有关的方法，instanceof的含义是: 实例的原型链中是否出现过该构造函数)

3. Array.prototype.isPrototypeOf(arr) // true
   Array.prototype.isPrototypeOf(obj) // false
(实例的原型链中是否出现过该原型)

4. 用Object.prototype.toString.call([])    [object Array]
   用Object.prototype.toString.call({})   [object Object]
   目前这个方法还不是特别懂。大概是Object.prototype.toString()方法能够输出各种类型，但是Object下面的String() Array()等构造函数把String()方法给重写了。所以不得已使用call()方法来改变this的指向。使得执行时函数体是Object()的函数体，但是this的指向变成了我们要区别类型的变量(数组或者是对象)

5. 使用 Array.isArray([]) Array.isArray({}) 来判断数据类型是否为数组

## 将类数组转化为数组

1. 使用Array.prototype.slice.call(arguments)。 slice()方法如果不传参数的话，会返回原数组的拷贝
2. Array.from(arguments)  是ES6中提供的方法，只要有length属性的对象都可以使用这个方法来转换为数组

## 逆转字符串(不使用循环)

```js
// 字符串的逆转，就先把字符串转化为数组。
 function reverseStr(str) {
   return str.split("").reverse().join("")
 }
```

## 数组判空

* arr.length === 0

## 对象判空

* Object.keys(obj).length === 0

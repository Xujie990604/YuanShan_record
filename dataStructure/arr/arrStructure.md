<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-10-17 20:21:48
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\arrStructure.md
 * @Description: 
-->
# 数组的数据结构讲解

## 创建和初始化数组

```js
let myArr = []
let myArr1 = [1, 2, 3]
```

## 访问数组

```js
// 通过 [] 语法来访问数组(数组数据结构的一个重要特征)(因为数组中元素在内存中的存储位置是相邻的)
// myArr1.length 代表数组中元素的个数
let result = myArr[myArr1.length - 1]
```

## 在数组的末尾添加元素

* 在 JavaScript 中数组是一个可以修改的对象，如果添加元素，就会动态增长
* 在 Java 和 C 中，数组在声明之后长度就固定了，可以修改元素，但是想要添加元素的话就需要重新创建一个新的数组
  
```js
// 1. 根据 javaScript 的语言特性，直接添加元素
myArr[myArr.length] = 4
// 2. 使用 push 方法
myArr.push(4)
```

## 在数组的开头插入元素

```js
// 1. 循环的移动 n 个元素，将新元素放到第一位(数组的数据结构特点决定了在数组的末尾操作的时间复杂度为O(1),在数组的开头操作的时间复杂度为O(n))
Array.prototype.insertFirstPosition = function(value) {
  for(let i = this.length; i > 0; i--) {
    this[i] = this[i - 1]
  }
  this[0] = value
}
// 2. 使用 unshift 方法
myArr.unshift(4)
```

## 从数组的末尾删除元素

```JS
// 使用 pop 方法
myArr.pop()
```

## 从数组的开头删除

```js
// 1. 从头开始，依次被后面的值覆盖，最后去掉数组中的 undefined
Array.prototype.removeFirstPosition = function() {
  // 这段循环执行完之后，数组的长度并没有变短。只是一个个向前覆盖，最后一个位置变成了 undefined 而已
  for(let i = 0; i < this.length; i++) {
    this[i] = this[i + 1]
  }
  // 通过另一个自定义的方法来去掉数组中的 undefined ,达到缩减数组长度的目的
  return this.reIndex(this)
}
// 创建一个新的数组，将原数组中 undefined 的值去掉
Array.prototype.reIndex = function(arr) {
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] !== undefined) {
      newArr[i] = arr[i]
    }
  }
  return newArr;
}

// 2. 使用 shift 方法
myArr.shift()
```

## 在任意位置删除和添加元素

```js
// 使用 splice 方法
myArr.splice()
```

## 二维数组

```js
let averageTemp = []
averageTemp[0] = [21, 43, 53, 78, 434, 789]
averageTemp[1] = [564, 43, 343, 753, 44, 3459]

// 表格化输出二维数组，输出更加美观
console.table(averageTemp)
```

## 数组合并

```js
const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];
let numbers = negativeNumbers.concat(zero, positiveNumbers); // [-3, -2, -1, 0, 1, 2, 3]
```

## 元素排序

```js
// 使用 reverse 来逆转元素的顺序
numbers.reverse();

// 使用 sort 来进行元素的排序(可以使用函数当做参数来自定义排序的规则)
numbers.sort((a, b) => a - b);
```

## 元素搜索

```js
// indexOf 返回数组中与参数匹配的第一个元素的索引
// lastIndexOf 返回数组中与参数匹配的最后一个元素的索引
numbers.indexOf(10)
numbers.lastIndexOf(10)

// find 返回第一个符合回调函数条件的元素
// findIndex 返回第一个符合回调函数条件的元素的索引
// 注：参数从智能指定具体值，扩展成了可以满足某个条件
numbers.find(x => x.age > 18)
numbers.findIndex(x => x.age > 18)

// includes 返回值为 Boolean 判断数组中是否包含一个指定的值
numbers.includes(20)
```

## 将数组变成字符串

```js
// 使用 toString 将数组转化为字符串(默认使用 , 当做分隔符)
number.toString() //'1,2,3,4,5,6,7,8,9,10'

// 使用 join 将数组按照指定的分隔符转化为字符串
number.join("-") // '1-2-3-4-5-6-7-8-9-10'

```

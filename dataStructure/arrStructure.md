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
myArr.splice()
```

// 八， 二维数组

let averageTemp = []
averageTemp[0] = [21, 43, 53, 78, 434, 789]
averageTemp[1] = [564, 43, 343, 753, 44, 3459]

// 表格化输出二维数组，输出更加美观
console.table(averageTemp)
```

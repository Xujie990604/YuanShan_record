/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 21:59:06
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\arrStructure.js
 * @Description: 
 */
// 一，创建和初始化数组
let myArr = []
let myArr1 = [1, 2, 3]

// 二，访问数组
// 通过 [] 语法来访问数组(数组数据结构的一个重要特征)(因为数组中元素在内存中的存储位置是相邻的)
// myArr1.length 代表数组中元素的个数
let result = myArr[myArr1.length - 1]

// 三，在数组的末尾添加元素
// 在 JavaScript 中数组是一个可以修改的对象，如果添加元素，就会动态增长
// 在 Java 和 C 中，数组在声明之后长度就固定了，可以修改元素，但是想要添加元素的话就需要重新创建一个新的数组

// 1. 根据 javaScript 的语言特性，直接添加元素
myArr[myArr.length] = 4

// 2. 使用 push 方法
myArr.push(4)

// 四，在数组的开头插入元素

// 1. 循环的移动 n 个元素，将新元素放到第一位
Array.prototype.insertFirstPosition = function(value) {
  for(let i = this.length; i > 0; i--) {
    this[i] = this[i - 1]
  }
  this[0] = value
}

// 2. 使用 unshift 方法
myArr.unshift(4)

// 五，从数组的末尾删除元素

myArr.pop()

// 六，从数组的开头删除

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

// 七，在任意位置删除和添加元素

myArr.splice()

// 八， 二维数组

let averageTemp = []
averageTemp[0] = [21, 43, 53, 78, 434, 789]
averageTemp[1] = [564, 43, 343, 753, 44, 3459]

// 表格化输出二维数组，输出更加美观
console.table(averageTemp)
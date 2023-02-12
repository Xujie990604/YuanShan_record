<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-23 14:09:05
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\ES6\Iterator.md
 * @Description: 
-->
# Iterator(遍历器)

* Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环(for of遍历数据结构时，其实访问的就是数据结构的 Iterator)
* 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是"可遍历的"

```js
// 一个对象如果要具备可被 for...of 循环调用的 Iterator 接口，就必须在 Symbol.iterator 的属性上部署遍历器生成方法(原型链上的对象具有该方法也可)
// 遍历器属性是一个方法
// 执行这个方法会返回一个对象，对象里面包含 next 方法
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

## 介绍

* 一是为各种数据结构，提供一个统一的、简便的访问接口
* 二是使得数据结构的成员能够按某种次序排列
* 三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费

## Iterator接口

* 原生具备 Iterator 接口的数据结构如下(因为 object 没有 Iterator 接口所以 Object 不可以使用 for of 方法遍历)

1. Array
2. Map
3. Set
4. String
5. TypedArray
6. 函数的 arguments 对象
7. NodeList 对象

```js
// ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性
let arr = [1,2,3]
let iter = arr[Symbol.iterator]()
console.log(iter.next())  //{value: 1, done: false}
console.log(iter.next())  //{value: 2, done: false}
console.log(iter.next())  //{value: 3, done: false}
```

## 调用 Iterator 的场合

* 解构赋值时
* 使用 ... 扩展运算符时
* yield*
* 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口(例如: for…of Array.from() Map(), Set() Promise.all()Promise.race())

## 几种遍历方法的对比

### for循环

* 最原始的遍历方式，写起来比较麻烦

### foreach

* 无法使用 return break 来终止循环

### for in

* 如果是数组的话，只能得到下标值。并不是很实用
* 在遍历数组的过程中会访问到原型链上的数据
* 其实 for in 是为了遍历对象发明的，非常不适合遍历数组

### for of

* 有着同 for...in 一样的简洁语法，但是没有 for...in 那些缺点。
* 不同于 forEach 方法，它可以与 break, continue 和 return 配合使用
* 提供了遍历所有数据结构的统一操作接口

# Iterator(迭代器)

> 循环是迭代的基础，每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的

```js
for (let i = 1; i <= 10; ++i) {
  console.log(i);
}
```

## 一、介绍

1. 通用性：是为各种数据结构，提供一个统一的、简便的访问接口
2. 有序性：是使得数据结构的成员能够按某种次序排列
3. ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费

```js
// 一个对象如果要具备可被 for...of 循环调用的 Iterator 接口，就必须在 Symbol.iterator 的属性上部署遍历器生成方法(原型链上的对象具有该方法也可)
// 遍历器属性是一个方法
// 执行这个方法会返回一个对象，对象里面包含 next 方法
const obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true,
        };
      },
    };
  },
};
```

## 二、Iterator 接口

- 原生具备 Iterator 接口的数据结构如下(`!没有 Object`)

1. Array
2. Map
3. Set
4. String
5. TypedArray
6. 函数的 arguments 对象
7. NodeList 对象

```js
// ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性
// 可迭代对象
let arr = [1, 2, 3];
// 迭代器工厂函数
let iter = arr[Symbol.iterator];
// 迭代器
let iter = arr[Symbol.iterator]();
// 执行迭代
iter.next(); //{value: 1, done: false}
iter.next(); //{value: 2, done: false}
iter.next(); //{value: 3, done: false}
```

## 三、调用 Iterator 的场合

1. 解构赋值
2. 使用 ... 扩展运算符
3. `yield*`
4. 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口(例如: `for...of` `Array.from()` `Map()` `Set()` `Promise.all()` `Promise.race()`)

## 四、几种遍历方法的对比

TODO：总结几种遍历方式的异同点，以及 forEach 不能使用 break 的解决方案
TODO： for-of 解决了 for-in 的哪些缺点？原型？顺序？

### 4.1 for 循环

- 最原始的遍历方式，写起来比较麻烦(1. 需要单独记录索引 2. 需要使用特定语法([] 或 get())读值)
- 迭代中止: 可以使用 continue break 来终止循环

```js
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i <= arr.length; i++) {
  if (arr[i] == 4) {
    break;
  } else {
    console.log(arr[i]); // 1 2 3
  }
}
```

### 4.2 forEach

- 与 for 对比，略有改善(1.不需要单独记录索引 2. 不需要使用特定语法([] 或 get())读值)
- 通用性受限：只能用于数组的数据类型
- 迭代中止受限：无法使用 continue break 来终止循环

```js
const arr = [1, 2, 3, 4, 5];
arr.forEach((item, index) => {
  console.log(item); // 1 2 3 4 5
});
```

### 4.3 for in

- 如果是数组和字符串的话，只能得到下标值，并不实用。只适合遍历对象
- 在遍历数组的过程中会访问到原型链上的数据
- 无序性: 对象的 key 是无序的，所以 for...in 遍历对象时并不能保证输出的顺序
- 迭代中止： 可以使用 break continue 来中止循环

```js
// 输出原型上的数据
// 遍历数组时，得到的是下标值
const arr = ["a", "b", "c", "d"];
arr.__proto__.sss = "sss";
for (const key in arr) {
  console.log(key); // 0 1 2 3 sss
}

// 遍历对象时，为了避免原型上数据的干扰，一般都搭配 hasOwnProperty 使用
const obj = {
  name: "foo",
  age: 18,
  sex: 0,
};
obj.__proto__.sss = "sss";

for (const key in obj) {
  if (Object.hasOwnProperty.call(obj, key)) {
    console.log(key); // name age sex
  }
}
```

### 4.4 for of

- 通用性: 任何实现了 Iterator 的数据结构都能使用此方法进行遍历
- 语法简洁: 1.不需要单独记录索引 2. 不需要使用特定语法([] 或 get())读值
- 迭代中止: 可以使用 break continue 来中止循环
- 有序性: 迭代元素的顺序是确定的
- 不会像 for...in 一样，访问原型上的数据

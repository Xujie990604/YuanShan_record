# Set

- 类似于数组，但是成员都是唯一的，没有重复的值。Set 内部判断两个基本数据类型值是否相同使用的算法类似于 === 符号(特例就是 Set 认为 NaN === NaN)。判断引用类型数据是否相等的依据是看数据的内存地址
- 使用 add 向 Set 中加入值的时候，不会发生类型转换。5 和 "5"是不一样的

```js
// Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 数组去重！！！这是目前知道的一个比较实用的用法
[...new Set(arr)]
// Array.from()可以将 Set 结构转换为数组
// 这也是数组去重的一种方式
Array.from(new Set(arr))
// 字符串去重
[...new Set(str)].join("")
```

## Set 的属性和方法

- Set.prototype.constructor: 构造函数，默认就是 Set 函数。
- Set.prototype.size: 返回 Set 实例的成员总数。
- Set.prototype.add(value): 添加某个值，返回 Set 结构本身。支持链式调用
- Set.prototype.delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value): 返回一个布尔值，表示该值是否为 Set 的成员。
- Set.prototype.clear(): 清除所有成员，没有返回值。

## 遍历

- Set 的遍历顺序就是插入顺序
- Set 结构没有键名只有键值，或者说键名和键值是同一个东西

- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员

```js
// set 默认的遍历器函数是 values 方法
Set.prototype[Symbol.iterator] === Set.prototype.values;
// 可以省略 values() 方法，直接使用for of 遍历 Set
for (let key of set) {
  console.log(key);
}
// ... 内部使用的也是 for of。可以直接对 Set 进行 ... 运算
// 通过 [] 和 ... 将 Set 结果转化为数组
console.log([...set]);
```

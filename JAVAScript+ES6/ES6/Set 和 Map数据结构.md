<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\ES6\Set 和 Map数据结构.md
 * @Description: Set和Map两种全新的数据结构
-->
# Set 和 Map

## Set

* 类似于数组，但是成员都是唯一的，没有重复的值。
* 使用add向Set中加入值的时候，不会发生类型转换。5 和 "5"是不一样的

```js
//Set本身是一个构造函数，用来生成Set数据类型
const s = new Set();
  [1,2,2,3,4,5,5].forEach(item => {
    //   使用add方法给Set加入成员
    s.add(item)
  })

// Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 数组去重！！！这是目前知道的一个比较实用的用法
[...new Set(arr)]
// Array.from()可以将Set结构转换为数组
// 这也是数组去重的一种方式
Array.from(new Set(arr))
// 字符串去重
[...new Set(str)].join("")
```

### Set的属性和方法

* Set.prototype.constructor：构造函数，默认就是Set函数。
* Set.prototype.size：返回Set实例的成员总数。
* Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
* Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
* Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
* Set.prototype.clear()：清除所有成员，没有返回值。

### 遍历

* Set的遍历顺序就是插入顺序
* Set结构没有键名只有键值，或者说键名和键值是同一个东西

* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器
* Set.prototype.forEach()：使用回调函数遍历每个成员

## Map

* JavaScript的对象本质上是键值对的集合，但是传统上只能把字符串当做key值。
* Map类似于对象，也是键值对的集合，但是键的范围不限制于字符串，各种类型的值(包括对象)都可以当做键。
* 作为一个构造函数，Map也可以接受一个数组当做参数，该数组的成员也是一个个表示键值对的数组

### 属性和方法

* size属性，map成员个数
* set方法：为Set添加键值对
* get方法： 读取数据
* has方法： 是否存在某个键值
* delete方法： 删除某个键
* clear方法: 清除所有成员

### 遍历方法

* Map.prototype.keys()：返回键名的遍历器。
* Map.prototype.values()：返回键值的遍历器。
* Map.prototype.entries()：返回所有成员的遍历器。
* Map.prototype.forEach()：遍历 Map 的所有成员。

### 与其他数据结构转化

* 使用扩展运算符将Map转化为数组
* 把数组传入Map构造函数，就可以转化为Map

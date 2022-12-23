<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\ES6\Set 和 Map数据结构.md
 * @Description: Set和Map两种全新的数据结构
-->
# Set 和 Map

## Set

* 类似于数组，但是成员都是唯一的，没有重复的值。Set 内部判断两个基本数据类型值是否相同使用的算法类似于 === 符号(特例就是 Set 认为 NaN === NaN)。判断引用类型数据是否相等的依据是看数据的内存地址
* 使用 add 向 Set 中加入值的时候，不会发生类型转换。5 和 "5"是不一样的

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

### Set的属性和方法

* Set.prototype.constructor: 构造函数，默认就是Set函数。
* Set.prototype.size: 返回Set实例的成员总数。
* Set.prototype.add(value): 添加某个值，返回 Set 结构本身。支持链式调用
* Set.prototype.delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。
* Set.prototype.has(value): 返回一个布尔值，表示该值是否为Set的成员。
* Set.prototype.clear(): 清除所有成员，没有返回值。

### 遍历

* Set的遍历顺序就是插入顺序
* Set结构没有键名只有键值，或者说键名和键值是同一个东西

* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器
* Set.prototype.forEach()：使用回调函数遍历每个成员

```js
// set 默认的遍历器函数是 values 方法
Set.prototype[Symbol.iterator] === Set.prototype.values
// 可以省略 values() 方法，直接使用for of 遍历 Set
for(let key of set) {
  console.log(key)
}
// ... 内部使用的也是 for of。可以直接对 Set 进行 ... 运算
console.log([...set])
```

## Map

* JavaScript 的对象本质上是键值对的集合，但是传统上只能把字符串当做 key 值。
* Map 类似于对象，也是键值对的集合，但是键的范围不限制于字符串，各种类型的值(包括对象)都可以当做键。
* 作为一个构造函数，Map 也可以接受一个数组当做参数，该数组的成员也是一个个表示键值对的数组

```JS
// 不仅仅是数组,任何具有 Iterator 接口,且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
```

### 属性和方法

#### size属性

* map.size
* map成员个数

#### set

* 为 map 添加键值对, 如果对同一个键复制两次，后面的值会覆盖前面的值
* 当键为引用类型时，判断键是否相等的依据是内存地址是否相等
* 当键为基本数据类型时，判断键是否相等的依据是是否严格等于(NaN 是个例外，虽然 NaN 不等于自身但是将 NaN 视为同一个键)

```js
// 返回值为整个 map 
map.set(key, value) 

// 因为返回值为 map,所以可以实现链式调用
map.set(NaN, 'xxxx').set(1, {name: 'xujie'})
```

#### get

* 读取数据
* map.get(key)

#### has方法

* map.has(key) 返回值为 Boolean
* 是否存在某个键值
  
#### delete方法

* map.delete(key) 返回值为Boolean
* 删除某个键

#### clear方法

* map.clear()
* 清除所有成员

### 遍历方法

* Map.prototype.keys()：返回键名的遍历器。
* Map.prototype.values()：返回键值的遍历器。
* Map.prototype.entries()：返回所有成员的遍历器。
* Map.prototype.forEach(value, key, map)：遍历 Map 的所有成员。

```js
// map 本身是没有 filter 功能的，但是可以借用特性来实现 filter
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
// 遍历 map 生成数组(这个数组可以当做 new Map()中的参数)
const mapArray = [...map.entries()]
// 将过滤后的数组当做参数放进 Map 构造函数中
const newMap = new Map(mapArray.filter(([key, value]) => key > 1 ))
```

### 与其他数据结构转化

#### map转换成数组

* 使用扩展运算符将 Map 转化为数组

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
// 
// map[Symbol.iterator] === map.entries
// 访问了map结构的默认遍历接口，本质执行代码是[...map.entries()]
const array = [...map]
```

#### 数组转化成map

* 把数组传入 Map 构造函数，就可以转化为 Map

```js
// 利用了 map 构造函数的参数可以是数组的特性
new Map([[true, 7],[{foo: 3}, ['abc']]])
```

#### 对象转成map

```js
const obj = {
  name: 'xujie',
  age: 19
}
// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
let map = new Map(Object.entries(obj))
```

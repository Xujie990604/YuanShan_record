# Map

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

## 属性和方法

### size属性

* map.size
* map成员个数

### set

* 为 map 添加键值对, 如果对同一个键赋值两次，后面的值会覆盖前面的值
* 当键为引用类型时，判断键是否相等的依据是内存地址是否相等
* 当键为基本数据类型时，判断键是否相等的依据是是否严格等于(NaN 是个例外，虽然 NaN 不等于自身但是将 NaN 视为同一个键)

```js
// 返回值为整个 map 
map.set(key, value) 

// 因为返回值为 map,所以可以实现链式调用
map.set(NaN, 'xxxx').set(1, {name: 'xujie'})
```

### get

* 读取数据
* map.get(key)

### has方法

* map.has(key) 返回值为 Boolean
* 是否存在某个键值
  
### delete方法

* map.delete(key) 返回值为Boolean
* 删除某个键

### clear方法

* map.clear()
* 清除所有成员

## 遍历方法

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

## 与其他数据结构转化

### map转换成数组

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

### 数组转化成map

* 把数组传入 Map 构造函数，就可以转化为 Map

```js
// 利用了 map 构造函数的参数可以是数组的特性
new Map([[true, 7],[{foo: 3}, ['abc']]])
```

### 对象转成map

```js
const obj = {
  name: 'xujie',
  age: 19
}
// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
let map = new Map(Object.entries(obj))
```

## weakMap

* WeakMap 和 Map 类似，都是用于生成键值对
* WeakMap 对 key 是弱引用，不影响垃圾回收器的工作。据这个特性可知，一旦 key 被垃圾回收器回收，那么对应的键和值就访问不到了。所以 WeakMap 经常用于存储那些只有当 key 所引用的对象存在时(没有被回收)才有价值的信息

### 和Map的区别

* WeakMap 只接受对象作为键名(null除外)
* WeakMap的键名所指向的对象，不计入垃圾回收机制的引用数。(weakMap 结构有助于防止内存泄漏)

### 方法

* 只支持四个方法： set get delete has

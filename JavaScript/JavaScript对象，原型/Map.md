# Map

- JavaScript 的对象本质上是`键值对`的集合，但是传统上只能把`字符串`当做 key 值。
- Map 类似于对象，也是键值对的集合，但是`键的范围不限制于字符串`，各种类型的值(包括对象)都可以当做键。

```JS
// 任何具有 Iterator 接口, 且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map // Map(2) {'name' => '张三', 'title' => 'Author'}
```

## 一、属性和方法

### 1.1 size 属性

- 返回成员个数

```js
const map = new Map([
  ["name", "张三"],
  ["title", "Author"],
]);
map.size; // 2
```

### 1.2 set

- 当键为引用类型时，判断键是否相等的依据是内存地址是否相等
- 当键为基本数据类型时，判断键是否相等 使用了 SameValueZero 相等性比较算法

```js
// 因为 set 返回值为整个 map, 所以可以实现链式调用
map.set(key, value).set(key2, value2);

// SameValueZero 认为 NaN 和 NaN 相等， +0 和 -0 相等
const map = new Map();
const a = 0 / "", // NaN
  b = 0 / "", // NaN
  pz = +0,
  nz = -0;
a === b; // false
pz === nz; // true
map.set(a, "foo");
map.set(pz, "bar");
map.get(b); // foo
map.get(nz); // bar
```

### 1.3 get

- 读取数据

```js
const objKey = { name: "foo" };
const map = new Map([
  [objKey, "张三"],
  ["name", "李四"],
]);
map.get(objKey); // "张三"
map.get("name"); // "李四"
map.get({ name: "foo" }); // undefined
```

### 1.4 has 方法

- 是否存在某个键值
- 返回值: Boolean

```js
const objKey = { name: "foo" };
const map = new Map([
  [objKey, "张三"],
  ["name", "李四"],
]);
map.has(objKey); // true
map.has({ name: "foo" }); // false
```

### 1.5 delete 方法

- map.delete(key)
- 返回值: Boolean

```js
const objKey = { name: "foo" };
const map = new Map([
  [objKey, "张三"],
  ["name", "李四"],
]);
map.delete(objKey); // true
map.delete({ name: "foo" }); // false
```

### 1.6 clear 方法

- 清除所有成员

```js
const objKey = { name: "foo" };
const map = new Map([
  [objKey, "张三"],
  ["name", "李四"],
]);
map.clear();
map; // Map(0) {size: 0}
```

## 二、遍历方法

- 和 Object 的主要差异：Map 实例会维护键值对的插入顺序(Object 的属性是没有顺序的)

### 2.1 方法

- Map.prototype.keys()：返回键名的遍历器
- Map.prototype.values()：返回键值的遍历器
- Map.prototype.entries()：返回所有成员的遍历器
- Map.prototype.forEach()：遍历 Map 的所有成员

```js
// map 本身是没有 filter 功能的，但是可以先转成数组，再执行 filter 方法
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
// 1. 使用迭代器特性和 entries 特性来生成数组
const mapArray = [...map.entries()];
// 2. 使用 Map 参数可以为数组的特性
const newMap = new Map(mapArray.filter(([key, value]) => key > 1));
```

## 三、与其他数据结构转化

### 3.1 map 转换成数组

- 使用扩展运算符将 Map 转化为数组

```js
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
//
// map[Symbol.iterator] === map.entries
// 访问了map结构的默认遍历接口，本质执行代码是[...map.entries()]
const array = [...map];
```

### 3.2 数组转化成 map

- 把数组传入 Map 构造函数，就可以转化为 Map

```js
// 利用了 map 构造函数的参数可以是数组的特性
new Map([
  [true, 7],
  [{ foo: 3 }, ["abc"]],
]);
```

### 3.3 对象转成 map

```js
const obj = {
  name: "xujie",
  age: 19,
};
// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
let map = new Map(Object.entries(obj));
```

## 四、WeakMap

### 4.1 弱映射

- WeakMap 对 key 是弱引用，不影响垃圾回收器的工作, 如果一个引用类型值除了被 WeakMap 当做键之外没有其他的地方引用它，那这个引用类型值会被回收
- 所以 WeakMap 经常用于存储那些只有当 key 所引用的对象存在时(没有被回收)才有价值的信息

```js
// 手动消除对键的引用之后，键值对会消失
let objKey = {};
const weakMap = new WeakMap();
weakMap.set(objKey, { name: "foo" });
weakMap.get(objKey); // { name: "foo" }
objKey = null;
setTimeout(() => {
  weakMap; // WeakMap {}
}, 1000);
```

### 4.1 WeakMap 和 Map 的区别

- WeakMap 键名只能是 Object 或者继承自 Object 的类型
- WeakMap 的键名所指向的对象，不计入垃圾回收机制的引用数。(weakMap 结构有助于防止内存泄漏)

### 4.2 方法

- 只支持四个方法：set get delete has

## 五、如何选择 Object 和 Map

- 对于大多数 WEB 开发任务来说，这个选择只是个人偏好问题。但是对于在乎内存和性能的场景来说，对象和映射存在显著差别

### 5.1 内存占用

- 在给固定大小的内存中，Map 大约可以比 Object 多存储 50% 键值对

### 5.2 插入性能

- Map 性能稍好，如果涉及大量插入操作，推荐 Map

### 5.3 查找速度

- 差异极小， 少量查找操作时 Object 的性能也许更好

### 5.4 删除性能

- Map 性能稍好，如果涉及大量删除操作，推荐 Map

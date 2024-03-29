# Set

- 类似于数组，但是成员都是唯一的，没有重复的值。
- Set 使用了 SameValueZero 相等性比较算法

## 一、Set 的属性和方法

1. size: 返回 Set 实例的成员总数。
2. add(value): 添加某个值，返回 Set 结构本身。支持链式调用
3. delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。
4. has(value): 返回一个布尔值，表示该值是否为 Set 的成员。
5. clear(): 清除所有成员，没有返回值。

## 二、遍历

- Set 会维护值插入时的顺序，因此支持按顺序迭代。Set 的`键名等于键值`

1. keys()：返回键名的遍历器
2. values()：返回键值的遍历器
3. entries()：返回键值对的遍历器
4. forEach()：使用回调函数遍历每个成员

```js
// set 默认的遍历器函数是 values 方法
Set.prototype[Symbol.iterator] === Set.prototype.values;
// 可以省略 values() 方法，直接使用 for of 遍历 Set
for (let key of set) {
  console.log(key);
}
```

## 三、WeakSet

- WeakSet 集合中的值是弱引用，不影响垃圾回收器的工作，如果一个引用类型值除了被 WeakSet 当做值之外没有其他的地方引用它，那这个引用类型值会被回收

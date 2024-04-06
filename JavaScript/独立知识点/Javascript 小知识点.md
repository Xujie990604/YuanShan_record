# javaScript 零散知识点

## 清空数组的三种方法

1. arr.length = 0;
2. arr.splice(0);
3. arr = [];

- 不能在控制台中直接使用{}来表示空对象，控制台会把{}认为是块。而不是对象。需要({})这种形式让控制台强制认为{}是一个空对象。

```js
// 一种类型检查的方式
// 如果传入的参数的 show 属性是一个 Function 的话，才会执行下面的语句
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};
```

## jq 如何实现链式调用

- 方法的最后 return this
- 前提是变量和方法属于同一个对象

```js
function Person() {
  this.name = "xujie";
  this.height = 18;
}
Person.prototype.say = function () {
  console.log("我的名字是" + this.name);
  return this;
};
Person.prototype.jump = function () {
  console.log("我的身高是" + this.name);
  return this;
};
const person = new Person();
// 实现链式调用
person.say().jump();
```

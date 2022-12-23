# Symbol

* ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型

```js
// s 是一个独一无二的值，不需要使用 new 运算符生成
let s = Symbol()

// foo 和 bar 只是描述信息
// 和 Symbol 生成的值没有任何关系，即使参数填写的一样。生成的值也都是独一无二的
let s1 = Symbol('foo');
let s2 = Symbol('bar');
```

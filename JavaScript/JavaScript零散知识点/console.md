# console 函数

## console.log()

* 打印信息

## console.info()

* 打印信息

## console.warn()

* 打印警告

## console.error()

* 打印错误

## 占位符

1. %o — 对象
2. %s — 字符串
3. %d — 数字

```js
const name = 'xujie'
const info = {
  age: 19
}
// 主要是 %o 有用，使用模板字符串无法输出对象，会输出[object Object]
console.log("你好，%s.你的信息是%o", name, info)
```

## %c 带有样式的输出

```js
console.log("%c你好,你的信息", 'color: red; font-size: 30px;')
```

## console.count()

* 打印次数
* console.count('x') console.count('y') 这两个是独立的

## console.time()

* 输出程序的执行时间

```js
console.time('x')
console.timeEnd('x')
```

## console.track()

* 打印此时的函数调用栈

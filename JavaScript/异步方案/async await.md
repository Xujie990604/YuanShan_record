# async await

## async 的作用

- async 只是一个标识符，如果不搭配 await 使用的话，异步函数和普通函数没有什么区别
- 给一个函数加上 async 的话,函数的返回值就会变成 promise 的形式，如果在 async 函数中 return 一个变量的话，async 会直接通过 Promise.resolve() 封装成 Promise 对象。然后就可以使用 .then() 链来处理这个 Promise 实例。如果函数没有返回值的话，会返回 Promise.resolve(undefined)
- Promise 的特点，无等待。在没有 await 的情况下，async 函数会立刻执行，返回一个 Promise 对象，并且不会阻塞后面的语句。

```js
async function foo() {
  console.log(1);
  Promise.reject(3); //在 async 函数中，单独的 Promise.reject() 并不会被异步的处理程序捕获
  return Promise.reject(3); //在 async 函数中，return 一个 Promise.reject() 的话可以被异步的处理程序捕获
  await Promise.reject(3); //在 async 函数中，await 一个 Promise.reject() 可以被异步的处理程序捕获， 并且下面的语句不会再执行
}

foo().catch((err) => {
  console.log(err);
});
console.log(2);
```

### async 中的错误处理

- 如果 await 的 promise 的内容是一个错误的话 async 函数会`终止`，`不会向下执行`
- 如果使用了以上两种方式处理了错误的话， async 函数中的代码会继续向下执行

```js
async function async1() {
  //使用在后面直接跟上一个catch()的办法来捕获错误
  await Promise.reject("error").catch(() => {});
  console.log("async1");
  return Promise.resolve("async1 success");
}
async1().then((res) => console.log(res));
console.log("script start");
```

## await 的功能

### await 后面的语句为 Promise

- 理解为 await 后面的语句相当于放到了 `new Promise` 中， 下一行及之后的语句相当于放在了`Promise.then` 中
- await 只能在 async 的函数中使用, await 才是造成阻塞的实质。
- 如果后面是一个 promise，就会阻塞当前路径的代码，把后面的 `Promise 对象的 resolve 的值` (是一个值不是 Promise 实例)赋值给自己 await 表达式。
- JS 运行时在碰到 await 关键字时，会记录在哪里暂停执行，等到 await 右边的值可以用了，js 运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行

### await 后面的语句不是 Promise

- 如果 await 后面并不是一个 Promise 的话，会把 await 后面表达式的值直接赋值给 await。并不会有阻塞现象。
- await 的下一行以及之后的语句也不会被放到 then 回调函数中
- await 是个运算符，用于组成表达式，await 表达式的运算结果取决于 await 后面的东西。
- 如果后面的是一个表达式，那么 await 表达式就是后面的表达式

## async 和 await 的优势

- 单一的调用显示不出来优势，在多个 Promise 组成的 then 链时，优势就凸显出来了。
- 以前推出 Promise 的 then 链来优化多层回调的问题，现在又通过 async/await 来优化这个问题

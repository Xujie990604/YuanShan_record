# Promise

- Promise 对象是我们现在尚未得到的，但将来会得到的值的占位符。

## 三种状态

1. pending 待定
2. fulfilled 解决(有时候也会叫做 resolved)
3. rejected 拒绝

## Promise 的特点

1. 对象的状态不受外界的影响，只有异步结果可以决定当前是哪一种状态。任何其他的操作都无法改变。
2. promise 对象只会有两种可能，从 pending 到 resolved，从 pending 到 rejected，一旦状态改变就不会再变。任何时候都会得到这个结果。
3. 无法取消 promise，一旦创建就立即执行。如果不设置回调函数，promise 内部的错误不会反映到外部

## resolve 和 reject

```js
new Promise((resolve, reject) => {
  console.log("in promise");
  resolve(console.log("in resolve"));
  // 在 new Promise() 中的代码都是同步执行的(resolve()也是同步执行的)
  console.log("in promise");
}).then((res) => {
  // 只有 then() 函数是异步执行的
  console.log(res);
});
```

- resolve('res') reject('err') 函数是同步执行的，但是函数参数的 `抛出` 是异步的。
- Promise.then() 才是`微任务`的异步任务`注册函数`，then() 里面的`回调函数`是被放置到消息队列中的`消息`。
- 只有 Promise.resolve() 之后 Promise.then() 才会注册微任务
- 只有 Promise.rejected() 之后 Promise.catch() 才会注册微任务

### Promise.resolve()

- `new Promise ((resolve, reject) => { resolve()}) === Promise.resolve()`
- 会实例化一个 Promise() 并将状态转化为 resolved
- 可以包装任何非期约值，包括错误对象。并将其转化为已解决的期约

```js
new Promise((resolve, reject) => {
  resolve(new Error("xujie"));
}); //Promise <resolved> :Error:xujie
```

- 如果参数是一个期约的话， 那么外面的 Promise.resolve() 就相当于一个空包装
- 是一个幂等的方法

```js
let p = Promise.resolve(3); // Promise <fulfilled>
setTimeout(console.log, 0, p === Promise.resolve(p)); // true
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))); // true
```

### Promise.reject()

- 实例化一个 Promise() 拒绝的期约， 并抛出一个错误。(抛出的错误是异步的，无法使用同步的 try catch{} 块来捕获异步错误)
- Promise.reject() 没有实现和 Promise.resolve() 一样的幂等逻辑，如果一个期约被当做参数，那么这个被传入的期约就会变成参数。

```js
let p = Promise.resolve(3);
Promise.reject(p); // 这个 Promise.resolve(3) 会成为错误的理由，而不是 3
```

## 期约的实例方法

### Promise.prototype.then()

- 其实 then() 方法可以提供`两个回调函数`，第一个在上面的执行器 promise.resolve() 时执行回调，第二个在上面的执行器 promise.reject() 时执行回调
- p.then() 的返回值是一个 `新的 Promise 实例` (p 代指上面的执行器 Promise())，then 的返回值的值根据和 p 的执行状态的对应的 then 中的回调有关(也就是说如果 p resolve，那么 then 的返回值就和 then 中的第一个回调有关， 如果 p reject，那么 then 的返回值就和 then 中的第二个回调有关)。

1. 如果 then 中第一个回调函数被定义，且有返回值那么就把这个返回值通过 Promise.resolve() 包装，然后 then 的返回值就等于这个被包装过的值
2. 如果 then 中的第一个回调函数被定义，但是没有返回值，那么 then 的返回值就是 undefined 经过 Promise.resolve() 包装
3. 如果 then 的中的第一个回调函数没有被定义，那么 then 的返回值就是上面的 p 的解决之后的值。

```js
new Promise((resolve, reject) => {
  resolve("111");
})
  .then((res) => {
    console.log(res);
    return "aaa"; // 有返回值，所以这个 then 的返回值就是 'aaa' 经过resolve()函数包装
  })
  .then(null, (err) => {
    // then 中第一个回调函数没有定义。所以这个 then 的返回值就是上一个 then 的返回值
    console.log(err);
    throw "bbb";
  })
  .then((res) => {
    console.log(res); // aaa 得到的数据是 'aaa'
  });
```

### Promise.prototype.catch()

- 其实就是个语法糖，`p.catch(() => {}) === p.then(null, () => {})`
- catch 也有返回值，和上面介绍的行为一样。

#### 实例中返回错误

```js
let p = new Promise((resolve, reject) => {
  // 一般在 Promise 抛出错误的形式
  reject(new Error("err"));
  // 使用 throw 语句同样也可以使得 Promise 的状态改变为 reject
  throw Error("error"); // 使用 throw 语句同样也可以使得 Promise 的状态改变为 reject
});
```

### Promise.prototype.finally()

- 无论 p 的状态如何都会执行,所以 finally 不接受任何参数。finally 的返回值和状态无关，大多数情况下表现为父期约的传递。
- 主要是为了解决冗余代码

```js
// 这两种情况就是特殊情况
p.finally(() => new Promise(() => {})); // Promise `<pending>`
p.finally(() => Promise.reject()); // Promise `<reject>`: undefined
```

### 拒绝期约和拒绝错误处理

- 期约可以使用任何理由拒绝，但是最好使用一个 Error 对象，因为 Error 对象会包含一些用于调试的信息，
- 这些错误都是通过异步抛出且未处理的，`异步的错误只能通过异步的处理程序来捕获`

## 期约的连锁和期约合成

### 期约连锁

- 可以使用连缀方法的调用的形式
- 实现的原理主要是 then，catch，finally 处理程序的返回值都是一个 Promise。
- 链式调用后面的内容需要等前一个调用执行完才会执行。

### 期约合成

#### Promise.all([p, p])

- Promise.all() 静态方法会在一组期约全部解决之后再解决, 返回 `一个新期约`
- 有一个包含的期约待定，则合成的期约也待定。一个包含的期约拒绝，则合成的期约也拒绝(第一个拒绝的理由会成为合成期约的拒绝理由, 不等待其他 Promise 解决)
- 如果所有期约都成功解决，合成期约的值就是包含期约解决值的数组。并且`合成期约值的顺序和传入实例的顺序一致`。如果有期约抛出错误，则合成期约的返回值是这个被拒绝的期约。

```js
// 新期约的值是一个数组，["xujie", "xiaohan"]
let p = Promise.all([Promise.resolve("xujie"), Promise.resolve("xiaohan")]);
let a = Promise.all([1, 2]); // 原始值会被Promise.resolve()包装处理
let b = Promise.all([]); // 这条语句等价于Promise.resolve()
let d = Promise.all(); // 无效的语法
```

```js
Promise.all([
  new Promise(() => {
      ...
  }),
  new Promise(() => {
      ...
  })
]).then(results => {
  result[0] //里面是第一次执行的结果
  result[1] //里面是第二次执行的结果
})
```

#### Promise.race([p, p])

- 返回一个包装期约，是一组集合中最先解决或者拒绝的期约的镜像。

```js
let a = Promise.race([1, 2]); //原始值会被Promise.resolve()包装处理
let b = Promise.race([]); //这条语句等价于Promise.resolve()
let d = Promise.race(); //无效的语法
```

## 终止 Promise(终止不是中断，Promise 一旦被创建就没办法被中断)

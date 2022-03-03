# Promise

* Promise对象是对我们现在尚未得到的，但将来会得到的值的占位符。

## 三种状态

* pending 待定
* fulfilled 解决(有时候也会叫做 resolved)
* rejected 拒绝

## Promise的特点

* 对象的状态不受外界的影响，只有异步结果可以决定当前是哪一种状态。任何其他的操作都无法改变。
* 一旦状态改变就不会再变。任何时候都会得到这个结果。
* promise对象只会有两种可能，从pending到resolved，从pending到rejected

### Promise的缺点

* 无法取消promise，一旦创建就立即执行。如果不设置回调函数，promise内部的错误不会反映到外部

1. 在执行传入的回调函数时，会传入两个参数，resolve，reject这两个本身又是函数
2. 在回调函数中请求异步(只是请求，真正的异步代码的处理要去then中执行)

## resolve 和 reject

```js
new Promise((resolve, reject) => {
    console.log("in promise")
    resolve(console.log("in resolve"))
    console.log("in promise") //在new Promise中的代码都是同步执行的(resolve也是同步执行的)
})
.then(res => {
    console.log(res) //只有这个处理程序then拿取参数的过程是异步执行的
})
```

* 这两个回调函数(resolve reject)直接执行的话，是同步的函数，但是这两个回调函数里面的参数(包括成功的值和错误的理由)的**抛出**就是异步的过程了。

### Promise.resolve()

* ```new Promise ((resolve, reject) => { resolve()}) === Promise.resolve()```
* 会实例化一个Promise并将状态转化为resolved
* 可以包装任何非期约值，包括错误对象。并将其转化为以解决的期约

```js
new Promise((resolve, reject) => {
    resolve(new Error("xujie"))
}) //Promise <resolved> :Error:xujie
```

* 如果参数是一个期约的话， 那么外面的Promise.resolve()就相当于一个空包装
* 是一个幂等的方法

```js
let p = Promise.resolve(3) // Promise <fulfilled>
setTimeout(console.log, 0, p === Promise.resolve(p)) //true
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))) //true
```

### Promise.reject()

* 实例化一个Promise拒绝的期约， 并抛出一个错误。 (这个错误不能通过try catch捕获, 只能通过异步的处理程序catch或者then来捕获)(因为拒绝期约的错误并没有抛到同步代码的线程里面， 而是通过浏览器的异步消息队列来处理的)
* Promise.reject()没有实现和Promise.resolve()一样的幂等逻辑，如果一个期约被当做参数，那么这个被传入的期约就会变成参数。

```js
let p = Promise.resolve(3) 
Promise.reject(p) //这个Promise.resolve(3) 会成为错误的理由，而不是3
```

## 期约的实例方法

### Promise.prototype.then()

* 其实then方法可以提供两个回调函数，第一个在上面的执行器promise resolve时执行回调，第二个在上面的执行器promise reject时执行回调(重要)
* then期待的参数是函数， 任何非函数的参数都会被静默处理。

* p.then的返回值是一个**新的Promise实例**(p代指上面的执行器Promise)，then的返回值的值根据和p的执行状态的对应的then中的回调有关(也就是说如果p resolve，那么then的返回值就和then中的第一个回调有关， 如果p reject，那么then的返回值就和then中的第二个返回值有关)。

1. 如果then中第一个回调函数被定义，且有返回值那么就把这个返回值通过Promise.resolve()包装，然后then的返回值就等于这个被包装过的值
2. 如果then中的第一个回调函数被定义，但是没有返回值，那么then的返回值就是undefined经过Promise.resolve()包装
3. 如果then的中的第一个回调函数没有被定义， 那么then的返回值就是上面的p的解决之后的值。

#### 实例中返回错误

```js
let p = new Promise((resolve, reject) => {
     return new Error("err");
 }) //不会报错，p的值是pending: undefined   new Error("err")就像消失了一样

 let p = new Promise((resolve, reject) => {
     resolve(new Error('err'))
 }) //不会报错，p的值是resolve: Error: err 任何非Promise的值都会被包装为promise对象

 let p = new Promise((resolve, reject) => {
     throw(Error("error"))
     reject(new Error("err"))
 }) //会抛出异步的错误，p的值是reject: Error: err throw一个错误，就类似于reject的理由是一个错误对象(throw和reject谁的语句书写在前面，p的值就是谁的值)

 let p = new Promise((resolve, reject) => {
     resolve("success")
 })
 let a = p.then(() => {
     return new Error("err")
 })//不会报错， a的值为resolve: Error: err 在处理程序中返回任意一个非Promise都会被包装成Promise对象

 let p = new Promise((resolve, reject) => {
     resolve("success")
 })
 let a = p.then(() => {
     throw new Error("error")
     return Promise.reject(new Error("err")) //这两种方式应该是等价
 })
 //  会报错,如果下面没有catch来处理错误，a的返回值就是reject: Error: error,
 // 要是下面有catch来捕获错误，a的返回值就是resolve: undefined
```

### Promise.prototype.catch()

* 其实就是个语法糖，```p.catch(() => {}) === p.then(null, () => {})```
* catch也有返回值，和上面介绍的行为一样。

### Promise.prototype.finally()

* 无论p的状态如何都会执行,所以finally不接受任何参数。finally的返回值和状态无关，大多数情况下表现为父期约的传递。

```js
// 这两种情况就是特殊情况
p.finally(() => new Promise(() => {})) //Promise `<pending>`
p.finally(() => Promise.reject()) //Promise `<reject>`: undefined
```

* 主要是为了解决冗余代码

### 非重入特性

* 在一个解决期约上调用then处理程序，会把then中的回调函数推荐消息队列。
* 因此then中的回调函数才是真正异步的函数。

### 拒绝期约和拒绝错误处理

* throw一个错误对象和在reject中返回一个Error对象，都会返回一个内容为错误对象的状态为reject的Promise。
* 期约可以使用任何理由拒绝，但是最好使用一个Error对象，因为Error对象会包含一些用于调试的信息，
* 这些错误都是通过异步抛出且未处理的，异步的错误只能通过异步的处理程序来捕获(注意只有经历了then等处理程序的错误才是异步的)

```js
new Promise((resolve,reject) => {
     try{
         throw(Error("xujie")) //此时的throw的错误还没有经过then的异步调用，所以可以通过try同步捕获
     }catch(e) {
         console.log(e);
     }
     resolve()
 })
```

## 期约的连锁和期约合成

### 期约连锁

* 可以使用连缀方法的调用的形式
* 实现的原理主要是then，catch，finally处理程序的返回值都是一个Promise。
* 链式调用后面的内容需要等前一个调用执行完才会执行。

### 期约合成

#### Promise.all([p, p])

* Promise.all()静态方法会在一组期约全部解决之后再解决， 返回**一个新期约**

```js
let p = Promise.all([Promise.resolve("xujie"), Promise.resolve("xiaohan")]) //新期约的值是一个数组，["xujie", "xiaohan"]
let a = Promise.all([1, 2]) //原始值会被Promise.resolve()包装处理
let b = Promise.all([]) //这条语句等价于Promise.resolve()
let d = Promise.all() //无效的语法
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

* 有一个包含的期约待定，则合成的期约也待定。一个包含的期约拒绝，则合成的期约也拒绝(第一个拒绝的理由会成为合成期约的拒绝理由),
* all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。
* 如果所有期约都成功解决， 合成期约的值就是包含期约解决值的数组。

#### Promise.race([p, p])

* 返回一个包装期约，是一组集合中最先解决或者拒绝的期约的镜像。
* 不区别解决和拒绝，只要是第一个落定的期约，Promise.race()就会包装其解决值或者拒绝理由并返回新期约
* all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。
* 多个期约解决，按照顺序来决定第一个

```js
let a = Promise.race([1, 2]) //原始值会被Promise.resolve()包装处理
let b = Promise.race([]) //这条语句等价于Promise.resolve()
let d = Promise.race() //无效的语法
```

## 终止Promise(终止不是中断，Promise一旦被创建就没办法被中断)

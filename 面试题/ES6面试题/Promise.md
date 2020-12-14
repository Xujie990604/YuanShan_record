# Promise的面试题

* 注意Promise的链式调用的实质

```js
 const promise = new Promise((resolve, reject) => {
    reject("error");
    resolve("success2");
});
promise
    .then(res => {
        console.log("then1: ", res);
    }).then(res => {
        console.log("then2: ", res);
    }).catch(err => {
        console.log("catch: ", err); //catch: error
    }).then(res => {
        console.log("then3: ", res);//then3: undefined 是因为catch()的返回值是一个新的Promise
    })                              //在链式调用中都是根据前面的新的Promise进行操作, 不是仅仅针对Promise执行器进行操作
```

* 注意链式调用时，只有当前面的处理程序触发了，才会去处理下面的微任务。

```js
// 输出结果是 1 finally2 finally finally2后面的then函数2
// 当有多个执行器下面都有多个链式调用的时候，不会一股脑的把一个执行器的微任务全都添加到微任务队列中
// 而是先把执行器1的then添加到微任务队列， 在把执行器2的finally添加到微任务队列，等这两个微任务都执行完了， 再把执行器2的finally添加到微任务队列...
// 你可以理解为链式调用后面的内容需要等前一个调用执行完才会执行。
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
    return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })
```

* await会等后面的表达式有值的时候才往任务队列中添加微任务，如果await后面是个Promise并且一直处于pending， 那么await后面的语句永远不会执行

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1') //因为这个Promise一直都是pending
  })
  console.log('async1 success'); //永远不会执行
  return 'async1 end' //永远不会执行
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
```

* 微任务中抛出来的微任务也会在当前的写下一个宏任务之前执行

```js
async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1')
        resolve('promise resolve')
    })
    console.log('async1 success'); //因为理解为await后面的语句相当于放到了new Promise中， 下一行及之后的语句相当于放在了Promise.then中
    return 'async1 end'            //所以这两个语句都是在await抛出的微任务中，尽管这个微任务又抛出抛出了一个微任务 (return 'async1 end')
                                   //但是这个微任务还是会在下面的setTimeout的宏任务之前执行(事件循环的定义)
}
console.log('srcipt start')
async1().then(res => {
    console.log(res)
})
new Promise(resolve => {
    console.log('promise2')
    setTimeout(() => {
        console.log('timer')
    })
})
```
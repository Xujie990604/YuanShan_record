# Promise的面试题

* 注意Promise的链式调用的实质

```js
 const promise = new Promise((resolve, reject) => {
    reject("error");  //promise在折里抛出错误后，代码会终止执行。因此const promise的值为Promise:{reject, error} 
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
// 而是先把执行器1的then添加到微任务队列， 在把执行器2的finally添加到微任务队列，等这两个微任务都执行完了， 再把执行器1的finally添加到微任务队列...
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

* **await**后如果promise状态不发生改变的话，await后面的语句会一直处于等待状态，永远不会执行
* then中传入非期望函数参数会被直接忽略
* 宏任务(setTimeout)的添加需要看看是在多少ms之后

```js
const async1 = async () => {
    console.log('async1');
    setTimeout(() => {//宏任务2 尽管位置考上， 但是是在2000ms后加入消息队列
        console.log('timer1')
    }, 2000)
    await new Promise(resolve => {
        console.log('promise1')
    })
    console.log('async1 end') // 因为await后面的Promise永远是pending状态，所以包括这条语句的下面两条语句永远不会执行
    return 'async1 success'//不会执行
}
console.log('script start');
async1().then(res => console.log(res));  //因为async()的return语句不会执行，所以这个then处理程序不会执行
console.log('script end');
Promise.resolve(1)
    .then(2) //非期望函数值，忽略这条语句
    .then(Promise.resolve(3)) //非期望函数值，忽略这条语句
    .catch(4)//非期望函数值，忽略这条语句
    .then(res => console.log(res))//微任务1
setTimeout(() => { // 宏任务1 尽管位置考下，但是是在1000ms后加入消息队列
    console.log('timer2')
}, 1000)
```

* finally不接受任何参数
* 当执行器和处理程序链式调用的时候，用一个变量接受，变量最终的值是最后一个执行程序的值，**不是执行器的值**

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {   //hong 1
      resolve('resolve3');
      console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => { //hong 2
      console.log(p1) 
  //打印的p1不是执行器的值，因为执行器和then，finally处理程序链式写在了一起，所以p1是finally的值，
  //finally在不抛出错误和Promise一直是pending的情况下，是上一个Promise的值，也就是then的值。then没有显式的return一个值，所以then的返回值是undefined
  }, 1000)
}).finally(res => { //因为finally不接受任何参数，所以res是个迷惑项 res是undefined
  console.log('finally', res)
})
```

* 串行异步操作， 让异步操作顺序执行

```js
const arr = [1, 2, 3]
  arr.reduce((p, x) => {
      return p.then(() => { //p.then()很有特色，关键理解reduce方法。第一次调用的p是下面的Promise.resolve(),以后的每个p都是下面的新生成的Promise。
          return new Promise(resolve => {
              setTimeout(() => resolve(console.log(x)), 1000) //只有本次的Promise成功兑换之后，上面的p.then()才能开始执行
          })
      })
  }, Promise.resolve())
```
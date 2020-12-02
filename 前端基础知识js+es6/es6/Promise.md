# Promise

* Promise对象是对我们现在尚未得到的，但将来会得到的值的占位符。

## 三种状态

* unresolved 等待任务完成
* resolved 任务完成且没有任何问题  可以无限调用.then()方法
* rejected 任务完成但是出现问题 可以调用.catch()方法

## Promise的特点

* 对象的状态不受外界的影响，只有异步结果可以决定当前是哪一种状态。任何其他的操作都无法改变。
* 一旦状态改变就不会再变。任何时候都会得到这个结果。
* 无法取消promise，一旦创建就立即执行。

1. 在执行传入的回调函数时，会传入两个参数，resolve，reject这两个本身又是函数
2. 在回调函数中执行异步请求(根据请求的成功与否执行resolve或者reject)(只是请求，代码的处理要去then中执行)

```js
new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
            })
        }).then(() => {
            console.log("第一步的异步请求")

            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve()
                })
            })
        }).then(() => {
            console.log('第二次异步请求')

            return new Promise((resolve,reject) => {
                resolve()
            })
        }).then(() => {
            console.log("第三次异步请求");
        })
```

## promise的链式调用和简写

```js
new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('aaa');
        });
      }).then((res) => {
          console.log(res);

          return res + 111;
        }).then((res) => {
          console.log(res);

          return res + 222
        }).then((res) => {
          console.log(res);
        });
```

* 可以通过这种方式来进行链式调用，对于同一个数据进行多次处理
* Promise.resolve()和Promise.reject()是Promise的一个简便的写法
* return res + 111,其实是Promise API内置的Promise.resolve()更加简便写法。其实这个语句在内部调用了一次 new Promise()

## Promise.all()方法

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

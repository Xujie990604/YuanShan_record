# 原生js的一些手写实现的代码

## 防抖函数的实现

* 所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
* 防抖函数使用const args = arguments；的作用是让debounce 函数最终返回的函数依旧能接受到 e 参数
* 防抖函数使用const self = this；并且func.apply(self,args)是为了让func函数的this指向和debounce 函数最终返回的函数的this指向一致

```js
<div id="content"
        style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;">
    </div>
    <script>
        let num = 1;
        const content = document.getElementById('content');

        function count() {
            content.innerHTML = num++;
        };

        function debounce(func, delay) {
            let timer = null;
            return function() {
                const args = arguments;
                if(!timer) {
                    timer = setTimeout(() => {
                        timer = null;
                        func(args)
                    },delay)
                }
            }
        }

        let delay = debounce(count, 500);
        content.onmousemove = delay;
        // 为什么要修正this的指向。本来你想要绑定在onmousemove事件上的函数是count函数
        //现在你需要使用防抖函数来包装一下，现在绑定在onmousemove事件上的函数为delay函数，delay函数的this指向DOM。因为count没有被绑定在onmousemove事件上。所以count的函数this指向window
        //所以需要使用apply函数来修正一下this的指向。不然在count函数内使用this时，就会出现与预想的误差。
```

### 非立即执行的版本

```js
function debounce(func, delay) {
    let timer = null;
    return function () {
        const self = this;//如果定时器里面使用的回调函数时箭头函数的话，就没有必要加上这条语句
        //如果定时器里面的回调函数时普通函数的话，就需要加上这一条语句，用来指定this
        const args = [...arguments];
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
```

### 立即执行的版本

```js
function debounce(func, delay) {
            let timer = null;
            return function () {
                const args = [...arguments];
                if (timer) clearTimeout(timer);
                const callNow = !timer;
                timer = setTimeout(() => {
                    timer = null;
                }, delay)
                if (callNow) func.apply(this, args)
            }
        }
```

## 节流函数的实现

* 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数

```js
function throttle(func, wait) {
    let timer = null;
    return function() {
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args)
            }, delay)
        }
    }
}
```
# JavaScript 面试题

## 一，数组去重

### 1.1 使用 ES6 的方法

```javascript
// 不能去掉重复的空的对象和数组，每个空的对象认为是不同的
[...new Set(arr)];
```

### 1.2 使用 hasOwnProperty

- hasOwnProperty() 方法的返回值是布尔值，判断对象是否包含特定的自身属性(非继承过来的属性)
- 能够完美的实现数组去重功能,因为
- 直接进行数据的比较：因为引用值比较时。比较的是地址所以[] {} 不能被正确去重
- 数据调用 toString 之后进行比较： [] {} 问题解决掉了，但是 "true" 和 true ，123 和 "123" 会被错误的认为相同

```javascript
function unique(arr) {
  var obj = {};
  return arr.filter(function (item, index, arr) {
    // 在进行数组的判断时使用了两个条件： 自身的数据类型 + toString()方法
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}
```

### 1.3 使用双循环的方式进行对比，使用 splice 去掉重复的数据

- 缺点 NAN 无法去重，因为 NAN 永远不等于自身，{}空对象和空数组[]无法去重，因为引用类型比较的是地址

```javascript
let arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        //必须使用===全相等等于号
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
```

### 1.4 Array.from()

```js
Array.from(new Set(arr))
```

## 二，防抖函数的实现

- 所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
- 防抖函数使用 const args = arguments；的作用是让 debounce 函数最终返回的函数依旧能接受到 e 参数
- 防抖函数使用 const self = this；并且 func.apply(self,args)是为了让 func 函数的 this 指向和 debounce 函数最终返回的函数的 this 指向一致

```javascript
<div id="content"
        style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;">
    </div>
    <script>
        let num = 1;
        const content = document.getElementById('content');

        function count(args) {
            content.innerHTML = num++;
            console.log(args[0]) //在事件处理程序中arguments[0]就是event事件对象
            console.log(this)  //this经过修正之后指向content DOM元素
        };

        function debounce(fn, delay) {
            let timer = null;
            return function () {
              const self = this;
              const args = arguments;
              if (timer) {                    //核心思路就是除了第一次调用函数外。从第二次以后的每次调用函数都要先清除旧的定时器，在创建新的定时器。(clearTimeout(timer)并不会让timer的值变成null，它按照这个标识去清除对应的定时器。因此timer再被clear之后并不会变成null。timer在清除后还是数字。所以if()语句中的代码，除了首次进入函数不会执行外，之后的每次进入函数都会执行)
              // 因为除了首次进入函数外之后每次进入函数都会先清除旧的定时器，然后再创建新的定时器。1. 如果在规定的时间内，旧的定时器被清除了，那么旧的定时器就不会被执行。然后创建新的定时器接着本轮的循环(如果定时器一直在规定时间内被清除，那么定时器的回调函数永远不会被触发，除非遇到2这种情况)，2.如果旧的定时器在被清除之前就执行了。那么本次本次定时器被成功执行。创建一个新的定时器。开启下一轮。
                clearTimeout(timer)
              }
             timer = setTimeout(function() {
                 fn.apply(self, args);
             }, delay)
        }
     }

        let delay = debounce(count, 500);
        content.onmousemove = delay;

        // 为什么要修正this的指向。本来你想要绑定在onmousemove事件上的函数是count函数
        //现在你需要使用防抖函数来包装一下，现在绑定在onmousemove事件上的函数为delay函数，delay函数的this指向DOM。因为count没有被绑定在onmousemove事件上。所以count的函数this指向window
        //所以需要使用apply函数来修正一下this的指向。不然在count函数内使用this时，this会指向window而不是DOM
```

## 三，节流函数的实现

- 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数

```javascript
// 这是setTimeOut中的回调函数使用箭头函数的版本
//因为现在定时器中使用的回调函数为箭头函数，箭头函数虽然是在setTimeOut的执行符号里面定义的，但是没有在定时器的{}函数体中定义，因此箭头函数的this继承的是被返回的这个函数的this值(被返回的函数也就是被绑定的事件处理程序)。因此箭头函数中的this值指向被绑定事件处理程序的DOM结点。
function throttle(fn, delay, a) {
  let timer = null;
  return function () {
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        //核心代码就是当timer为null时才可以创建定时器，创建定时器之后timer的值变为数字，!timer的布尔值为假。就再也无法创建定时器了。直到定时器的回调函数执行成功。再次将timer的值改变为null。这时候!timer的布尔值为真。可以再次创建定时器。
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}
let deCount = throttle(count, 1000);
content.onmousemove = deCount;

// 这是setTimeOut中的回调函数不使用箭头函数的版本
//因为现在定时器中使用的回调函数是普通函数，定时器中的回调函数是被全局作用域调用的，所以定时器内回调函数的this指向window。所以需要使用保留的外界this值。来修正this的指向。
function throttle(fn, delay, a) {
  let timer = null;
  return function () {
    const self = this; //使用变量来保存this值，方便后面this的修正
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(self, args);
      }, delay);
    }
  };
}
let deCount = throttle(count, 1000);
content.onmousemove = deCount;
```

## 四，区别数组和对象的五种方法

1. 用 constructor          []的原型里构造函数是 Array
   {}的原型里的构造函数是 Object
2. 用 instanceof           [] instanceof Array true
   {} instanceof Array false
   (使用了原型链有关的方法，instanceof 的含义是: 实例的原型链中是否出现过该构造函数)
3. Array.prototype.isPrototypeOf(arr) // true
   Array.prototype.isPrototypeOf(obj) // false
   (实例的原型链中是否出现过该原型)
4. 用 Object.prototype.toString.call([])    [object Array]
   用 Object.prototype.toString.call({})   [object Object]
   目前这个方法还不是特别懂。大概是 Object.prototype.toString()方法能够输出各种类型，但是 Object 下面的 String() Array()等构造函数把 String()方法给重写了。所以不得已使用 call()方法来改变 this 的指向。使得执行时函数体是 Object()的函数体，但是 this 的指向变成了我们要区别类型的变量(数组或者是对象)
5. 使用 Array.isArray([]) Array.isArray({}) 来判断数据类型是否为数组

## 五，将类数组转化为数组

1. 使用 Array.prototype.slice.call(arguments)。 slice()方法如果不传参数的话，会返回原数组的拷贝
2. Array.from(arguments)   是 ES6 中提供的方法，只要有 length 属性的对象都可以使用这个方法来转换为数组

## 六，逆转字符串(不使用循环)

```javascript
// 字符串的逆转，就先把字符串转化为数组。
function reverseStr(str) {
  return str.split("").reverse().join("");
}
```

## 七，判空

### 7.1 数组判空

```javascript
arr.length === 0;
```

### 7.2 对象判空

```javascript
Object.keys(obj).length === 0;
```

## 八、详述 JS new 操作

1. JS 通过原型模式来实现面向对象系统

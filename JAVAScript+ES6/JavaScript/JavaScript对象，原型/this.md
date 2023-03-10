<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:22
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\JavaScript\JavaScript对象，原型\this.md
 * @Description: 
-->
# this

* 注意 **this是函数内部的自动生成的一个参数**
* this 永远指向一个对象
* this 指的是函数**被调用**时(不是定义时)所在的**环境**
* 因为在 JS 中函数可以像值一样被传递，所以函数中的 this 指向是不固定的。要看函数被调用时实际所在的 **环境**
* 函数预编译过程中 this 指向 windows(起始的时候都是指向 window，后来随着 **环境** 的改变而改变 this 的指向)

## 函数的四种调用模式(绑定模式/环境)

优先级: new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

1. 函数调用模式                  this => window
2. 方法调用模式                  this => obj
3. call/apply 调用模式           this => 传入的参数
4. 构造器调用模式                 this => 准备生成的实例

## 默认绑定: 作为普通函数被调用

* this 指向的是全局对象
* 非严格模式下，全局中的函数的 this 指向 window， 严格模式下，全局中的函数的 this 指向 undefined。

```javascript
var foo = {
    baz: function() {
        alert(this);
    }
}
foo.baz(); // foo - because baz belongs to the foo object when invoked

var anotherBaz = foo.baz;
anotherBaz(); // global - because the method anotherBaz() belongs to the global object when invoked, NOT foo
```

```js
name = 'window'
const obj = {
  name: 'obj',
  a: function() {
    test()
    function test() {
      console.log(this.name)  
      // 注意 test() 是作为**函数**被调用的。没有 xxx.test()。所以 this 指向 window
      // 这是 JS 在语言设计上的一个错误，会导致内部函数的 this 指向与预期不符
      // 解决方案： 1. const that = this  2. 使用箭头函数定义内部函数
    }
    console.log(this.name) // a() 是作为 obj 的方法被调用的。this 指向 obj
  }
}
obj.a()
```

## 隐式绑定: 作为对象的方法被调用

* this 指向的是调用方法的对象

## 显示绑定: call/apply/bind

* 改变 this 指向(修正 this 的指向)
* obj1.call(obj2, a, b, c)。实现用别人的方法来完成自己的功能。
* apply(obj,[a, b, c])的区别就是传递参数时的不同
* call/apply的 this 传递 null 时。函数体内的 this 会指向默认的宿主对象，在浏览器中则是 window

### bind

```js
    const obj = {
      name: 'xujie123',
      say() {
        console.log(this.name);
      }
    }
    const b = {
     name: 'xiaohan'
    }
    //  使用bind生成一个新的函数，这个函数的this值永远的被绑定在了 b这个对象上
    let newSay = obj.say.bind(b);
    // 直接执行bind就相当于每次都执行了一个(使用call改变了this指向的)函数一样
    newSay();
```

### bind 使用 call 实现

```js
    const obj = {
        name: 'xujie123',
        say(a, b) {
            console.log(this.name + a + b);
       }
    }
    const b = {
        name: 'xiaohan'
    }
    // 使用call和闭包来实现bind方法
    let newSay = function(...arg) {
        return obj.say.call(obj,...arg)
    }
    // 直接调用方法，函数的this一直指向对象b
    newSay('hello', 'world');
```

## new 绑定: 在构造函数中

* 使用 new 调用构造函数时，构造函数中的 this，指代的是这个新的实例(新对象)

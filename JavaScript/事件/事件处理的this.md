# 事件处理函数的 this 指向

## this 指向

### 通过 javascript 来指定事件处理程序

- 在事件处理程序中，在动态绑定中(无论是把函数的引用给事件函数还是直接把函数的定义放到事件处理函数上)，函数中的 this 永远指向的是触发它的元素。因为此时是这个元素调用了这个函数。
- 但是如果把 test() 赋值给事件上，那么 this 值为 window，因为只给一个函数名是把函数的引用赋值给了事件，将来这个函数是被这个元素调用的，也就是说执行环境是 DOM 元素，但是要是把 test()直接赋值给事件，那就是把函数的执行结果赋值给了事件，那么这个函数时在全局被调用的。

```javascript
// 两种不同的动态绑定事件的方法
ele.onXXX = function(){}
// 程序的this指向dom元素本身

obj.addEventListener("type",function,false)
// 程序的this指向dom元素本身
```

#### 在行内绑定事件处理程序

- 在行内绑定函数时，函数里面的 this 指的是 window。因为此时调用这个函数的是 window。
- 行间内引用必须要加()吗？ 是的 因为要求加入的是能够执行的代码，而不是一个函数的引用地址。

```javascript
<p id="xujie" onclick="a()">
  xujie
</p>;
function a() {
  console.log(this);
}
```

#### 在行间直接使用语句

- 没有绑定方法而是直接在元素中指定了语句，这时函数中的 this 就是元素本身。因为 js 代码直接写在了 html 中，此时的 this 就是点击事件发生时的目标元素。
- 可以使用 this.href 来直接访问当前元素的 href 属性。(也可以直接使用 href，因为 js 的内部机制)
- 在行间内直接使用语句的时候，在执行时会动态的创建一个函数，在这个函数中使用 with 改变了作用域，使用了 with(this)语句，因为 this 就是执行当前元素，所以直接使用 href 就能直接访问，(如果是 input，能够直接访问到 input 的父元素 Form 的作用域，方便各个 input 表单之间互相通信)

```javascript
<p id="xujie" onclick="console.log(this)">
  xujie
</p>
```

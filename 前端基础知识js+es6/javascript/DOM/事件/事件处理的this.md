# 事件处理函数的this指向

## this指向

### 通过javascript来指定事件处理程序

* 在事件处理程序中，在动态绑定中(无论是把函数的引用给事件函数还是直接把函数的定义放到事件处理函数上)，函数中的this永远指向的是触发它的元素。因为此时是这个元素调用了这个函数。
* 但是如果把test()赋值给事件上，那么this值为window，因为只给一个函数名是把函数的引用赋值给了事件，将来这个函数是被这个元素调用的，也就是说执行环境是DOM元素，但是要是把test()直接赋值给事件，那就是把函数的执行结果赋值给了事件，那么这个函数时在全局被调用的。

```javascript
   <p id="xujie">这是一个段落</p>
   var eleP = document.getElementById("xujie");
        eleP.onclick = function() {
            console.log(this)
        }
  
  ```

### 通过元素的特性来指定事件处理程序

* 某个元素支持的某种事件，都可以通过与事件处理程序同名的HTML特性来指定(HTML的特性应该是一些值)
* 因为是值，所以直接在行内添加代码时，不能出现未经转义的字符。
* 这个特性的值应该是能够执行的js代码(因此在行间绑定函数时需要加()执行符号，而不是添函数的引用。)
* 缺点 ： 事件处理程序和HTML元素紧密耦合，一是改动代码时麻烦，二是HTML刚加载完时，那些代码不具备被执行的条件(还没有解析到事件特性中使用到的函数)，导致错误。还有就是扩展程序的作用域链不同的浏览器的支持程度不一样。

#### 在行内绑定事件处理程序

* 在行内绑定函数时，函数里面的this指的是window。因为此时调用这个函数的是window。
* 行间内引用必须要加()吗？ 是的 因为要求加入的是能够执行的代码，而不是一个函数的引用地址。

```javascript
<p id="xujie" onclick="a()">xujie</p>
 function a() {
    console.log(this)
 }
```

#### 在行间直接使用语句

* 没有绑定方法是直接在元素中指定了语句，这时函数中的this就是元素本身。因为js代码直接写在了html中，此时的this就是点击事件发生时的目标元素。
* 可以使用this.href来直接访问当前元素的href属性。(也可以直接使用href，因为js的内部机制)
* 在行间内直接使用语句的时候，在执行时会动态的创建一个函数，在这个函数中使用with改变了作用域，使用了with(this)语句，因为this就是执行当前元素，所以直接使用href就能直接访问，(如果是input，能够直接访问到input的父元素Form的作用域，方便各个input表单之间互相通信)

```javascript
<p id="xujie" onclick="console.log(this)">xujie</p>
```

## 方法绑定的不同this

ele.onXXX = function(){}
程序的this指向dom元素本身

obj.addEventListener("type",function,false)
程序的this指向dom元素本身

obj.attachEvent('on+type',function) IE的吧？
程序this指向window
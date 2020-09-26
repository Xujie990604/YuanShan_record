# this

1. 在js中，使用new调用构造函数时，在实例的方法内部引用this时，指代的是这个新的实例(新对象)
2. this指的是函数运行时(不是定义)所在的环境(对象)(不是作用域！！！),在哪个环境被调用。
3. 任何函数的内部this的值永远不会是静态的，它总是在每次调用函数时确定，但在函数实际执行其代码之前就已确定。函数内部的this的值实际上是由调用该函数的父范围提供的，更重要的是，实际函数语法的编写方式。每当调用函数时，我们都必须查看方括号/括号“（）”的紧靠左侧。如果在括号的左侧可以看到一个引用，则传递给函数调用的“ this”的值正是该对象所属的
4. 在事件处理程序中，在动态绑定中，关键字this永远指向的是触发它的元素。在行内绑定函数时，函数里面的this指的是window。没有绑定方法而是直接在元素中指定了语句，这时的this就是元素本身。
5. this永远指向一个对象(数组也可以被当做this的指向,当数组里面存的是函数的时候  ```test[0]()```)
6. this的指向完全取决于函数调用的位置
7. 谁.function()那么这个this就指向谁，和函数在谁内部执行没有关系。主要就是看(.),比如一个函数在另一个函数内被执行，但是没有谁.这个函数，函数的this就是执行window，不考虑作用域关联。(因为函数可以被单纯当做值来调用，在不同的环境中this执行不同)
8. this中的(有this的时候只考虑)环境对象和(没有this的时候考虑作用域)作用域完全不是一个概念

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

1.函数预编译过程中this指向windows(起始的时候都是指向window，后来随着环境的改变(谁.了函数)而改变this的指向)
2.全局作用域里this指向的是windows
3.call/apply能够改变this的指向
4.obj.func(); func()里面的this指向obj

## call/apply

* 改变this指向
* 默认方法的调用使用.call(obj,a,b,c) 用别人的方法实现自己的功能
* apply(obj,[a,b,c])的区别就是传递参数时的不同
* call/apply的this传递null的时候就是不起作用，正常执行函数
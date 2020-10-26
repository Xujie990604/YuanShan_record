# ES6相关的问题

## 箭头函数和普通函数的区别

* 写法上更加的简洁，清晰

* this

1. 箭头函数的this是继承而来并且无法改变
2. 箭头函数中不能使用apply和call来改变this的指向
3. 不可以当做构造函数
4. 没有arguments属性
5. 没有原型prototype
<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-08-15 15:20:39
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\JAVAScript+ES6\ES6\Class.md
 * @Description: Class的用法
-->
# Class

## 类的基本使用

```js
class Point {
      // constructor方法是类中的默认方法
      // constructor方法的返回值默认是this对象
      constructor(x, y) {
        this.a = x;
        this.b = y;
      }
      // 属性前面加上static关键字代表这是一个静态属性
      static prop = 1
      // 私有属性：只能在类的内部使用，在类的外部使用会报错
      #a = 'xujie'

      // 类的所有方法都是定义在prototype属性上
      // 用类的实例调用方法，其实就是调用prototype上的方法
      toString() {
        return `${this.a} + ${this.b}`
      }
      
      // 方法前面加上static关键字代表这是一个静态方法
      // 静态方法： 只能通过类调用，不能通过类的实例调用
      // 静态方法中如果使用了this关键字，this代表类本身，而不是实例
      static add() {
        return this.a + this.b;
      }

      // 私有方法: 只能在类的内部调用，在类的外部调用会报错
      #delete() {
        return 'delete'
      }
    }

    // 类在调用时必须使用new操作符，使用()把类当做函数调用会报错
    const p = new Point(1,3)
    
    typeof Point // "function" Class实际上就是一个语法糖，Point类本质还是一个函数
    Point === Point.prototype.constructor // true、
```

## 类的继承

* 父类的静态属性和方法会被子类继承
* 父类的私有属性和方法不会被子类继承

```js
class Foo {
      constructor() {
        console.log(1);
      }
    }

    // 使用extend关键字实现继承
    class Bar extends Foo {
      constructor() {
        // 在子类的 constructor 中必须先调用一次super()之后才能使用 this关键字
        // super()函数就是在调用父类的构造函数，生成一个父类的实例对象，这个实例对象拥有父类上的属性和方法
        // 然后将这个实例对象当做子类的this。子类在这个对象上进行属性和方法的添加，这样来实现子类的实例既有父类的方法属性又有自身的方法属性
        super();
        console.log(2);
      }
    }

    const bar = new Bar();  // 控制台会打印 1 2 因为子类实例构建的同时，会调用super()执行一次父类的构造
```
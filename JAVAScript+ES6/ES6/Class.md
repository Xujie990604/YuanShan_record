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
     // 最好是需要用到哪些变量时提前声明一下 
     // 这种普通的变量是定义在 new 生成的实例上的
      a = 1
      b = 2
      
      // constructor 方法是类中的默认方法
      // constructor 方法的返回值默认是 this 对象
      constructor(x, y) {
        this.a = x;
        this.b = y;
      }

      
      // 类的所有方法都是定义在 prototype 属性上
      // 用类的实例调用方法，其实就是调用 prototype 上的方法
      toString() {
        return `${this.a} + ${this.b}`
      }

      // set/get 访问器
      set length(a) {
        this.a = a
      }

      // 调用的时候像属性一样 Point.length = 6

      get length() {
        return this.a.length
      }

      // 调用的时候像属性一样 Point.length

      // 属性前面加上 static 关键字代表这是一个静态属性
      // 静态属性不会存在于通过 new 生成的实例中
      // 静态属性可以通过类直接调用，或者是被静态方法调用
      static prop = 1
      // 方法前面加上 static 关键字代表这是一个静态方法
      // 静态方法：只能通过类调用，不能通过类的实例调用
      // 静态方法中如果使用了 this 关键字，this 代表类本身，而不是实例(也就是通过 this 可以来调用静态属性)
      static add() {
        return this.prop;
      }

      // 私有属性：只能在类的内部使用，在类的外部使用会报错
      // 私有属性会存在于 new 生成的实例中，就是不可以被调用
      #a = 'xujie'
      // 私有方法: 只能在类的内部调用，在类的外部调用会报错
      // 因为私有属性和方法存在于实例中，所以不可以在 static 方法中调用
      #delete() {
        return 'delete'
      }
    }

    // 类在调用时必须使用 new 操作符，使用()把类当做函数调用会报错
    const p = new Point(1, 3)
    
    typeof Point // "function" Class 实际上就是一个语法糖，Point 类本质还是一个函数
    Point === Point.prototype.constructor // true
```

## 类的继承

* 父类的静态属性和方法会被子类继承
* 父类的私有属性和方法不会被子类继承(其实私有属性还会在子类 new 出来的实例中存在，只不过是不能用)(私有属性只能在定义它的类中使用)

```js
class Foo {
  constructor() {
    console.log(1);
   }

  size() {
    console.log(1)
  }
}



// 使用extend关键字实现继承
class Bar extends Foo {
  constructor() {
    // 在子类的 constructor 中必须先调用一次 super() 之后才能使用 this 关键字
    // super() 函数就是在调用父类的构造函数，生成一个父类的实例对象，这个实例对象拥有父类上的属方法
    // 然后将这个实例对象当做子类的 this。子类在这个对象上进行属性和方法的添加，这样来实现子类例既有父类的方法属性又有自身的方法属性
    super();
    console.log(2);
  }
  
  // 父类和子类都有方法 size 时，子类的方法会重写父类的方法实现(重写也就是覆盖)
  // 但是可以通过 super.size() 的方式实现，调用子类方法时先执行一遍父类的方法
  size() {
    super.size()
    console.log(2)
  }
}

    const bar = new Bar();  // 控制台会打印 1 2 因为子类实例构建的同时，会调用super()执行一次父类的构造
```

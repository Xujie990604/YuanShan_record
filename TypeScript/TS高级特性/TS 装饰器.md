# TS 装饰器

* 使用 @expression 的形式， expression 求值后必须是一个函数，它会在运行时被调用，被装饰的声明信息作为参数调用

## 一、类装饰器

1. 类的构造函数作为装饰器的唯一参数

```ts
// 普通装饰器
function enhancer(target: any) {
  target.prototype.name = 'xujie'
  target.prototype.age = 18
}

@enhancer
class Person {
  constructor() {}
}

// 带有参数的装饰器(装饰器工厂)
function enhancer(name: string, age: number) {
  return function enhancer(target: any) {
    target.prototype.name = name
    target.prototype.age = age
  }
}

@enhancer('xujie', 29)
class Person {
  constructor() {}
}
```

## 二、属性装饰器

1. 第一个参数： 对于实例成员来说是原型对象，对于静态成员来说是类的构造函数
2. 第二个参数：属性的名称

```ts
function enhancer(target: any, key: string) {
 console.log(target)
 console.log(key)
}

class Person {
  @enhancer
  name: string  // 类的实例成员
  @enhancer
  static height: string = '190'  // 类的静态成员
  constructor() {
   this.name = 'xujie'
  }
}
```

## 三、方法装饰器

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 是方法的名称
3. 是方法的描述 修饰方法

```ts
function enhancer(target: any, key: string, desc:PropertyDescriptor) {
 console.log(target)
 console.log(key)
 console.log(desc)
}

class Person {
  constructor() {
  }
  @enhancer
  add() {}  // 实例方法
  @enhancer
  static test() {} // 静态方法
}
```

## 四、参数装饰器

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 参数在函数参数列表中的索引

```ts
function enhancer(target: any, key: string, index: number) {
 console.log(target)
 console.log(key)
 console.log(index)
}

class Person {
  constructor() {}
  // 实例参数
  getName(@enhancer name:string){} 
  // 静态参数
  static test(@enhancer age: string) {}
}
```

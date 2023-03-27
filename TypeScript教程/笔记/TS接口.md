# TS接口

## type 和 interface 的对比

### 相同点

* 都可以用来定义对象，并且支持 1. 可选参数 2. readonly

```ts
interface a {
  name?: string,
  readonly age: number
}

type b = {
  name?: string,
  readonly age: number
}
```

* 都可以用来定义函数类型

```ts
interface a {
  (name: string, age:number):void
}

type b = (name: string, age:number) => void
```

* 都可以实现继承

```ts
1. interface 使用 extends 实现继承
2. type 使用 &(交叉类型) 实现继承
```

### 不同点

* type 能够声明基本类型 & 联合类型 & 元组类型

```ts
type a = string | number
type b = [number, string]
```

* interface 可以重复定义相同名字的接口，并且这个接口会在之前的基础上进行合并而不是覆盖，type 定义相同的类型别名会爆错

```ts
interface a {
  name: string
}
interface a {
  age: number
}

type b  = {
  name: string
}
type b = {
  age: number
}
```

## 接口的使用

### 接口的继承

```ts
interface aType {
  name: string
}

interface bType {
  age: number
}

// 接口可以继承多个，方便了接口的复用性
interface cType extends aType,bType {
  height?: number
}

let obj: cType = {
  name: 'xujie',
  age: 89
}
```

### 可选参数

```ts
// ?代表 name 属性是一个可选的参数
interface paramsTs{
  label: string,
  name?: string
}
```

### 只读属性

```ts
// readonly 代表属性只能在被初次创建时给一个值，创建完成之后就不能在修改属性的值了
// 只读变量用 const 只读属性用 readonly
interface Point {
    readonly x: number;
    readonly y: number;
}
```

### class 实现 interface

```ts
// 定义一个接口
interface aType {
  content: string
  say: (content: string) => void
}

// 实现 Person 父类
class Person  {
  content: string
  constructor(content: string) {
    this.content = content
  }
}

// 实现 man 类 继承 Person 并且实现 aType 接口
// 使用接口的好处
// 1. 对于类的定义增加了一种限制
// 2. 给类又增加了一个身份，当前 man 就是一个实现了 aType 的类
// 如果此时有一个 woman 类也实现了 aType 接口，即使和 man 类的实现不完全一致，但是他们都有一个共同的身份就是实现了 aType 的类
class man extends Person implements aType {
  constructor(content: string) {
    super(content)
  }
  say() {
    console.log('说话')
  }
}

const p = new man('吃饭')
```

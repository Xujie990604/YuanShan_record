<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-11 17:02:51
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\笔记\TS接口.md
 * @Description: 
-->
# TS接口

* interface 和 type 的最主要区别是 interface 可以重复定义相同名字的接口，并且这个接口会在之前的基础上进行合并而不是覆盖，type 无法定义相同的类型别名

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

### class 实现接口

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

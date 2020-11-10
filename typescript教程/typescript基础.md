# TypeScript

## 基础类型

* 布尔值 isTrue: boolean
* 数字 num: number Ts中所有的数字都是浮点数
* 字符串 str: string
* 数组 list: number[] = [1,2,3]表示由数字类型构成的数组  list: Array<number> = [1,2,3] 使用数组泛型来定义

* 元组类型允许表示一个已知数量和类型的数组，各元素的类型不必相同

```typeScript
let x: [string,number];
x = ['hello',10] //ok
x= [10,'hello']  //Error
```


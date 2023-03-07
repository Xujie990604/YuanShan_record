<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-11 16:35:17
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\TypeScript教程\笔记\TS基础.md
 * @Description: 
-->
# TypeScript 基础

## 什么是 TypeScript

* TypeScript 是一门静态类型语言，编译类型语言
* TypeScript 是 JavaScript 的超集(兼容 JavaScript 的所有特性)

## 为什么要使用 TypeScript

1. JS 缺失类型的概念，TS 在 JS 的基础上增加了类型的概念保证程序的健壮性
2. 在开发时能够拥有更好的开发体验。使用 TS 后，IDE 可以做到自动提示，自动填充等功能。
3. 能够提前发现错误，错误代码在编译时期就会报错，而不用非得等到代码已经跑起来。
  
## TypeScript 的特点

* JavaScript 不会在编码的过程中报告错误，只会在实际执行的时候报告错误。TypeScript 解决了这个痛点
* TS 的核心原则之一就是对值所具有的结构进行类型检查

## TS中的擦除

```ts
// 要求传入的参数是一个对象，并且对象内的 label 属性必须是一个 string
function test(params: {label: string}) {
  console.log(params.label)  //打印成功
  console.log(params.size)   // 打印失败，因为 params 的类型注解中并没有 size 属性
}

let a = {
  size: 10,
  label: "xujie"
}
// 这种传参形式即使多传了一个 size 属性，也不会报错 (TS 内部执行的擦除的操作)
// 这个特性的好处就是，只要 a 满足了形参的最低要求(定义了的 label 是有的并且类型正确)就可以当做实参传进去，否则的话还得再处理一遍将多余的 size 手动去掉
test(a)  

test({
  size: 10,
  label: "xujie"
})   // !!!! 这种传参形式就会报错，因为函数的形参并没有定义 size 属性
```

## 类型声明

* 在 .d.ts 文件中做类型的声明

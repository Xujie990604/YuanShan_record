# TypeScript 基础

1. 复杂性不会凭空消失，只是会从 A 转移到 B
2. 大型项目没必要非得使用 TS, 只要做好`代码规范`和`注释`就行了

## 一、TypeScript 介绍

- TypeScript 是一门静态类型语言，编译类型语言
- TypeScript 是 JavaScript 的超集(兼容 JavaScript 的所有特性)

### 1.1 为什么要使用 TypeScript

1. JS 缺失类型的概念，TS 在 JS 的基础上增加了类型的概念保证程序的健壮性
2. 在开发时能够拥有更好的开发体验。使用 TS 后，IDE 可以做到自动提示，自动填充等功能。
3. 能够提前发现错误，错误代码在编译时期就会报错，而不用非得等到代码已经跑起来。

### 1.2 TypeScript 的特点

- JavaScript 不会在编码的过程中报告错误，只会在实际执行的时候报告错误。TypeScript 解决了这个痛点
- TS 的核心原则之一就是对值所具有的结构进行类型检查

## 二、TS 中的擦除

```ts
// 要求传入的参数是一个对象，并且对象内的 label 属性必须是一个 string
function test(params: { label: string }) {
  console.log(params.label); //打印成功
  console.log(params.size); // 打印失败，因为 params 的类型注解中并没有 size 属性
}

let a = {
  size: 10,
  label: "xujie",
};
// 这种传参形式即使多传了一个 size 属性，也不会报错 (TS 内部执行的擦除的操作)
// 这个特性的好处就是，只要 a 满足了形参的最低要求(定义了的 label 是有的并且类型正确)就可以当做实参传进去，否则的话还得再处理一遍将多余的 size 手动去掉
test(a);

test({
  size: 10,
  label: "xujie",
}); // !!!! 这种传参形式就会报错，因为函数的形参并没有定义 size 属性
```

## 三、类型声明

- 在 .d.ts 文件中做类型的声明，在文件中声明了变量，模块，interface，type 等之后，在其他地方不需要导入就可以直接使用，并且有语法提示
- declare 关键字: 用于类型声明
  
## 四、TS 中的符号

### 4.1 `?.` 可选链

```ts
// 可选链是为了避免冗余的前置检验
// 不使用可选链
if(user && user.info && user.info.name) {
  console.log(user.info.name)
}
```

```ts
// 使用可选链
// TS 在尝试访问 user.info.name 之前会先检查 user 是否为 null 或者 undefined
// TS 在尝试访问 user.info.name 之前会先检查 user.info 是否为 null 或者 undefined
// 如果上一级的属性不存在，那么表达式的返回值为 undefined
user?.info?.name
```

### 4.2 `??` 空值合并运算符

```ts
// ?? 属于高级的 ||

const user = { number: 10 }

// 只有当 user.number 为 null 或者 undefined 的时候才会返回 '暂无数据'
user.number ??  '暂无数据' 
   
// 当 user.number 为 false 类型(undefined, null, false, 0, '')时就会返回 '暂无数据'
// 所有的 false 类型都会返回 '暂无数据'，有时候会出现意料之外的行为
user.number || '暂无数据'
```

### 4.3 `!` 非空断言

```ts
let user: undefined | { number: 1 } = xxxx
// ! 能够缩小 TS 的类型检查范围
// 这会告诉编辑器 user 不会是 undefined 或者 null
// 但是也仅仅是骗过了编辑器而已，如果 user 实际值为 undefined 则程序运行起来之后照样会报错
console.log(user!.number)
```

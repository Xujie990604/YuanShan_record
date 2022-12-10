<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-11 17:02:51
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\笔记\TS接口.md
 * @Description: 
-->
# TS接口

* TS 的核心原则之一就是对值所具有的结构进行类型检查

## 使用接口来进行类型的约束

```ts
// 要求传入的参数是一个对象，并且对象内的 label 属性必须是一个 string
function test(params: {label: string}) {
  console.log(params.label)
}
let a = {
  size: 10,
  label: "xujie"
}
test(a)  // 这种传参形式即使多传了一个 size 属性，也不会报错 
// 个人理解是因为这样 a 在定义时没有做类型限制，也可以理解为通过了类型限制(因为没有限制)
// 所以在当作参数传递时，TS 认为你清楚 a 变量的各个值的类型，所以在满足 有 label 且为 string 时，就勉强让你通过了编译
// 实际上这种写代码的方式是不严谨的，在定义 a 时需要给规定同函数形参一样的类型限制，这样的话会在定义 a 时就报错

test({
  size: 10,
  label: "xujie"
})   // !!!! 这种传参形式就会报错，因为函数的形参并没有定义 size 属性

// 使用接口的方式来重构上面的例子
interface paramsTs{
  label: string
}
function test(params: paramsTs) {
  console.log(params.label)
}
let a = {
  size: 10,
  label: "xujie"
}
test(a)
```

## 可选参数

```ts
// ?代表 name 属性是一个可选的参数
interface paramsTs{
  label: string,
  name?: string
}
```

## 只读属性

```ts
// readonly 代表属性只能在被初次创建时给一个值，创建完成之后就不能在修改属性的值了
// 只读变量用 const 只读属性用 readonly
interface Point {
    readonly x: number;
    readonly y: number;
}
```

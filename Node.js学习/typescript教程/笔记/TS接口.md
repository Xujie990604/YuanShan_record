<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-11 17:02:51
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\TS接口.md
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
test(a)

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

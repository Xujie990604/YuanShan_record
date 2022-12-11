<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-11 16:35:17
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\笔记\TS基础.md
 * @Description: 
-->
# TS 的一些特性

* javaScript不会在编码的过程中报告错误，只会在实际执行的时候报告错误。TypeScript解决了这个痛点
* JavaScript缺失类型的概念
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

/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\src\test.ts
 * @Description: TS练习
 */
const obj = {
  name: "why",
  age: 18,
  ddd: 'ddd'

function test(params: {label: string}) {
  console.log(params.label)
}
let a = {
  size: 10,
  label: "xujie"
}

console.log(obj)


test(a)
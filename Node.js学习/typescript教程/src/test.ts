/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\src\test.ts
 * @Description: TS练习
 */

function add(a: number, b:number): number
function add(a: string, b:string): string
function add(number1: any, number2: any): any {
  return number1 + number2
}

console.log(add(10,78))
console.log(add('we','ty'))
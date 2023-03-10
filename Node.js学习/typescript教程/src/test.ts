/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\TypeScript教程\src\test.ts
 * @Description: TS练习
 */

function enhancer(target: any, key: string, index: number) {
 console.log(target)
 console.log(key)
 console.log(index)
}

class Person {
  constructor() {
  }
  getName(@enhancer name:string){
    console.log(name)
  }

  static test(@enhancer age: string) {
    console.log(age)
  }
}

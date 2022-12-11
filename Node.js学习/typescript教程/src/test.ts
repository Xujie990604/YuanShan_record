/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\src\test.ts
 * @Description: TS练习
 */

// type paraType = string | number
interface aType {
  content: string
  say: (content: string) => void
}

let a: aType = {
  content: '111',
  say: function() {}
}

interface aType {
  name?: string
}
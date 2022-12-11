/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\src\test.ts
 * @Description: TS练习
 */

interface Length {
  length: number
}
function test<T extends Length>(arg: T) {
  return arg.length
}

test('abc')
test(['122', '445'])
test({length: 90})

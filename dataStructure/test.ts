/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-10-09 22:18:27
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\test.ts
 * @Description: 
 */
interface paramsTs {
  label?: string,
  name?: string
}
function test(params: paramsTs) {
  console.log(params.label)
}
test({
  name: "ddd",
  label: "xujie"
})
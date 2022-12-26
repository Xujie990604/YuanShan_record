
/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-22 22:59:15
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\LeetCode\Leetcode.ts
 * @Description: 
 */
// LeetCode_001
function twoSum(array: number[], target: number) {
  // 定义一个 map，通过映射表的特点使用O(1)效率查找目标值
  const map: Map<number, number> = new Map()
  const resultArray: number[] = []
  // 将数组中的值放进 map 中(数组的值当做 map 的键，数组的下标值当做 map 的值)
  array.forEach((value, index) => map.set(value, index))
  const { length } = array
  for(let index = 0; index < length; index++) {
    // 数组第 i 个值对应的目标数值
    const targetValue = target - array[index]
    //如果 map 中有目标值(且目标值与第i个值不是同一个)，将两个值的下标放进 resultArray 
    if(map.has(targetValue) && map.get(targetValue)! !== index) {
      resultArray.push(index)
      resultArray.push(map.get(targetValue)!)
      break
    }
  }
  return resultArray
}

export{}

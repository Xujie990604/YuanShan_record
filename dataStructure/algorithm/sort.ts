/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-12 20:47:29
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\algorithm\sort.ts
 * @Description: 排序算法的实现
 */

// 对比结果的枚举类型
enum compareResult {
  BIGGER,
  SMALLER,
  EQUAL
}

// 对比函数
function defaultCompare (num1: number, num2: number) {
  if(num1 > num2) {
    return compareResult.BIGGER
  } else if( num1 < num2) {
    return compareResult.SMALLER
  }else {
    return compareResult.EQUAL
  }
}

// 交换函数
function swap(array: number[], num1: number, num2: number) {
  [array[num1], array[num2]] = [array[num2], array[num1]]
  return array
}

// 冒泡排序的算法实现 O(n²)
function bubbleSort(array: number[], compareFn = defaultCompare) {
  const { length } = array
  // 外循环, 有多少条数据就要循环多少次
  for(let i = 0; i < length; i++) {
    // 内循环，每轮结束后都会将数组 无序部分 中最大的值放到 无序部分 的末尾和 有序部分 组成新的 有序数组
    // 每轮内循环结束后, 无序部分 数量都会减一，所以下一轮要比较的次数就可以减少一次，避免无效运算
    for(let j = 0; j < length - 1 - i ; j++) {
      if(compareFn(array[j], array[j + 1]) === compareResult.BIGGER) {
        swap(array, j, j + 1)
      }
      console.log(array)
    }
  }
  return array
}


// 选择排序的算法实现 O(n²)
function selectActionSort(array: number[], compareFn = defaultCompare) {
  const { length } = array
  let indexMin
  // 外循环，n 条数据，循环 n-1 次。因为每次循环都会把 无序部分 的*最*小值放到数组开头组成有序部分
  // 当 n-1 次后，前 n-1 个数据有序，剩下的最后一个数据也是有序的
  for(let i = 0; i < length - 1; i++ ) {
    // 假设 无序部分 的第一条数据为 无序部分 的最小值
    indexMin = i
    // 内循环，每次内循环过后都会有一条数据放到最终位置(并且是放在数组开头)
    // 所以第 n 次内循环时，前 n-1 项是有序的，不需要进行对比
    for(let j = i + 1; j < length; j++) {
      if(compareFn(array[indexMin], array[j]) === compareResult.BIGGER) {
        indexMin = j
      }
      // 将无序部分的最小值放到无序部分的开头
      if(indexMin !== i) {
        swap(array, i, indexMin)
      }
      console.log(array)
    }
  }
  return array
}


selectActionSort([6,7,3,8,4,78,32])
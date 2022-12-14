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
  console.log(`原数组: ${array}`)
  console.time(`time`)
  const { length } = array
  // 外循环, 有多少条数据就要循环多少次
  for(let i = 0; i < length; i++) {
    // 内循环，每轮结束后都会将数组 无序部分 中最大的值放到 无序部分 的末尾和 有序部分 组成新的 有序数组
    // 每轮内循环结束后, 无序部分 数量都会减一，所以下一轮要比较的次数就可以减少一次，避免无效运算
    for(let j = 0; j < length - 1 - i ; j++) {
      console.count('对比次数')
      if(compareFn(array[j], array[j + 1]) === compareResult.BIGGER) {
        swap(array, j, j + 1)
        console.count('交换次数')
        console.log(`交换 ${array[j + 1]} 和 ${array[j]} 后: ${array}`)
      }
    }
    console.log(`外循环: 无序数组中最大值: ${array[length - i - 1]} 被放到有序数组的开头。数组后 ${i+1} 位有序: ${array}`)
  }
  console.timeEnd(`time`)
  return array
}


// 选择排序的算法实现 O(n²)
function selectActionSort(array: number[], compareFn = defaultCompare) {
  console.time('time')
  console.log(`原数组: ${array}`)
  const { length } = array
  let indexMin
  // 外循环，n 条数据，循环 n-1 次。因为每次循环都会把 无序部分 的*最*小值放到数组开头组成有序部分
  // 当 n-1 次后，前 n-1 个数据有序，剩下的最后一个数据也是有序的
  for(let i = 0; i < length - 1; i++ ) {
    // 假设 无序部分 的第一条数据为 无序部分 的最小值
    indexMin = i
    console.log(`假定无序数组第一位: ${array[i]} 为当前无序数组中最小值`)
    // 内循环，每次内循环过后都会有一条数据放到最终位置
    // 所以第 n 次内循环时，前 n-1 项是有序的，不需要参与对比
    for(let j = i + 1; j < length; j++) {
      console.count('对比次数')
      if(compareFn(array[indexMin], array[j]) === compareResult.BIGGER) {
        indexMin = j
        console.log(`内循环: ${array[indexMin]} 是当前较小值`)
      }
    }
    // 将无序部分的最小值放到有序部分的结尾
    if(indexMin !== i) {
      swap(array, i, indexMin)
      console.count('交换次数')
    }
    console.log(`外循环: ${array[i]} 是无序数组中的最小值,放到有序数组第 ${i+1} 位。前 ${i + 1} 位数据是有序的: ${array}`)
  }
  console.timeEnd('time')
  return array
}

// 插入排序的算法实现 O(n²)
function insertSort(array: number[], compareFn = defaultCompare) {
  console.time('time')
  console.log(`原数组: ${array}`)
  const { length } = array
  // 认为第一个值就是有序的，所以从第二个值开始循环比较
  for(let i = 1; i < length; i++) {
    // 使用变量接收待比较值的索引
    let j = i
    // 这一轮需要被比较的值
    const temp = array[i]
    // j 会一直递减
    // 只要有一次前面的数值不大于 temp 就可以退出循环了，因为前面的数组已经是有序的
    while(j > 0 && compareFn(array[j - 1], temp) === compareResult.BIGGER) {
      // 如果 j-1 位置的值大于 temp, 则将 j-1 的值后移一位(j-1 前面的位置就空出来了)
      // 这个空出来的位置有两种情况 
      // 1. 下一次循环的值不大于 temp 了，这个位置就是给 temp 留的
      // 2. 下一次循环的位置还大于 temp, 则下一次循环的值占用这次空出来的位置~
      // ~下一次循环值的位置又空出来了......直到碰到情况 1.
      array[j] = array[j - 1]
      console.log(`内循环: ${array[j-1]} 被后移: ${array}`);
      console.count('移位次数')
      j--
    }
    // 两种情况
    // 1. while 语句没有执行过，就是将原数据放回原处
    // 2. while 语句有执行过，就是把 temp 放到空出来的位置上
    array[j] = temp
    console.log(`外循环: ${temp} 被放到有序数组中: ${array}`)
    console.count('赋值次数')
  }
  console.timeEnd('time')
  return array
}

// 归并排序的算法实现 O(nlog(n))
// 使用分治的思想，使用递归方式
function mergeSort(array: number[], compareFn = defaultCompare){
  const { length } = array
  length > 1 ? console.log(`需要被拆分的数组: ${array}`) : console.log(`${array} 数组中只有一位数，不需要再拆除`)
  console.trace()
  if(array.length > 1) {
    const middle: number = Math.floor(length / 2)
    const left: number[] = mergeSort(array.slice(0, middle), compareFn)
    const right: number[] = mergeSort(array.slice(middle, length), compareFn)
    console.log(`准备将left: ${left} 和 right: ${right} 进行合并`)
    array = merge(left, right, compareFn)
  }
  return array
}

// 在归并的过程中进行排序
function merge(left: number[], right: number[], compareFn = defaultCompare) {
  let i: number = 0
  let j: number = 0
  const result:number[] = []
  // 对比时需要保证两个数据的下标值都没有超
  while(i < left.length && j < right.length) {
    // cResult nResult 只用于打印调试信息，和程序执行无关
    const cResult: boolean = compareFn(left[i], right[j]) === compareResult.SMALLER
    const nResult: number = cResult ? left[i] : right[j]
    result.push(compareFn(left[i], right[j]) === compareResult.SMALLER ? left[i++] : right[j++])
    console.log(`合并: 将对比时较小的数 ${nResult} 放到数组中: ${result}`)
  }
  console.trace()
  console.log(`将较长数组中未对比元素直接插入数组中: ${result.concat(i < left.length ? left.slice(i) : right.slice(j))}`)
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

mergeSort([8,4,9,5,2,6,3,1])


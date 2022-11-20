/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-11-20 22:50:39
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\queue\queue.js
 * @Description: 基于对象来创建一个队列的数据结构
 */
class Queue{
  constructor() {
    // 记录队尾元素的下标值
    this.count = 0
    // 记录队头元素的下标值
    this.lowestCount = 0
    // 存储数据
    this.items = {}
  }

  // 向队列的队尾添加元素
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  // 在队列的队头删除数据
  dequeue() {
    // 队列为空，返回undefined
    if(this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.count.lowestCount++
    return result
  }

  // 查看队列的队头元素(不改变队列)
  peek() {
    // 若队列为空，返回 undefined
    if(this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  // 判断队列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0
  }

  // 查看队列的尺寸
  size() {
    return this.count - this.lowestCount
  }

  // 清除队列
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  // 输出队列中的元素
  toString() {
    if(this.isEmpty()) {
      return ""
    }
    let objString = `${this.items[this.lowestCount]}`
    for(let i = this.lowestCount + 1; i< this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
  }
 }
/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-11-27 21:22:32
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\queue\deque.js
 * @Description: 双端队列
 * 
 */
class Deque{
  constructor() {
    // 记录队尾结点下一个位置的下标值
    this.count = 0;
    // 记录队头结点下标值
    this.lowestCount = 0
    // 存储数据
    this.items = {}
  }

  // 在双端队列的前端添加新的元素
  addFront(element) {
    // 如果双端队列为空(队头队尾是同一个节点)
    if(this.isEmpty()) {
      this.addBack(element)
      // 队头结点大于零(可在队头直接插入)
    }else if(this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element
    }else {
      // 队头结点等于零(要想在队头插入就要把后面的结点依次后移一位)
      for(let i = this.count; i > 0; i--) {
        this.items[i] = this.items[ i - 1];
      }
      this.count++;
      this.items[this.lowestCount] = element
    }
    return this.items
  }

  // 在双端队列的后端添加新的元素
  addBack(element) {
    this.items[this.count] = element
    this.count++
    return this.items
  }

  // 在双端队列头部移除第一个元素
  removeFront() {
    // 队列为空，返回undefined
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  // 在双端队列后端移除一个元素
  removeBack() {
    // 如果队列为空的话，直接返回 undefined
    if (this.isEmpty()) {
      return undefined
    }
    // 如果队列不为空，先获取队列尾部的数据，然后在删除队列尾部的数据
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result

  }

  // 返回双端队列前端的第一个元素
  peekFront() {
    // 若队列为空，返回 undefined
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  // 返回双端队列后端的第一个元素
  peekBack() {
    // 如果队列为空的话，直接返回 undefined
    if (this.isEmpty()) {
      return undefined
    }
    // 返回队尾的数据
    return this.items[this.count - 1]
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
    return this.items
  }

  // 输出队列中的元素
  toString() {
    if (this.isEmpty()) {
      return ""
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}
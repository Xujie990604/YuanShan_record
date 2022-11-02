/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-11-01 15:36:37
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\stack\stackObj.js
 * @Description: 基于对象来创建一个栈的数据结构
 */
class Stack {
  constructor() {
    this.item = {}
    this.count = 0
  }

  // 用于向栈中插入单条数据
  push(element) {
    this.item[this.count] = element
    this.count++
  }

  // 验证当前的栈是否为空
  isEmpty() {
    return this.count === 0
  }

  // 从栈顶删除一个数据
  pop() {
    // 如果栈为空的话，直接返回 undefined
    if(this.isEmpty()) {
      return undefined
    }
    // 如果栈不为空，先获取栈顶的数据，然后在删除栈顶的数据
    this.count--
    const result = this.item[this.count]
    delete this.item[this.count]
    return result
  }
}

const stack = new Stack()
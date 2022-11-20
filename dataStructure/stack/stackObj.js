/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-11-01 15:36:37
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\stack\stackObj.js
 * @Description: 基于对象来创建一个栈的数据结构
 */
class Stack {
  constructor() {
    // 存储数据
    this.item = {}
    // 记录栈中数据条数
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

  // 查看栈顶的元素
  peek() {
     // 如果栈为空的话，直接返回 undefined
    if(this.isEmpty()) {
      return undefined
    }
    // 返回栈顶的数据
    return this.item[this.count - 1]
  }

  // 清除栈内元素
  clear() {
    this.item = {}
    this.count = 0
  }

  // 输出栈中的元素
  toString() {
    if (this.isEmpty()) {
      return '';
    } 
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const stack = new Stack()
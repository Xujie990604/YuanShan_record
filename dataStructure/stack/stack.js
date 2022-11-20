/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-10-27 17:26:11
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\stack\stack.js
 * @Description: 基于数组来创建一个栈数据结构
 */
/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-10-27 17:26:11
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\stack\stack.js
 * @Description: 基于数组来定义一个栈的数据结构
 */
class Stack {
  // 类的默认方法
  constructor() {
    this.item = []
  }

  // push 用于在栈顶添加一个或者几个元素
  push(...element) {
    this.item.push(...element)
  }

  // pop 用于从栈顶删除一个元素
  pop(){
    this.item.pop()
  }

  // peek 查看栈顶元素(不改变数据)
  peek() {
    return this.item[this.item.length - 1]
  }

  // isEmpty 查看栈是否为空(改成属性的形式)
  isEmpty() {
    return this.item.length === 0
  }

  // size 查看栈数据的长度
  size() {
    return this.item.length
  }

  // clear 清空栈元素
  clear() {
    this.item = []
  }
}

const stack = new Stack()
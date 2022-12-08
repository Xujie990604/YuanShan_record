/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-11-27 22:46:04
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\linkedList\linkLIst.js
 * @Description: 链表数据结构的实现方式
 */

// 用来对比两个结点是否一致
function defaultEquals(a, b) {
  return a === b
}

// 单链表中的结点定义类
class Node {
  constructor(element) {
    // 结点中的值
    this.element = element
    // 指针指向下一个结点
    this.next = undefined
  }
}

class LinkedList {
  // 使用了默认参数的形式，用户可自行传入对比函数(如果不传，则使用默认的)
  constructor(equals = defaultEquals) {
    this.count = 0 // 存储链表中的元素个数
    this.head = undefined  // 链表的头结点
    this.equalsFn = equals   // 类内部的方法，用来对比两个链结点是否一致
  }
  // 链表的尾部添加新数据
  push(element) {
    // 根据传入值生成新的结点
    const node  = new Node(element)
    let current;
    // 如果当前链表中没有结点，将传入结点设置为头结点
    if(this.head === undefined) {
      this.head = node
    }else {
      // 如果当前链表中有结点，那么需要通过遍历的方式找到最后一个结点
      current = this.head
      // 循环的执行，找到链表中的最后一个结点
      while(current.next !== undefined) {
        current = current.next
      }
      // 将最后一个结点的指针，指向新添加的元素
      current.next = node
    }
    // 添加结点成功后，将count加一
    this.count++
  }
}
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
    this.head = undefined  // 链表的头结点指针
    this.equalsFn = equals   // 类内部的方法，用来对比两个链结点是否一致
  }

  // 链表的长度
  get size() {
    return this.count
  }

  // 链表是否为空
  get isEmpty() {
    return this.size === 0
  }

  // 链表的头结点
  get Head() {
    return this.head
  }

  /**
   * @description: 找到链表中指定位置的结点
   * @param { number } index
   * @return { Node} 目标结点 | undefined
   */  
  getElementAt(index)  {
    if(index >= 0 && index <= this.count) {
      let current = this.head
      for(let i = 1; i <= index; i++) {
        current = current.next
      }
      return current
    }
    return undefined
  }

  /**
   * @description: 链表尾部添加新结点
   * @param {*} element 结点的值
   * @return { void }
   */  
  push(element) {
    // 根据传入值生成新的结点
    const node  = new Node(element)
    let current;
    // 如果当前链表中没有结点，将传入结点设置为头结点
    if(this.head === undefined) {
      this.head = node
    } else {
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

  /**
   * @description: 删除指定位置的结点
   * @param { number } index 
   * @return { * } 被删除结点的值 | undefined
   */  
  removeAt(index) {
    // 检查下标值是否越界
    if(index >= 0 && index < this.count) {
      let current = this.head
      if(index === 0) {
        this.head = current.next
      } else{
        // 指定被删除结点的前一个结点
        const previous = this.getElementAt(index - 1)
        // 指定被删除结点
        current = previous.next
        // 将被删除结点从链中删除
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  /**
   * @description: 在指定位置插入结点
   * @param {*} element 结点的值
   * @param {*} index 插入的位置
   * @return { Boolean } 是否插入成功 
   */  
  insert(element, index) {
    // 检查索引值是否越界
    if(index >= 0 && index <= this.count) {
      const node = new Node(element)
      // 插入位置为第一个
      if(index === 0 ) {
        const current = this.head
        node.next = current
        this.head = node
      }else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  /**
   * @description: 返回一个元素的位置
   * @param {*} element 元素的值
   * @return { number } 元素的索引值 | -1
   */  
  indexOf(element) {
    let current = this.head
    for(let i = 0; i < this.count && current !== null; i++) {
      if(this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  /**
   * @description: 从链表中移除指定数值的结点
   * @param {*} element 移除结点的值
   * @return {*} 被删除结点的值 | undefined
   */  
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  /**
   * @description: 将链表转化为字符串输出
   * @return { string } 用 , 分割数据
   */  
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next; 
    for (let i = 1; i < this.size && current !== null; i++) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

// 双向链表的结点
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    // 指针指向上一个结点
    this.prev = prev
  }
}

//双链表的实现
class DoubleLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    // 链表的尾结点指针
    this.tail = undefined
  }

  // 尾结点
  get Tail() {
  return this.tail
}

/**
 * @description: 在链表的末尾添加结点
 * @param {*} element 结点的值
 * @return {void}
 */
push(element) {
  const node = new DoublyNode(element);
  if (this.head == null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  this.count++;
}

/**
 * @description: 在双链表的指定位置插入一个结点
 * @param {*} element 结点的值
 * @param {*} index 插入的位置
 * @return {Boolean} 是否插入成功
 */
insert(element, index) {
  // 检查下标值是否合法
  if (index >= 0 && index <= this.count) {
    const node = new DoublyNode(element);
    let current = this.head;
    // 要在第一位插入结点
    if (index === 0) {
      // 如果链表的长度为零
      if (this.head == null) {
        this.head = node;
        this.tail = node;
      } else {
        // 链表的长度不为零
        node.next = this.head;
        current.prev = node;
        this.head = node;
      }
      // 如果要在链表的尾部进行插入
    } else if (index === this.count) {
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    } else {
      // 如果是在链表的中间插入
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    this.count++;
    return true;
  }
  return false;
}

/**
 * @description: 从链表的任意位置移除结点
 * @param {number} index 移除结点的下标值 
 * @return {DoubleNode | undefined} 被移除的结点
 */
removeAt(index) {
  if (index >= 0 && index < this.count) {
    let current = this.head;
    // 移除第一个结点
    if (index === 0) {
      this.head = current.next;
      // 如果只有一项，更新tail
      if (this.count === 1) {
        this.tail = undefined;
      } else {
        this.head.prev = undefined;
      }
      // 移除最后一项
    } else if (index === this.count - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {
      // 移除链表中间的结点
      current = this.getElementAt(index)
      const previous = current.prev
      // 将previous与current的下一项链接起来——跳过current
      previous.next = current.next
      current.next.prev = previous
    }
    this.count--;
    return current.element;
  }
  return undefined;
}

/**
 * @description: 查找指定结点的下标值
 * @param {*} element 结点的值
 * @return {number}
 */
indexOf(element) {
  let current = this.head;
  let index = 0;
  while (current != null) {
    if (this.equalsFn(element, current.element)) {
      return index;
    }
    index++;
    current = current.next;
  }
  return -1;
}

/**
 * @description: 清除双链表
 * @return {void}
 */
clear() {
  super.clear()
  this.tail = undefined
}

/**
 * @description: 字符串的形式输出所有结点
 * @return {string}
 */
toString() {
  if (this.head == null) {
    return '';
  }
  let objString = `${this.head.element}`;
  let current = this.head.next;
  while (current != null) {
    objString = `${objString},${current.element}`;
    current = current.next;
  }
  return objString;
}

/**
 * @description: 字符串的形式反向输出所有结点
 * @return {string}
 */
inverseToString() {
  if (this.tail == null) {
    return '';
  }
  let objString = `${this.tail.element}`;
  let previous = this.tail.prev;
  while (previous != null) {
    objString = `${objString},${previous.element}`;
    previous = previous.prev;
  }
  return objString;
  }
}

// 循环链表的定义
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  /**
   * @description: 在链表的尾部插入新结点
   * @param {*} element
   * @return {*}
   */  
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size - 1);
      current.next = node;
    }
    // 将尾部结点的指针指向头结点
    node.next = this.head;
    this.count++;
  }


  /**
   * @description: 在指定位置插入结点
   * @param {*} element 结点的值
   * @param {*} index 索引值
   * @return {boolean}
   */  
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      // 在链表开头插入结点
      if (index === 0) {
        // 链表为空
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size);
          this.head = node; 
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * @description: 在任意位置删除元素
   * @param {*} index
   * @return {*}
   */  
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size())
          this.head = this.head.next
          current.next = this.head
          current = removed;
        }
      } else {
        // 不需要修改循环链表最后一个元素
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element
    }
    return undefined;
  }
}
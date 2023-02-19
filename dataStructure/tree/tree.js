/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-15 14:35:21
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\tree\tree.js
 * @Description: 
 */

// 用来对比两个结点是否一致
function defaultEquals(a, b) {
  return a === b
}


// 树的键(键是树中描述节点的专属名词)数据实现
class Node {
  constructor(key) {
    // 存储结点中的值
    this.key = key;
    // 指针指向左子树
    this.left = null; 
    // 指针指向右子树
    this.right = null; 
  }
}


// 树的实现
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null; // 树的根节点
  }

  // 向树中插入结点
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  // 把结点插入正确的位置
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) { 
        node.left = new Node(key); //
      } else {
        this.insertNode(node.left, key); // {7}
      }
    } else {
      if (node.right == null) { // {8}
        node.right = new Node(key); // {9}
      } else {
        this.insertNode(node.right, key); // {10}
      }
    }
  }
}
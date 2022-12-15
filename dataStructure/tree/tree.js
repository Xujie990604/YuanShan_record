/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-15 14:35:21
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\tree\tree.js
 * @Description: 
 */

// 用来对比两个结点是否一致
function defaultEquals(a, b) {
  return a === b
}


// 树的键(键是树中描述节点的专属名词)数据实现
export class Node {
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
}
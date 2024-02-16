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

  // 把结点插入正确的位置(基于二叉排序树)
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
}
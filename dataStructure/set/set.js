/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-12 17:11:34
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\set\set.js
 * @Description: 
 */
class Set {
  constructor() {
    this.items = {}
  }


  // 集合中的数据个数
  get size() {
    return Object.keys(this.items).length
  }

  /**
   * @description: 集合中是否有该数据
   * @param {*} element 数据的值
   * @return {boolean}
   */  
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  /**
   * @description: 集合中添加数据
   * @param {*} element 数据的值
   * @return {boolean}
   */  
  add(element) { 
    if(!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  /**
   * @description: 删除集合中的指定数据
   * @param {*} element 数据的值
   * @return {boolean}
   */  
  delete(element) {
    if(this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  /**
   * @description: 所有集合的数据
   * @return { Array }
   */
  values() {
    return Object.values(this.items)
  }

  /**
   * @description: 清除集合中的数据
   * @return {void}
   */  
  clear() {
    this.items = {}
  }

  /**
   * @description: 集合的并集运算
   * @param { Set } otherSet 另一个集合
   * @return { Set } 新的集合
   */  
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  /**
   * @description: 集合的交集运算
   * @param { Set } otherSet 另一个集合
   * @return { Set } 新的集合
   */  
  intersection(otherSet) {
    const intersectionSet = new Set()
    const values = this.values()
    const otherValues = otherSet.values()
    let biggerSet = values
    let smallerSet = otherValues
    // 比较两个集合的数据量大小
    if (otherValues.length - values.length > 0){
      biggerSet = otherValues;
      smallerSet = values;
    }
    // 循环数据量较小的集合，能够减少执行次数
    smallerSet.forEach(value => { 
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  /**
   * @description: 集合和另一个集合的差集
   * @param { Set } otherSet
   * @return { Set } 新的集合
   */  
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) { 
        differenceSet.add(value); 
      }
    });
    return differenceSet;
  }

  /**
   * @description: 集合是否为另一个集合的子集
   * @param { Set } otherSet 另一个集合
   * @return { boolean }
   */  
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    // 用 every 不是 forEach 是因为只要碰到一个不属于，就可以直接退出函数，不必向下执行
    // forEach 中无法使用 break 来终止函数
    this.values().every(value => { 
      if (!otherSet.has(value)) { 
        isSubset = false; 
        return false;
      }
      return true; 
    });
    return isSubset
  }

}
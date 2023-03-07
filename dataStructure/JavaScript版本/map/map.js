/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-14 11:02:09
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\map\map.js
 * @Description: 
 */
/**
 * @description: 将字典的 key 转化为 String 类型的函数
 * @param {*} item 传入的 key 值
 * @return { string }
 */
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString()
}

// 字典的值使用类实现
class ValuePair {
  // 字典的值中不但包含 值 还包含 键
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

// 字典类的实现
class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {}
  }

  // 以数组的形式返回字典中的所有 ValuePair 对象
  get keyValues() {
    return Object.values(this.table);
  }

  // 以数组的形式返回字典中的所有键(返回的是键的原始形式)
  get keys() {
    return this.keyValues.map(valuePair => valuePair.key);
  }

  // 以数组形式返回字典中的所有值
  get values() {
    return this.keyValues.map(valuePair => valuePair.value);
  }

  // 字典数据的条数
  get size() {
    return Object.keys(this.table).length;
  }

  // 字典是否为空
  get isEmpty() {
    return this.size === 0;
  }

  /**
   * @description:检测一个 键 是否存在于字典中
   * @param {*} key 键名
   * @return {boolean}
   */  
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  /**
   * @description: 在字典中设置键和值
   * @param {*} key 键
   * @param {*} value 值
   * @return {boolean}
   */  
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
  }

  /**
   * @description: 从字典中移除一个值
   * @param {*} key 键
   * @return {boolean}
   */  
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  /**
   * @description: 在字典中检索某个键下的值
   * @param {*} key 键
   * @return { valuePair | undefined }
   */  
  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  /**
   * @description: 迭代字典中的每个值
   * @param {Function} callbackFn 回调函数
   * @return {*}
   */  
  forEach(callbackFn) {
    const valuePairs = this.keyValues;
    for (let i = 0; i < valuePairs.length; i++) { 
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      // 如果回调函数的返回值为 false 则会终止迭代
      if (result === false) {
        break
      }
    }
  }

  /**
   * @description: 清空字典
   * @return { void }
   */  
  clear() {
    this.table = {};
  }

  /**
   * @description: 字符串的形式输出字典中的值
   * @return {string}
   */  
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`
    }
    return objString;
  }
}

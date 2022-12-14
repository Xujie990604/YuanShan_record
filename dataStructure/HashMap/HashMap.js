

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

// 散列表的实现
class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  /**
  * @description: 散列函数
  * @param {*} key 键
  * @return {*} hash 值
  */
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    // 使用 hash 值和一个任意数做除法的余数 %
    // 这可以规避操作数超过数值变量最大表示范围的风险。
    return hash % 37;
  } 

  /**
   * @description: 将 key 值经过散列函数处理
   * @param {*} key 键
   * @return {*} hash 值
   */
  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  /**
   * @description: 将键和值加入散列表
   * @param {*} key 键
   * @param {*} value 值
   * @return { boolean }
   */  
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  /**
   * @description: 根据建名在散列表中查找一个值
   * @param {*} key 键
   * @return { ValuePair } 值
   */  
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  /**
   * @description: 从散列表中移除一个数据
   * @param {*} key 键
   * @return {*}
   */  
  remove(key) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair != null) {
      delete this.table[hash]
      return true;
    }
    return false;
  }
}
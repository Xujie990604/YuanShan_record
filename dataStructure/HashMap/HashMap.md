<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-14 15:12:19
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\HashMap\HashMap.md
 * @Description: 
-->
# 散列表(又名哈希表)

* !!! 由于JS根本无法操作内存地址。所以JS实现散列表的代码仅仅是用来解释原理。实现的不是真正的散列表。

* 散列算法: 尽可能快的在数据结构中获取一个值
* 散列函数: 是给定一个键值(key)，然后返回数值(value)在表中的地址
* JavaScript语言内部就是使用散列表来表示每个对象。此时，对象的每个属性和方法（成员）被存储为key对象类型，每个key指向对应的对象成员
  
## 特点

* 在普通字典中是把键转化成 string 之后当做 键
* 在散列表中是把键通过散列函数转化为 hash 之后，当做键

## 冲突

* 根据键生成 hash 的过程中可能会发生冲突(多个键值对应同一个hash值)
* 所以需要使用一些方法来解决 hash 冲突

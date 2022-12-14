<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-14 15:12:19
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\HashMap\HashMap.md
 * @Description: 
-->
# 散列表(又名哈希表)

* 散列算法: 尽可能快的在数据结构中获取一个值(尽快是不是指的键就是在内存中的地址，所以不用从头迭代数据直接通过地址访问数据？但是表中存储数据不是不连续吗？有办法通过首地址加hash值的方式找到吗？)
* 散列函数: 是给定一个键值，然后返回值在表中的地址
* JavaScript语言内部就是使用散列表来表示每个对象。此时，对象的每个属性和方法（成员）被存储为key对象类型，每个key指向对应的对象成员???
  
## 特点

* 在普通字典中是把键转化成 string 之后当做 键
* 在散列表中是把键通过散列函数转化为 hash 之后，当做键

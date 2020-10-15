# Vue的响应式数据

## 数组更新检测

* push()pop()shift()unshift()splice()sort()reverse()称为变更方法，会触发视图更新
* filter(),concat(),slice()非变更方法，并不会丢弃原数组重新进行渲染
* 通过索引来直接修改数组中的数据也是非响应式的
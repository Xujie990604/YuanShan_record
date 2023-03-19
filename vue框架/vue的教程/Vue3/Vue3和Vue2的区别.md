<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-11 00:09:11
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\vue的教程\Vue3\Vue3和Vue2的区别.md
 * @Description: 
-->
# 对比

1. Vue3 支持碎片，一个单文件组件里在 Vue2 中只能有一个根元素，在 Vue3 中可以有多个根元素
2. v-if 和 v-for 连用时，Vue2 中 v-for 优先级别高，Vue3 中 v-if 优先级别高

## 响应式原理对比

* Vue3 使用 proxy 来代理对象

## 书写方式对比

* Vue3 支持两种代码组合方式，选项式和组合式

## 组合式 api 的优点

1. 同一业务的代码放到一起，在文件较大时代码的结构会更清楚
2. 在后期需要业务的拆分时更加的方便
3. 能够更好的搭配 TS 进行使用

### mixin 的缺点

1. 不清楚数据的来源
2. 命名空间冲突
3. 多个 mixin 需要交流时存在问题(多个组合式写法需要交流时只需要像函数传参一样调用就可以了)

## 生命周期

* 除了 created 和 beforeCreate 被 setup 代替之外，挂载，更新，卸载，激活四个阶段的钩子函数和之前一致

## Vue3的一些优化

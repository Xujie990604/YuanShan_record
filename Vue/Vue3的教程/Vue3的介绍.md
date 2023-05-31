# Vue3 的介绍

## Vue 的两个核心功能

- 声明式渲染: Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
- 响应性: Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

## 单文件组件

- 我们可以使用一种类型 HTML 的格式来书写 Vue 组件
- 单文件组件(.vue 文件)英文缩写 SFC
- 单文件组件中会有一个组件的逻辑，模板，样式

## 动态绑定多个值

```js
// 这是一个包含多个 attribute 的 js 对象
const objAttrs = {
  id: 'app',
  class: 'content'
}
// 可以通过不带参数的 v-bind 将 objAttrs 绑定到单个元素上
<div v-bind="objAttrs"></div>
```

## JS 表达式

- 在 Vue 中 js 表达式可以被使用在以下场景中

1. 在文本插值中
2. 在任何 Vue 指令(以 v-开头的 attribute)attribute 的值中

```js
{{ OK ? 'YES': "NO" }}
<div :id="`list-${id}`"></div>
```

## 模板中受限的全局访问

- 模板中的表达式将被沙盒化，仅能访问到受限的全局对象，比如 Math Date
- 例如用户添加在 window 上的属性并不能直接在模板中使用，除非使用 app.config.globalProperties 显式的添加它们

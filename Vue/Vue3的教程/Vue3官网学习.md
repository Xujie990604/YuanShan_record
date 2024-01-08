# Vue3

## typescript 相关

- Volar 和 Vscode 都会开启服务来支持 TS 语法, 在大型项目中可能存在性能问题，可以进行优化
- `<template>` 中也会支持 TS 语法

## script setup

- 能够使用纯 TypeScript 声明 props 和自定义事件。
- `<script setup>` 里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在 `每次组件实例被创建` 的时候执行
- 当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，`以及 import 导入的内容`) 都能在模板中直接使用(因为 `<template>` 会被编译成在 `setup()` 函数体内的渲染函数)
- 组件使用前不需要注册，导入后就可以直接使用
- defineProps() 和 defineEmits():为了在声明 props 和 emits 选项时获得完整的类型推导支持，我们可以使用 defineProps 和 defineEmits API，它们将自动地在 `<script setup>` 中可用
- `<script setup>` 中可以使用顶层 await。结果代码会被编译成 `async setup()`

## 依赖注入与全局属性

- Vue3 中的全局属性仅作为对于 Vue2 中的 Vue.prototype 的兼容，只推荐在 Vue3 的选项式 API 写法中使用
- Vue3 的组合式 API 写法只能在`模板`中访问到全局属性，无法在 `<script>` 中访问全局属性，因此十分不推荐在 Vue3 + 组合式 API 的写法中使用全局属性，而是全面使用`依赖注入`来代替

## 自定义指令

- 自定义指令主要是为了`重用涉及普通元素的底层 DOM 访问的逻辑`。

## 组合式函数

- 组合式函数(Composables) 是一个利用 Vue 的组合式 API 来封装和复用`有状态逻辑`的函数。
- 推荐在组合式函数中使用 ref 而不是 reactive, 因为 reactive 会在解构的时候失去响应式

## 插件

1. 通过 `app.component()` 和 `app.directive()` 注册一到多个全局组件或自定义指令。
2. 通过 `app.provide()` 使一个资源可被注入进整个应用。
3. 向 `app.config.globalProperties` 中添加一些全局实例属性或方法

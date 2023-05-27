# Vue3

## typescript 相关

- Volar 和 Vscode 都会开启服务来支持 TS 语法, 在大型项目中可能存在性能问题，可以进行优化
- `<template>` 中也会支持 TS 语法

## script setup

- 能够使用纯 TypeScript 声明 props 和自定义事件。
- `<script setup>` 里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在 `每次组件实例被创建` 的时候执行
- 当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，`以及 import 导入的内容`) 都能在模板中直接使用(因为 `<template>` 会被编译成和 `setup()` 同一作用域内的渲染函数)
- 组件使用前不需要注册，导入后就可以直接使用
- defineProps() 和 defineEmits():为了在声明 props 和 emits 选项时获得完整的类型推导支持，我们可以使用 defineProps 和 defineEmits API，它们将自动地在 `<script setup>` 中可用
- `<script setup>` 中可以使用顶层 await。结果代码会被编译成 `async setup()`

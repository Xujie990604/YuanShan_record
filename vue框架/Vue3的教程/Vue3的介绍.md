# Vue3 的介绍

## Vue 的两个核心功能

- 声明式渲染: Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
- 响应性: Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

## 单文件组件

- 我们可以使用一种类型 HTML 的格式来书写 Vue 组件
- 单文件组件(.vue 文件)英文缩写 SFC
- 单文件组件中会有一个组件的逻辑，模板，样式

## setup

- `<script setup>` 中 `导入的变量` 和 `顶层变量/函数` 都能在模板中直接使用
- 是因为 `<template>` 最后会被编译成一个内联的函数放在 setup 函数中，所以 `<template>` 中可以直接使用 setup 作用域中的函数/变量

## 应用实例

- Vue3 允许创建多个应用实例，每个应用拥有自己的配置和全局资源

```js
app.use(router);
// app 应用实例的 config 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，它将捕获所有由子组件上抛出而未被处理的错误
app.config.errorHandler = (err) => {
  //  处理错误
};
// 使用 component 来注册应用范围内的可用资源
app.component("toDoListButton", toDoListButton);
```

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

- 模板中的表达式将被沙盒化，仅能访问到受限的全局对象，比如 Math
- 例如用户添加在 window 上的属性并不能直接在模板中使用，除非使用 app.config.globalProperties 显式的添加它们

## 响应式数据

- Vue 能够跟踪对响应式对象属性的访问与更改操作(对 Proxy 的更改和访问会被 Vue 跟踪到， 对 raw 的更改和访问不会被 Vue 跟踪到)
- 在 Vue3 中，状态都是默认深层响应式的

```js
// reactive() 返回的是一个原始对象的 Proxy
// 在 Vue 中仅仅使用你声明的对象的代理版本(也就是只使用 proxy 而不要使用 raw)
const raw = {};
const proxy = reactive(raw);
// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

```js
const proxy = reactive({});
const raw = {};
proxy.nested = raw;
// 因为 proxy 是深层响应式的
// 因此将普通变量 raw 赋值给一个响应式对象的属性时，这个属性也是响应式的
console.log(proxy.nested === raw); // false
```

### reactive()

- 仅对对象类型有效(对象，数组，Set，Map)等。(string, number, boolean)等类型无效
- Proxy 是基于属性的访问进行响应式跟踪的。所以只能对引用类型进行跟踪。
- 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地"替换"一个响应式对象，因为这将导致对初始引用的响应性连接丢失
- 为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身。
- 响应式对象的属性被赋值，解构至本地，或者当做函数的参数传递时会失去响应式(!!!仅当属性为非引用类型值的时候)(本质上就是只有被 proxy 代理的堆内存中的数据才具有响应式)

### ref()

- reactive()不能为 string, number, boolean 类型声明响应式，是因为 js 中没有给这三种值引用数据类型
- ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象(将一个基本类型的值变成引用类型的值之后，就可以把这个属性赋值，解构，或者是当做函数的参数传递了)

#### 解包

- 当 ref 在模板中作为顶层属性(如果一个属性并不是顶层属性，可以使用解构的方式解出来)被访问时，它们会被自动"解包"，所以不需要使用 .value(若只是想展示数据那么无论是不是顶层对象都不需要.value, 只是说在{{}}语法中想把属性当做表达式计算时，只有顶层属性不需要加 .value)
- 当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样(不需要使用 .value 来取值)
- 当 ref 被嵌套在响应式数组中时，不会被解包

## 计算属性

- 计算属性的返回值是一个 ref (注意使用时 .value)
- 计算属性可以使用解构

## 生命周期

- 所有生命周期的 API 都应该在组件的 `setup()` 阶段被 `同步` 调用
- 除了 created 和 beforeCreate 被 `setup` 代替之外，挂载，更新，卸载，激活四个阶段的钩子函数和之前一致

## watch

- 不能直接通过 obj.key 拿响应式对象上的属性，必须使用 get 函数 () => obj.key
- watchEffect，不需要手动的指定监听源，会 `自动跟踪` 回调函数中的 `响应式数据`, 这在有多个依赖源时十分有用

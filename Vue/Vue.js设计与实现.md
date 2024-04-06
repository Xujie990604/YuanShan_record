# Vue 设计与实现

## 一、Tree-shaking

- tree-shaking(树摇)：移除 JavaScript 上下文中的未引用代码 (dead-code)
- 依赖于 ES2015 的模块语法. 模块的导入（import）和导出（export）语句必须是静态的，也就是说，导入和导出的内容在编译时就能确定，而不是在运行时。这样工具链才能分析出哪些模块或哪些导出是实际被使用的。

### 1.1 ESM 规范

```js
// 1. 只能作为模块的顶层语句出现
let bol = true
if(bol) {
  import ...  // 报错
  export ...  // 报错
}

// 2. import 的模块名只能是字符串常量
let str = './moduleA.js';
import A from str;    // 报错
```

### 1.2 tree-shaking 演示

- 没有使用到的 add() 函数在打包产物中被剔除
- 没有引入的模块不会在打包产物中出现

```js
// 使用 rollup 工具进行代码示例
// utils.js
export function add(a, b) {
  return a + b;
}
export function read() {
  obj && obj.name;
}

// format.js
export function format(str) {
  return str.toUpperCase();
}

// input.js
import { read } from "./utils.js";
const object = {
  name: "foo",
};
read(object);

// 生成文件
function read() {
  obj && obj.name;
}
read();
```

### 1.3 副作用

- 如果一个函数调用会产生副作用，那么就不能将以移除。
- read() 虽然目前看起来没有产生副作用，但是在静态分析阶段识别哪些代码是 dead code 的很有难度(假如 obj 是通过 Proxy 创建的代理对象)，只有在运行阶段才能确定
- 使用 `/*#__PURE__*/` 来声明是无副作用的
-

```js
// input.js
import { read } from "./utils.js";
const object = {
  name: "foo",
};
/*#__PURE__*/ read(object); // 打包产物中不会包含 read() 函数的定义和使用
```

### 1.4 import()

TODO：使用 import() 之后如何保证 tree-shaking 的正常运行，自己搭建 webpack 来实现代码示例

## 二、声明式 UI

- Vue 常见方案使用了接近于原生 HTML 的方式来声明式的描述 UI
- Vue 也支持使用 h 函数来声明式的描述 UI
- 不仅是元素，就连事件也能声明式的描述
  TODO: 学习 React 的 jsx 声明式描述 UI 的方式，是否会比 template 的方式更加灵活(例如想要 h1~h6 的话，直接定义一个变量(1-6)。但是 template 就只能使用 6 个 v-if)

```js
// 1. Vue 的 template 语法来描述 UI
<template>
  <h1 @click="handler">
    <span>Hello</span>
  </h1>
</template>

// 2. Vue 的 render 语法来描述 UI
import { h } from 'vue'
export default {
  render() {
    return h('h1', {
        onClick: this.handler,
        children:[
          {
            h('span', 'Hello')
          }
        ]
      }
    )
  }
}

// 2. React 的 jsx 语法 来描述 UI， 用 js 对象来描述 UI 更加灵活
TODO: h1 标签可能是 h2 h3 h4 h5 h6， 这个需要根据变量来动态渲染
```

## 三、渲染器

- 渲染器把虚拟 DOM 转化为真实 DOM
- 渲染器的精髓都在更新节点的阶段

## 四、编译器

- 编译器用来把 Template 编译成 Render 函数

### 4.1 组件的本质

> 组件就是一组 DOM 元素的封装

```js
// 使用函数来代表组件(Render 函数)，函数的返回值(虚拟 DOM)就是要渲染的内容
const MyComponent = function () {
  return {
    tag: "h1",
    props: {
      onClick: () => handler,
    },
    children: [
      {
        tag: "span",
        children: "Hello",
      },
    ],
  };
};
```

# Vue 组件的基础

- 所有的 Vue 组件都是 Vue 实例, 全部都接受相同的选项对象(根实例独有的 el 特性除外)

## 组件和根实例的区别是实例拥有 el 选项

### Vue.extend()

```js
// 使用 Vue.extend(options) 生成的不是一个组件实例，而是一个构造器(带有一部分预设参数的 构造函数)
// Myself ==  ƒ VueComponent(options) {this._init(options);}
const Myself = Vue.extend({
  template: "<p>使用Vue.extend()创建的组件</p>",
  data() {
    return {};
  },
});
const mySelfComponent = new Myself();

// 使用 new 来执行构造函数，mySelfComponent 的值是一个 Vue 对象
// mySelfComponent == VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}

// 需要使用 $mount() 方法来把这个组件挂载到 DOM 节点上
// 或者使用 Vue.component() 来把这个组件注册为全局组件
new Myself().$mount("#my-self");
```

### 全局注册(router-link 组件就是 router 自动注册的全局组件，我们不需要在当前组件中 import 就可以使用)

- 对于一些使用频率很高，但是逻辑非常少的组件，我们可以在 main.js 中全局注册组件(在 new Vue({...})之前)
- Vue.component 的作用仅是用来注册(把一个 Vue 实例赋给一个名字，或者挂载到 DOM 上)。Vue.component 内部默认调用了 Vue.extend 方法来生成 Vue 实例。

```js
// 在 main.js 中定义全局组件，然后在整个项目中都可以直接使用这个组件
import GlobalButton from "./GlobalButton.vue";
Vue.component("global-button", GlobalButton);

// 通过 options 参数的方式来注册全局组件。
// 其实 Vue.component 内部默认调用了 Vue.extend 方法
Vue.component("myself-component", {
  data() {
    return {
      name: "自定义的全局组件",
    };
  },
  template: "<div>{{name}}</div>",
});
```

### 局部注册

```js
import TestViewPageVue from "./TestViewPage.vue";
// 通过 import 导入的 TestViewPageVue 本质上就是一个对象
// Vue 会在导出 .vue 文件的时候将 template 模板编译为 render 函数，放到 TestViewPageVue 对象中
console.log(TestViewPageVue);
export default {
  // 在一个组件的 components 属性中定义的组件就是一个局部组件
  // 在这里也是默认调用了一次 Vue.extend()
  components: { TestViewPage },
  name: "TestView",
  data() {
    return {};
  },
};
```

## 插槽

- 为了让组件更加的具有扩展性。
- 普通插槽如果想要使用变量的话，只能使用父级模板里面的内容。不能使用子模板里面的内容
- 后备内容：直接在子组件的插槽(slot)标签里面放置内容。如果父级没有传内容过来，默认显示，如果父级有东西传入，显示父级传入的内容。
- 插槽的具体作用就是替换，直接使用组件内的内容替换定义的插槽的标签，所以就导致一些问题，不要再 slot 插槽标签上使用一些语句(v-if :class={...})，尽量在 slot 外面添加一层 div 用于处理业务逻辑。

### 具名插槽

```html
// 在子组件中使用 slot 元素 搭配 name 属性来定义一个具名插槽
<slot name="header"></slot>
// 在父组件中使用 template 搭配 v-slot 指令替换指定的某一个插槽 // v-slot
指令的语法糖为 # (和 v-bind
等其他指令一样，只有在有参数的时候才可以使用语法糖的形式)
<template v-slot:header> ...... </template>
```

- 如果只有一个插槽，其实这个插槽是有一个默认的名字的：default(记住这个名字在使用作用域插槽时很重要)

### 作用域插槽

- 在父组件的作用域内获取子组件的变量的值，用来插槽中。
- 过程其实和父子组件用 props 传值类似，只不过作用域插槽是从子组件往父组件传。

```html
<!-- 子组件中定义名字为 header 的具名插槽，并且传递数据 data 给父组件 -->
<slot :data="data" name="header"></slot>
<!-- 父组件中引入子组件 -->
<app-model>
  <!-- 表示将 header 具名插槽中传递过来的数据，命名为slotData进行使用 -->
  <template v-slot:header="slotData">
    <span>{{slotData.data}}</span>
  </template>
</app-model>
```

## 动态组件

- 动态切换组件的时候，可以使用 `<keep-alive>` 组件来保留动态组件的状态(和路由切换保留状态类似)

### attribute 和 property 的区别

- attribute 是元素标签的属性，property 是元素对象的属性

```js
// input 的 value attribute 是通过标签里的 value='test value'定义的，可以通过input.getAttribute('value') 获取，可以通过 input.setAttribute('value', 'new Value') 更新
// input 的 value property 可通过 input.value 获取和更新，初始值是与 attribute 中的赋值一致的
<input id="input" value="test value">
<script>
  let input = document.getElementById('input');
  console.log(input.getAttribute('value')); // test value
  console.log(input.value); // test value
</script>
```

### 异步组件

```js
// 注册全局异步组件
Vue.component('async-component', () => import('./my-async-component'))
// 注册局部异步组件
components: {
    'async-component': () => import('./AsyncComponent.vue')
  }
```

```js
// 会渲染出哪个组件，由 currentTabComponent 动态决定
<component v-bind:is="currentTabComponent"></component>
```

## 解析 DOM 模板时注意事项

```html
<ul>
  <li
    is="todo-item"
    v-for="(todo, index) in todos"
    v-bind:key="todo.id"
    v-bind:title="todo.title"
  ></li>
</ul>
```

- 这个 is attribute 是十分必要的，is attribute 的作用是将 li DOM 结构变成 todo-item 组件来加载。
- 不直接将 todo-item 组件 写在 ul 中，是因为 ul 中只能包含 li。否则浏览器 DOM 解析时会报错。(Vue 的模板加载策略是先按照 html 语法来解析模板，然后再用 Vue 来解析 Vue 使用到的语法)

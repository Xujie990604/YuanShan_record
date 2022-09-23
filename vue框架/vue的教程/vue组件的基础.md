<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2022-09-23 17:25:50
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\vue组件的基础.md
 * @Description: Vue组件基础
-->
# Vue组件的基础

* 所有的Vue组件都是Vue实例,全部都接受相同的选项对象(根实例独有的el特性除外)

## 组件和根实例的区别是实例拥有el选项

### Vue.extend()

```js
// 使用 Vue.extend() 生成的不是一个组件实例，而是一个构造器
const Myself = Vue.extend({
  template: '<p>使用Vue.extend()创建的组件</p>',
  data() {
    return {}
  }
})
// 需要使用 $mount() 方法来把这个组件挂载到 DOM 节点上
new Myself().$mount('#my-self')
```

### 全局注册(router-link组件就是router自动注册的全局组件，我们不需要在当前组件中import就可以使用)

* 对于一些使用频率很高，但是逻辑非常少的组件，我们可以在main.js中全局注册组件(在new Vue({...})之前)

```js
// 在main.js中定义全局组件，然后在整个项目中都可以直接使用这个组件
import GlobalButton from './GlobalButton.vue';
Vue.component('global-button', GlobalButton)
// 通过 options 参数的方式来注册全局组件。
// 其实 Vue.component 内部默认调用 Vue.extend
Vue.component('myself-component', {
  data() {
    return {
      name: '自定义的全局组件'
    }
  },
  template: '<div>{{name}}</div>'
})
```

### 局部注册

* 在使用webpack的情况下，我们通过 xxx.vue 文件形式定义的组件都是 局部组件

## 组件的data必须是一个函数

* 每使用一个组件，就会有一个新的实例被创建,因此每个实例都可以维护一份被返回对象独立的拷贝
* 否则就会影响到其他的复用组件的实例

## 插槽

* 为了让组件更加的具有扩展性。
* 普通插槽如果想要使用变量的话，只能使用父级模板里面的内容。不能使用子模板里面的内容
* 后备内容：直接在子组件的插槽(slot)标签里面放置内容。如果父级没有传内容过来，默认显示，如果父级有东西传入，显示父级传入的内容。
* 插槽的具体作用就是替换，直接使用组件内的内容替换定义的插槽的标签，所以就导致一些问题，不要再slot插槽标签上使用一些语句(v-if :class={...})，尽量在slot外面添加一层div用于处理业务逻辑。

### 具名插槽

```html
// 在子组件中使用 slot 元素 搭配 name 属性来定义一个具名插槽
<slot name="header"></slot>
// 在父组件中使用 template 搭配 v-slot 指令替换指定的某一个插槽
// v-slot 指令的语法糖为 # (和 v-bind 等其他指令一样，只有在有参数的时候才可以使用语法糖的形式)
<template v-slot:header>
  ......
</template>
```

* 如果只有一个插槽，其实这个插槽是有一个默认的名字的：default(记住这个名字在使用作用域插槽时很重要)

### 作用域插槽

* 在父组件的作用域内获取子组件的变量的值，用来插槽中。
* 过程其实和父子组件用 props 传值类似，只不过作用域插槽是从子组件往父组件传。

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

* 动态切换组件的时候，可以使用 `<keep-alive>` 组件来保留动态组件的状态(和路由切换保留状态类似)

### attribute 和 property的区别

* attribute 是元素标签的属性，property 是元素对象的属性

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

## 解析DOM模板时注意事项

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

* 这个 is attribute 是十分必要的，is attribute 的作用是将li DOM 结构变成 todo-item 组件来加载。
* 不直接将 todo-item 组件 写在 ul 中，是因为 ul 中只能包含 li。否则浏览器 DOM 解析时会报错。(Vue的模板加载策略是先按照html语法来解析模板，然后再用Vue来解析Vue使用到的语法)

## 将一个组价内的函数当做变量传递给另一个组件

* 在子组件内执行函数时，函数中的this指向的是父组件。也就是说函数中涉及到的一些变量都是父组件中的变量

```html
<template>
  <div class="test-view">
    <!-- 传递给子组件 -->
    <test-home-page :data="list"></test-home-page>
  </div>
</template>
<script>
import TestHomePage from '@/components/testPages/TestHomePage.vue';
export default {
  data() {
    return {
      list: [
        {
          name: 'xujie',
          callback: this.onclick
        }
      ],
      arr: 'test'
    }
  },
  methods: {
    onclick() {
      console.log(this.arr)
    }
  },
};
```

<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2022-07-13 10:43:18
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\Vue组件的基础.md
 * @Description: Vue组件基础
-->
# Vue组件的基础

* 所有的Vue组件都是Vue实例,全部都接受相同的选项对象(根实例独有的el特性除外)

## 组价和根实例的区别是实例拥有el选项

### 全局注册(router-link组件就是router自动注册的全局组件，我们不需要在当前组件中import就可以使用)

### 局部注册

* 在使用webpack的情况下，我们通过 xxx.vue 文件形式定义的组件都是 局部组件

## 组件的data必须是一个函数

* 每使用一个组件，就会有一个新的实例被创建,因此每个实例都可以维护一份被返回对象独立的拷贝
* 否则就会影响到其他的复用组件的实例

## 插槽

* 为了让组件更加的具有扩展性。
* 普通插槽如果想要使用变量的话，只能使用父级模板里面的内容。不能使用子模板里面的内容
* 后备内容：直接在子组件的插槽(slot)标签里面放置内容。如果父级没有传内容过来，默认显示，如果父级有东西传入，显示父级传入的内容。

### 具名插槽

* 在子组件的slot标签上添加name特性
* 在父组件调用子组价时的标签上添加slot特性。

### 插槽的替换

* 插槽的具体作用就是替换，直接使用组件内的内容替换定义的插槽的标签，所以就导致一些问题，不要再slot插槽标签上使用一些语句(v-if :class={...})，尽量在slot外面添加一层div用于处理业务逻辑。

### 作用域插槽

* 在父组件的作用域内获取子组件的变量的值，用来插槽中。

```html
// 子组件中定义插槽(插槽中有默认内容)(插槽中还有用于辨识的name属性)，并且传递数据给父组件
<slot :data="name" name="app-m">子组件默认内容</slot>
<!-- 父组件中引入子组件，并且使用template中的slot-scope属性来得到子组件传过来的数据 -->
<app-model>
    <template slot-scope="slot" slot="app-m">
        <span>{{slot.data}}</span>
    </template>
</app-model>
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
* 不直接将 todo-item组件 写在ul中，是因为ul中只能包含li。否则浏览器DOM解析时会报错。(Vue的模板加载策略是先按照html语法来解析模板，然后再用Vue来解析Vue使用到的语法)
# Vue的知识点

## npm的区别

* npm install X 不会修改package.json 以后运行npm install时，不会自动安装
* npm install X --save 修改package.json文件 以后运行 npm install 会自动安装
production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中 安装到生成环境 vue react
* npm install X --save-dev 修改package.json文件 以后运行 npm install 会自动安装
production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中 安装到开发环境 例如gulp babel webpack等辅助工具

## npm install 和 Vue add 的区别

* Vue add 安装时(好像和创建Vue项目时选择的插件一样，自动创建目录引用，并且直接可以全局使用(可能也是添加到了Vue函数的原型上))Vue cli脚手架会自动生成目录来存放你安装的东西(例如axios)然后就可以直接在组件中用axios来使用axios方法
* npm install 安装时不会自动创建目录，不能直接全局使用 需要自己手动引入 并且需要自己手动给Vue函数的原型上设置属性才能全局引用 Vue.prototype.$axios = axios; 使用this.axios全局引用

## 生产环境和开发环境

* npm run serve 时开发环境 在本地的服务器上模拟启动
* npm run build 时为生成环境 生成打包好的文件，用来部署到服务器上。

## vuex的使用

* 如果使用了vuex提供的方法，就可以直接调用对应的方法，或者数据

  ```javascript
  import { mapActions } from "vuex";
  mapActions(["fetchTodos"]),
  created() {
    this.fetchTodos();
  }
  ```

* 如果没有使用vuex提供的方法就要使用this.$store.dispatch(调用action函数的时候),commit(调用mutation的时候)，getters(调用getters的时候)，state(调用state的时候，通常放在computed里面)

## 路由

* active-class属性用于给路由中给被选中的元素添加样式表

## 父子组件传值

* 如果子组件声明了，父组件却没有传值过来的话，值为undefined

## v-model的实现原理

```javascript
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
    // 父组件并没有给传value的值
      v-bind:value="value"
      // 是不是调动组件的地方会自动触发注册的input事件
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

// 组件调用的地方
<custom-input v-model="searchText"></custom-input>
```

## model模块

* 一个组件上的v-model会默认利用名为value的prop和名为input的事件，但是像单选框，复选框类型的输入控件会不同，所以引用model模块来规范
* v-model的值会传入名为value的prop值内，并且每触发一次input事件，v-model绑定的值都会被更新。

```javascript
Vue.component('base-checkbox', {
  model: {
    <!-- 使用model模块将默认的value指定为checked，input事件指定为change事件 -->
    prop: 'checked',
    event: 'change'
  },
  props: {
    <!-- checked必须要在 props中声明 -->
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      <!-- $event.target.checked是checked不是value -->
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
<base-checkbox v-model="lovingVue"></base-checkbox>
<!-- 这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的 property 将会被更新。 -->
```

## 其他知识点

* 用a来给router-link书写样式
* 只要修改了vue.config.js就要重启项目
* 切换路由并不会刷新页面。
* this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
* .prevent()拦截默认事件
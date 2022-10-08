# Vue的组件间的通信

## 父子组件数值传递(重点在于传递)

### 父传子

#### props 传递数据

* 如果子组件声明了，父组件却没有传值过来的话，值为undefined
* Vue 中采用的是单向数据流的形式。1.父组件中 prop 的更新会自动流入到子组件中 2.不推荐在子组件中修改父组件传过来的值。(无论是引用类型还是基本数据类型)
* 如果子组件想要在自己内部修改 prop 的值，可以使用 data 接收一下，然后进行修改
* 如果子组件就是想要改变父组件 Prop 的值，需要使用提交事件的方式

```js
// 父组件将本页面的name变量传递给自组件。子组件接受值的时候需要使用s-name的小驼峰版本sName接收
<view-first  :s-name="name" :s-message="message" ></view-first>

// 如果想把整个对象传递给子组件，下面这两种写法等价
<test-view-page v-bind="son"></test-view-page>
<test-view-page :name="son.name" :age="son.age" :height="son.height"></test-view-page>

son: {
  name: 'xujie',
  age: 18,
  height: 180
}
    
```

#### props的接收

```js
// 字符串数组方式
props: ['sName','sMessage'],
// 对象方式，可以设置传递的类型和默认值等
props: {
    sName: {
      type: String,
      default: 'a'
    },
    sMessage: {
      type: Number,
      default: 0
    }
  },
```

#### 父组件传值了，但是子组件没有在props中声明

* 如果父组件传递了一个值，但是子组件却没有在props中声明，那么这个属性就会作为子组件的根元素 DOM 上的attribute(一般来说父组件传递的 attribute 会覆盖子组件中的 attribute ，但是class和style除外，它俩会把父子组件上的内容合并)
* 实例上的 this.$attrs property 里面包含了，父组件传了值，但是子组件中没有用props声明的属性。(这个在组件多层传值的时候使用很方便，具体使用看官网)

### 子传父

#### 注册事件

* 子组件通过$emit("son-method", count)方法并传入事件名称来触发一个事件
* 如果父组件直接在内联样式处理子组件传递过来的参数使用$event，如果事件的处理函数是一个方法，会当做第一个参数传进去。($event是Vue的语法，在浏览器事件中就代表event事件对象，在自定义事件中就代表子组件传递过来的参数)

```js
// 在子组件中提交事件
<div id="first" @click="$emit('a-click', 123)" ></div>
// 在父组件中监听事件
<view-first  @a-click="fClick($event)" ></view-first>
// 父组件中事件处理函数的定义
fClick(data) {
      console.log(data)  //这个data是子组件传递过来的参数
      console.log(event) //这个event是事件处理函数中的event事件对象
    //   在自定义事件中，事件对象不再能通过声明$event或者默认是第一个参数的形式得到了。只能通过在函数体中直接使用event变量的方式来获取event事件对象。
    }
```

### sync修饰符的使用

* sync 修饰符和 v-model 指令十分相似，都可以用来实现父子组件之间的双向数据绑定。
* 只不过 v-model 更倾向于添加到一些表单元素上(input select等)
* sync 更倾向于对于普通变量的双向绑定(el-dialog 组件会这个修饰符实现弹窗的 启/闭)

```html
<!-- 父组件中调用子组件，使用和不使用sync的两种方式 -->
<div class="test-view">
    <!-- 使用sync修饰符 -->
    <test-view-page :number.sync="number"></test-view-page>
    <!-- 正常组件通信 -->
    <test-view-page :number="number" @update:number = "number = $event"></test-view-page>
  </div>

  <!-- 子组件中定义 -->
<div class="test-view-page">
  {{ number }}
  <el-button @click="$emit('update:number', number + 1)">增加</el-button>
</div>
```

## 父子组件之间的通信(不是数据的传递，而是直接调用属性或者方法)

### $children

* 是一个数组，数组里面是Vue组件对象。可以通过这个指令来访问子组件，并且访问子组件里面的属性。
* 比较少的使用

### $parent

* 是一个数组，数组里面是Vue组件对象访问父组件
* 不推荐使用，这样的话组件就不独立了

### $root

* 访问根组件(根实例)，根组件就是在main.js文件中 new Vue({})的那个Vue实例

### $refs

* 可以用来子组件和普通的DOM元素上
* 如果给子组件添加上的话，可以通过refs来直接使用子组件的属性和方法。
* Vue中的组件和DOM对象不一样，有时候想要使用使用一个组件的属性(例如offsetTop)可是组件并没有offsetTop属性，需要使用this.$refs.组件.$el来获取组件中根元素的DOM对象。

## 非父子组件通信

### 全局事件总线

* 所有的Vue组件都继承自Vue实例的原型
* 所以在main.js中在Vue的原型链上定义属性或者方法的话，每个Vue组件都可以拿到这个属性或者方法。
* 当一个组件想要使用一个比较远的组件的方法时，可以使用事件总线的概念
* 事件总线，相当于一个全局的仓库，任何组件都可以去这个仓库里面获取事件。

```js
// vue的原型上添加一个属性。这个属性是一个Vue的实例
// 原型的添加要在new Vue({...})之前。因为在new Vue这个过程就完成了整个页面所有组价的created和mounted。然而事件总线是在某个组件的mounted中被监听。所以事件总线的定义一定要在new Vue()之前。

Vue.prototype.$bus = new Vue()
// 在请求方法的组件内使用以下语句来提交事件
this.$bus.$emit('itemImageLoad',index);

// 在实现方法的组件的mounted()内监听和实现函数
// 一定要保证事件总线的$on在事件总线的$emit之前(监测器要在事件发生之前定义，不然事件发生了没有监测器监测导致事件不会执行)
this.$bus.$on('itemImageLoad',(index) => {
      console.log(index);
    });
```

## Vue组件中的零散知识点

* 子组件中需要一个布尔值时，使用单标签的形式，相当于传递true

```js
// 两种方式等价
<test lazy-model></test>
<test :lazy-model="true" ></test>
```

## 将父组件内的函数当做变量传递给子组件

* 在使用 props 传递 Function 时。Function 中的 this 指向的仍然是父组件
* vue 组件实例化的时候会把定义时的 method 的函数 bind this 到实例上，bind 之后 this 就定死了

```html
<template>
  <div class="test-view">
    <!-- 传递给子组件 -->
    <test-home-page :data="onclick"></test-home-page>
  </div>
</template>
<script>
import TestHomePage from '@/components/testPages/TestHomePage.vue';
export default {
  data() {
    return {
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

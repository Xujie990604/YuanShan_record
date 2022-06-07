# Vue的组件间的通信

## 父子组件数值传递(重点在于传递)

### 父传子

* 如果父组件给子组件传递的是引用类型数据的话，对象或者数组。子组件修改传过来的数据的话。可以不用注册事件，因为传递的是地址

#### props传递数据

* 如果子组件声明了，父组件却没有传值过来的话，值为undefined

```js
// 父组件将本页面的name变量传递给自组件。子组件接受值的时候需要使用s-name的小驼峰版本
<view-first  :s-name="name" :s-message="message" ></view-first>
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

#### props的验证

* 基本的数据类型验证 Number String Object
* 多种可能的类型 propB:[String,Number]
* 必填的字段 propA：{type:String,required:true}
* 带有默认值的数字 PropA:{type:Number,default:100}
* 对象和数组的默认值必须从一个工厂函数来获取
* prop会在组件的实例创建之前被验证，所以data，computed在props的default和验证函数里面是不可以使用的。

### 子传父

#### 注册事件

* 子组件通过$emit("son-method",count)方法并传入事件名称来触发一个事件
* 如果父组件直接在内联样式处理子组件传递过来的参数使用$event，如果事件的处理函数是一个方法，会当做第一个参数传进去。($event是Vue的语法，在浏览器事件中就代表event事件对象，在自定义事件中就代表子组件传递过来的参数)

```js
// 在子组件中提交事件
<div id="first" @click="$emit('a-click',123)" ></div>
// 在父组件中监听事件
<view-first  @a-click="fClick($event)" ></view-first>
// 父组件中事件处理函数的定义
fClick(data) {
      console.log(data)  //这个data是子组件传递过来的参数
      console.log(event) //这个event是事件处理函数中的event事件对象
    //   在自定义事件中，事件对象不再能通过声明$event或者默认是第一个参数的形式得到了。只能通过在函数体中直接使用event变量的方式来获取event事件对象。
    }
```

## 父子组价之间的通信(不是数据的传递，而是直接调用属性或者方法)

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
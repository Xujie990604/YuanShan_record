# Vue的组件间的通信

## 父子组件数值传递

### 父传子

* 如果父组件给子组件传递的是引用类型数据的话，对象或者数组。子组件修改传过来的数据的话。可以不用注册事件，因为传递的是地址

#### props传递数据

* 如果子组件声明了，父组件却没有传值过来的话，值为undefined

#### props的接收

* 字符串数组方式
* 对象方式，可以设置传递的类型和默认值等

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
* 如果父组件直接在内联样式处理子组件传递过来的参数使用$event，如果事件的处理函数是一个方法，会当做第一个参数传进去。
* 自定义事件可以传递事件对象event，也可以传递多个参数
* 如果多层组件嵌套那就多层传递

## 父子组价之间的通信

### $children

* 是一个数组，数组里面是Vue组件对象。可以通过这个指令来访问子组件，并且访问子组件里面的属性。
* 比较少的使用

### $parent

* 是一个数组，数组里面是Vue组件对象访问父组件
* 不推荐使用，这样的话组件就不独立了

### $root

* 访问根组件，Vue实例(根实例不是app.vue(app.vue只是一个组件)而是main.js中的那个Vue实例)

### $refs

* 可以用来子组件和普通的DOM元素上
* 如果给子组件添加上的话，可以通过refs来直接使用子组件的属性和方法。
* Vue中的组件和DOM对象不一样，有时候想要使用使用一个组件的属性(例如offsetTop)可是组件并没有offsetTop属性，需要使用this.$refs.组件.$el来获取组件中根元素的DOM对象。

## 非父子组件通信

### 事件总线

* 当一个组件想要使用一个比较远的组件的方法时，可以使用事件总线的概念

```js
// vue的原型上添加一个属性。这个属性是一个Vue的实例
Vue.prototype.$bus = new Vue()

// 在请求方法的组件内使用以下语句来提交事件
this.$bus.$emit('itemImageLoad',index);

// 在实现方法的组件内监听和实现函数
this.$bus.$on('itemImageLoad',(index) => {
      console.log(index);
    });
```
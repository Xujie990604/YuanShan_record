<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-08-21 20:48:35
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\vue的教程\vue的响应式数据.md
 * @Description:
-->
# Vue的响应式数据

* 由于Vue会在实例初始化的时候对 property 进行getter/setter转化。所以只有在一开始就存在data中的数据才是响应式的。(比如在组件的created, beforeCreate钩子函数中为组件添加一个属性，这个数据不是响应式的数据)(所有需要响应式的值都要在data中声明，即使它目前是一个空值，也要占上位子)
* 尽量不要在beforeCreate钩子函数中定义变量值 1.只在beforeCreate定义属性不在data中定义属性则该属性不是响应式的 2.在beforeCreate中定义属性又在data中定义属性的话会被覆盖。
* 对于已经创建的实例，Vue不允许动态的添加 根级别(!!!Vue.set()设置的属性不是根级别的) 的响应式 property
* Vue 中一个状态所绑定的依赖是一个组件，状态发生变化之后会通知到组件，组件内部再使用虚拟DOM进行对比。

## Vue响应式的原理

* 在getter中收集依赖，在setter中触发依赖

## 数组更新检测

* vue在构造函数new Vue()时，就通过Object.defineProperty中的getter和setter 这两个方法，完成了对数据的绑定。所以直接通过vm.arr[1] = 'aa'的方法，无法修改值去触发vue中视图的更新，必须还得通过Object.defineProperty的方法去改变，而Vue.$set()就封装了js底层的Object.defineProperty方法。

```js
// 在能访问到Vue实例的地方，比如main.js里面使用这种方式
Vue.set(要修改的数组，索引值，修改后的元素)
Vue.set(this.lists, 0, "xujie")

// 在Vue的组件内使用这种形式
this.$set(要修改的数组，索引值，修改后的元素)
this.$set(this.lists, 0, "xujie")
```

### 会触发响应式

* push()pop()shift()unshift()splice()sort()reverse()称为变更方法，会触发视图更新
* 这些方法会触发Vue的数据响应式，是因为Vue在原方法的基础上进行加工。
* 可能本质上push()等方法是不会改变Object.defineProperty()定义的属性的，???需要验证

### 不会触发响应式

* filter(),concat(),slice()非变更方法，并不会丢弃原数组重新进行渲染
* 数组长度的变化是非响应式的， `arr.length = 4`
* 通过索引来直接修改数组中的数据也是非响应式的 `arr[2] = 'xujie'`

## 对象

## 不能触发响应式

* 由于Vue会在初始化实例时对属性执行getter/setter转化过程，所以属性必须在data对象上存在才能让Vue转换它，这样才能是响应式的

* Vue不能检测到对象属性的增加和删除
* `this.obj.a = "xujie"`在data中如果定义的时候就有a属性。那么会触发响应式，如果在data中没有定义a属性，就不会触发响应式。

## Vue.set(object, 'key', 'value')

* 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性
* 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。意思是，set 这个方法只能用于data 里面的子数组对象，而不能直接用于data(这个根数据)或者vue 实例

* this.$set(this.error,'phone','手机号不能为空');
* Vue.set(this.error,'phone','手机号不能为空');

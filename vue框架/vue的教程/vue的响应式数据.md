<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-09-25 22:43:35
 * @FilePath: \supermarketc:\Users\epiphany\Desktop\HTML-CSS-Javascript-\Vue框架\vue的教程\vue的响应式数据.md
 * @Description:
-->
# Vue的响应式数据

* 由于 Vue 会在实例初始化的时候对 property 进行 getter/setter 转化。所以只有在一开始就存在data中的数据才是响应式的。(比如在组件的created, beforeCreate钩子函数中为组件添加一个属性，这个数据不是响应式的数据)(所有需要响应式的值都要在data中声明，即使它目前是一个空值，也要占上位子)
* 尽量不要在beforeCreate钩子函数中定义变量值 1.只在beforeCreate定义属性不在data中定义属性则该属性不是响应式的 2.在beforeCreate中定义属性又在data中定义属性的话会被覆盖。
* 对于已经创建的实例，Vue不允许动态的添加 根级别的响应式 property `this.$set(object, 'key', value)` 也就是说这个object参数，不能是this._data 及以上更高级别的数据
* Vue 中一个状态所绑定的依赖是一个组件，状态发生变化之后会通知到组件，组件内部再使用虚拟DOM进行对比。
  
## 数组

* vue在构造函数new Vue()时，就通过Object.defineProperty中的getter和setter 这两个方法，完成了对数据的绑定。所以直接通过vm.arr[1] = 'aa'的方法，无法修改值去触发vue中视图的更新，必须还得通过Object.defineProperty的方法去改变，而Vue.$set()就封装了js底层的Object.defineProperty方法。

```js
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

### 对象不会触发响应式的情况

* 由于 Object.defineProperty 自身的缺陷，在一个对象中添加一个新属性，使用 delete 删除一个属性的时候不会触发响应式。
* Object.defineProperty 只能追踪一个属性是否被更改

### Vue.set(object, 'key', 'value')

* 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性

```js
this.$set(this.error,'phone','手机号不能为空');
```

## Vue的响应式原理

* 在 getter 中收集依赖，在 setter 中触发依赖

```js
1。外部需要通过 watcher 来读取数据，在 watcher 中会读取一下 data 中的数据，然后触发了响应式的 get 方法。在 get 的时候将 watcher 添加到 data 的依赖数组 dep 中(完成依赖收集)
2. 在改变 data 中数据的值时，触发响应式的 set 方法。在 set 中通过 dep 的 notice 去循环的触发 watcher 上面的 update 方法。 update 方法中可以执行用户传进来的 callback 回调函数来执行用户想要的操作
    // 定义一个 dep 类，专门用来管理依赖
    class Dep {
      constructor() {
        this.subs = [];
      }
      // 在 dep 实例中添加一个依赖
      addSub(sub) {
        this.subs.push(sub);
      }
      // 在 dep 实例中移除一个依赖
      removeSub(sub) {
        remove(this.subs, sub);
      }
      // 在依赖添加之前进行一次判断，在依赖不为 undefined 时才会添加
      depend() {
        if (window.target) {
          this.addSub(window.target);
        }
      }
      // 循环触发 dep 实例中依赖的 update 方法
      notify() {
        // 返回数组的拷贝
        const subs = this.subs.slice();
        // 循环的触发所有依赖
        for (let index = 0; index < subs.length; index++) {
          subs[i].update();
        
      }
    }

    // 收集的依赖是一个什么东西，起一个名字叫做 watcher
    // watcher 是一个中介的角色
    // 外界通过 watcher 来读取数据, watcher 中 读取数据前将自身赋值给 window.target , 然后读取数据，使得自身当做依赖被收集
    // 数据发生变化时，触发 setter ，在 setter 中通知 watcher，然后 watcher 在通知给外界 
    class Watcher {
      // vm 是 引用类型数据(Object, Arr)
      // expOrFn 是需要响应式处理的那个属性 (key值)
      // cb 回调函数(callback)
      constructor(vm, expOrFn, cb) {
        this.vm = vm;
        // 执行 this.getter() ，就可以读取某个属性的值
        this.getter = parsePath(expOrFn);
        this.cb = cb;
        // 在实例化一个 watcher 实例的时候，会自动执行 get 方法
        this.value = this.get();
      }
      // 在执行 get 方法时，将 watcher 实例本身赋值给 window.target
      get() {
        window.target = this;
        // 调用 this.getter 方法时 会读取某个属性的值，因为属性做了响应式处理，会把 window.target(也就是watcher实例) 放到 dep 实例中
        let value = this.getter.call(this.vm, this.vm)
        // 将依赖插入 dep 实例后，将 window.target 赋值为 undefined
        window.target = undefined;
        return value
      }
      // 在执行 update 的时候，会执行传进来的回调函数，来执行用户定义的操作
      update() {
        const oldValue = this.value;
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
      }
    }

    // remove 函数用来在数组中移除指定的数据,并将移除的数据当作函数的返回值
    function remove(arr, item) {
      if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
          return arr.splice(index, 1);
        }
      }
    }

    // Observer 类会附加到每一个被侦测的 Object 上
    // 一但被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
    class Observer {
      constructor(value) {
        this.value = value
        // 只有当 value 的数据类型 object 时才能执行 walk 方法
        if(!Array.is(value)) {
          this.walk(value)
        }
      }
      // 会将 obj 的每一个 key 值都调用一次 defineReactive 方法
      walk(obj) {
        const keys = Object.keys(obj)
        keys.forEach(item => {
          defineReactive(obj, item, obj[item])
        })
      }
    }

    // 如果 value 数据类型为基本数据类型，就把这个属性设置为响应式的
    // 如果 value 数据类型为 Object，就递归的把这个对象的所有属性(包括子属性) 全都转换成响应式的
    // { Object } Obj 引用类型对象
    // { String } key 对象的键值
    // { any }  value  Obj[key]的值
    function defineReactive(obj, key, value) {
      // 如果 value 是一个引用类型的话，通过 Observer 实例来循环的将每一个值都设置为响应式的
      if(typeof value === "Object") {
        new Observer(value)
      }
      // 每个 key 值对应的依赖，存储在 dep 实例中
      let dep = new Dep();
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
          // 收集依赖
          dep.depend();
          return value;
        },
        set(newValue) {
          // 如果改变过后的值和之前的值一样，则什么也不做
          // value 变量存储在 defineReactive 函数的作用域中
          if (value === newValue) {
            return;
          }
          val = newValue;
          // 触发依赖
          dep.notify();
        }
      });
    }
```

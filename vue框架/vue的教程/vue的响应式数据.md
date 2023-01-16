<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2023-01-16 19:49:22
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\vue的响应式数据.md
 * @Description:
-->
# Vue的响应式数据

* 由于 Vue 会在实例初始化的时候对 property 进行 getter/setter 转化。所以只有在一开始就存在 data 中的数据才是响应式的。(比如在组件的created, beforeCreate钩子函数中为组件添加一个属性，这个数据不是响应式的数据)(所有需要响应式的值都要在 data 中声明，即使它目前是一个空值，也要占上位子)
* 尽量不要在 beforeCreate 钩子函数中定义变量值 1.只在 beforeCreate 定义属性不在 data 中定义属性则该属性不是响应式的 2.在 beforeCreate 中定义属性又在 data 中定义属性的话会被覆盖。
* 对于已经创建的实例，Vue 不允许动态的添加 根级别的响应式 property `this.$set(object, 'key', value)` 也就是说这个 object 参数，不能是 this._data 及以上更高级别的数据
* Vue 中一个状态所绑定的依赖是一个组件，状态发生变化之后会通知到组件，组件内部再使用虚拟DOM进行对比。
  
## 数组

* vue在构造函数new Vue()时，就通过 Object.defineProperty 中的 getter 和 setter 这两个方法，完成了对数据的绑定。所以直接通过vm.arr[1] = 'aa'的方法，无法修改值去触发 vue 中视图的更新，必须还得通过 Object.defineProperty 的方法去改变，而 Vue.$set() 就封装了 js 底层的 Object.defineProperty 方法。

```js
// 数组中使用 $set 方法实际上就是 Vue 将操作转化为使用 splice 方法去做
// 因为 Splice 方法会触发响应式，最终也就是触发了响应式
this.$set(要修改的数组，索引值，修改后的元素)
this.$set(this.lists, 0, "xujie")

// 数组中使用 $delete 方法实际上就是 Vue 将操作转化为使用 splice 方法去做
// 因为 Splice 方法会触发响应式，最终也就是触发了响应式
this.$delete(要修改的数组，索引值)
this.$set(this.lists, 0)
```

### 会触发响应式

* push()pop()shift()unshift()splice()sort()reverse()称为变更方法，会触发视图更新
* 这些方法会触发 Vue 的数据响应式，是因为 Vue 在原方法的基础上进行加工。

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
// 对象上使用 $set 方法，实际上就是 Vue 手动去调用响应式的方法，手动的将新增的属性变成响应式的
this.$set(this.error,'phone','手机号不能为空');
// 对象上使用 $delete 方法，实际上就是 Vue 手动的去触发依赖，通知所有使用到该对象的组件去重新渲染
this.$delete(this.error,'phone');
```

## Vue的响应式原理

* Object 在 getter 中收集依赖，在 setter 中触发依赖

```js
1。外部需要通过 watcher 来读取数据，在 watcher 中会读取一下 data 中的数据，然后触发了响应式数据的 get 方法。在 get 的时候将 watcher 添加到响应式属性的依赖数组 dep 中(完成依赖收集)(一个属性通过props传递给子组件不会导致多一个 watcher, watch 这个属性会多加一个 watcher,computed 中用到这个属性会多加一个 watcher)
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

    // 收集的依赖是一个什么东西，起一个名字叫做 watcher(每一个 Vue 实例，对应着一个 渲染watcher?渲染 watcher 好像不是响应式收集的 watcher)
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
      // 在执行 update 的时候，会执行传进来的回调函数(在 Vue 中这个回调函数的作用就是用来进行视图渲染)
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

* Array 在 getter 中收集依赖，在拦截器中触发依赖
* Object.defineProperty 是有监控数组下标变化的能力的，为什么Vue2没有采用 Object.defineProperty 拦截器的方式来监听数组变化而是采用了重写部分数组方法的形式主要是为了性能考虑。一般对象存储的信息不会很多。但是数组经常用来存储大量信息，监听大量数组会耗费性能。

```js
    const arrayProto = Array.prototype
    // arrayMethods 这个对象的原型上拥有和 Array 原型上一样的方法和属性
    // arrayMethods 对象是拦截器(在这个对象中的方法不仅能实现原有的功能，还能 发送变化通知)
    const arrayMethods = Object.create(arrayProto)
    ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method){
      // 缓存原始方法
      const original = arrayProto[method]
      // 通过 switch 判断如果是 push,unshift，splice等可以新增数组元素的方法
      // 将新增的元素取出来放到 inserted 中
      def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
          case 'push':
          case 'unshift':
          inserted = args
            break;
          case 'splice':
            inserted = args.slice(2)
            break;
            // 如果检测到数组元素有新增的话，把新增的数据也变成响应式的
          if(inserted) {
            ob.dep.notice()
          }
            ob.dep.notify()
            return result
        }
      })
      Object.defineProperty(arrayMethods, methods, {
        value: function mutator(...args) {
          // 在拦截器中直接通过 this.__ob__ 来访问 value 上面的 Observer 实例
          const ob = this.__ob__
          // 在拦截器中，检测到数组发生变化时，就会通知依赖数据发生了变化
          ob.dep.notify()
          // 在调用 arrayMethods 对象中的方法时，实际上调用的还是 Array 原型上面的方法
          // 但是我们可以在这个函数中做一些其他事情，比如 发送变化通知
          return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
      })
    });

    // Observer 类会附加到每一个被侦测的 Array 上
    // 被侦测的 Array 会被替换原型上的方法，或者直接在自身上添加重写之后的方法
    class Observer {
      constructor(value) {
        this.value = value
        // Array 类型的数据，在 Observer 中存储依赖列表
        // 因为 Array 在 getter 中收集依赖，在拦截器中触发依赖，所以依赖要保存在一个双方都可以访问到的地方
        this.dep = new Dep()
        // 调用 def 函数用于在 value 上新增一个 __ob__ 属性，这个属性的值就是当前 Observer 实例
        def(value, '__ob__', this)
        // 只有当 value 的数据类型 Array 时,将上面的拦截器替换 Array 类型数据原有的原型
        // 如果浏览器不支持 __proto__ 的使用，直接粗暴的在 value 为 Array 类型的数值上逐个添加拦截器上的方法
        // (自己身上有的属性就不会去原型上面找，从而实现了方法的覆盖)
        if(Array.isArray(value)) {
          this.observerArray()
        }
      }
      // 工具函数，用于循环的将数组中的所有属性都变成响应式的。例如 length 属性
      observerArray(items) {
        for(let i = 0, L = items.length; i < L; i++){
          observe(items[i])
        }
    }
    }

    // def 工具函数，用于在 value 上添加 Observer 实例
    // 1. 添加完实例之后，在 getter 中可以通过 value.__ob__.dep 来访问 Observer 上面的 dep 
    // 2. 在拦截器中，可以通过 this.__ob__(在拦截器中 this 就是 value) 来访问 Observer 上面的 dep 
    function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
        value: val,
        enumerable: !enumerable,
        writable: true,
        configurable: true
      })
    }

    // 通过 defineReactive 对数据进行响应式的处理(当前函数只考虑 Array 的场景)
    // Array 在 getter 中收集依赖， 在拦截器中触发依赖
    function defineReactive(obj, key, value) {
      // 通过 Observer 函数将 Array 数据类型的数据上的原生方法进行处理
      if(typeof(val === 'object')){
        new Observer(val)
      }
       let childOb = observe(val)
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          // 收集依赖
          if(childOb) {
            childOb.dep.depend()
          }
          return val;
        }
      })
    }
    
    // 尝试为 value 创建一个 Observer 实例
    // 如果 value 已经是响应式数据了，不需要再次创建一个新的 Observer 实例，直接返回已有的实例
    function observe(value, asRootData) {
      if(!isObject(value)){
        return
      }
      let ob
      if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
      }else {
        ob = new Observer(value)
      }
      return ob
    }
```

# Vuex

## 基础使用

* 需要使用Vue.use()来安装插件
* new Vuex时，需要 new Vuex.Store({})
* 同时也需要在main.js的Vue实例中引入一下Vuex.store()的实例store,这样的话就可以在Vue.prototype中添加一个$store的属性，这样就能在每个组件中使用$store属性

## DevTools插件

* 只有使用mutations来改变state的话，才能在DevTools中被记录到
* 异步操作放到actions中，mutation中只处理同步的操作，否则也会跟踪不到
* backend是后端 frontend是前端

## state

* 在vuex中保留数据的最基本的形式
* 单一状态树，单一数据源，只创建一个store实例，方便调试和维护

## Getters

* 类似于计算属性,被看做一个属性。
* 使用this.$store.getters.powerCounter来获取store中的getters里面的属性
* getters的方法中可以通过添加getter参数的形式来使用getter中的数据(getters方法中的第一个参数默认是state，第二个参数时getters)
* 如果getters里面需要在调用时填入参数的时候，需要在getters的函数内部返回一个函数，那么在调用getters中的属性时，实际得到的是一个函数，并且这个函数内可以指定参数

## action

* 类似于mutations，代替他做一些异步的操作，在actions中引入mutations中的函数
* action中的方法也有一个默认的参数是context(上下文)，在没有modules的模块中。context就指代实例化的唯一的那个store
* 在调动action的方法时，需要使用dispatch

### 使用Promise和Vuex梦幻联动

* 如果Vuex的actions的函数返回一个Promise的话，那么就可以在调用actions的地方进行接下来的同步操作。

```js
// 调用Vuex中的actions里面的函数
// this.$store.dispatch('aUpdateStu','徐杰')这句话会直接被
//返回的Promise替代，然后根据Promise中的resolve还是reject来执行then或者catch
 updateInfo() {
      this.$store.dispatch('aUpdateStu','徐杰')
      .then(res => {
        console.log("里面完成了提交");
        console.log(res);
      })
    }

// vuex中的actions函数的定义
// 在actions里面返回一个Promise，并且执行resolve(),携带参数
aUpdateStu(context,payload) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
        context.commit('updateStu', payload)
    }, 1000)
        console.log('我已经完成了提交');
        resolve('1111')
   })
}
```

## mutations

* 在这个阶段进行数据的更新(唯一的途径)，在mutations里面定义的方法会自动设置第一个参数为state
* 在mutations中必须是同步的操作，异步的操作在DevTools中跟踪不到
* 通过mutation的方法操作数据的过程可以被Devtools跟踪

### 普通的提交风格

* 通过this.$store.commit('')来提交方法,在提交的时候，可以添加参数，直接跟在mutation的方法名字后面，然后在vuex中也是直接接收

```js
// 调用方法
addCount(count) {
      this.$store.commit('incrementCount',count)
    }

// 定义方法
incrementCount(state,count) {
        state.counter += count;
    }
```

### mutations中的特殊的提交风格

* mutations中的方法，都可以被看做两个部分，函数名看做事件类型，函数体看做回调函数
* 主要是这种提交方式里面参数的变化，不在是一个简单的参数，而是整个对象

```js
// 调用方式
 addCount(count) {
      this.$store.commit({
        type: 'incrementCount',
        count
      })
    }

    // 定义方式
    incrementCount(state,payload) {
            console.log(payload);
            state.counter += payload.count;
        }
```

### 使用常量的提交方式

* 额外在store文件夹下定义一个js文件用来约束mutations里面的方法名

## Vuex的响应式

* 所有在state中一开始就定义的属性和对象都是响应式的，被watcher(观察者模式)所监视。当属性发生变化的时候，就会通知所有界面中用到该属性的地方，让界面进行刷新。
* 如果给state中的一个对象添加没有存在的属性时，不会被响应式系统识别。
* Vue.set(对象名，新增加的key，新增加的value)可以通过这种方式来响应式的添加属性。
* 使用delete来删除对象上的属性时，也做不到响应式
* Vue.delete(对象名，key的名字)是响应式的。

## module

* 根据变量进行抽离，每个模块具有自己的state，action，mutations，getters
* 但是在使用模块中的state的时候又有一点怪，Vuex内部会自动把modules中的内容放到state中，所以想要使用moduleA中的name数据需要$store.state.moduleA.name
* 想要修改moduleA中的name，需要和往常一样直接使用$store.commit('方法名'),系统会先去实例中的mutations中寻找这个方法，找不到的话再去模块中寻找，因此要求在模块中的方法名不能和外面的store实例中的方法重名
* 想要使用模块中的getters属性时，也是不区分模块的，直接使用$store.getters.fullName来使用moduleA中的fullName，所以说getters中的方法的名字也不能重名，模块中的getters方法可以添加第三个参数(rootState作为第三个参数，rootGetters作为第四个参数)
* 想要使用模块中的actions的方法时，也是直接使用$store.dispatch('方法名'),所以说actions不能有重名，重要的是actions中传递的context此时指代的就不再是唯一的那个store实例，而是当前模块。
context其实是一个对象，里面不仅有commit还有rootState，rootGetters等属性
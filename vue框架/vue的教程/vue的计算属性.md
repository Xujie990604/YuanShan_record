# vue的计算属性

## computed

* 减少模板中表达式的使用
* 当计算属性在模板中使用，并且计算属性的依赖值(只要是定义在computed中的就，哪怕是return的时候和这个值无关)发生改变的时候就会触发他的更改(调用的是get函数)。如果不发生变化，使用的就是缓存的属性值
* 计算属性其实本质就是一个对象，只不过省略使用的话可以写成一个函数。所以使用计算属性的时候不需要加括号。

## 计算属性和v-model配合使用

* 计算属性如果想要和v-model配合使用的话，就必须同时具有get和set
* 由于绑定了v-model，改变input数据时，就会触发input事件不断的给计算属性赋值，这时就会不断的调用计算属性的set方法。

### 基本数据类型和v-model配合使用

```js
  computed: {
    fullName: {
      // getter
      get () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
  }
}
```

### 引用数据类型和v-model配合使用

* 待定。。。

## set方法

* 如果是普通的变量需要调用set函数的时候，赋值形式为 this.fullName = "xu jie",不是像函数一样去传参
* 因为get的返回值是依赖data数据的，所以在使用set的时候也要依赖data中的数据。
* 如果set的函数改变了get函数的依赖项，那么计算属性的get函数就会被调用。

## 计算属性VS方法

* 计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。
* 相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

## 侦听器

* 通过watch选项提供了侦听器的方法。
* 适合在调试的时候使用
* watch是在属性有改变的时候调用对应的方法

```js
// 这个场景就是watch的常见使用场景。在属性发生变化后触发一个经过防抖包装的函数
 watch: {
       // 如果传进去的是两个参数，第一个是改变后的counter的值，第二个是改变前的counter的值
       // 如果只传入一个参数就是counter改变后的值
        counter(newCounter, oldCounter) {
            // 在counter属性发生变化之后，执行经过防抖包装的函数
            this.debounceAxios();
        }
    },
    created() {
        // 通过防抖函数包装axios请求函数，生成一个debounceAxios函数
        // 不一定非要在data中定义一个属性来承载包装过的防抖函数
        // 可以直接使用this.xxx 来创建一个属性。
        this.debounceAxios = debounce(this.Axios)
    },
    methods: {
        Axios() {
            // 假设这是一个进行axios请求的函数
        }
    }
```

## 侦听器和计算属性

* 计算属性是依赖的属性发生变化时，计算属性跟着变化，并且主要得到的是一个属性。
* 侦听器不是为了得到一个属性，而是期望在某些属性变化的时候能触发一些函数或者语句。(通常用于在数据变化时进行异步请求等开销较大的步骤)(配合着防抖函数的使用)
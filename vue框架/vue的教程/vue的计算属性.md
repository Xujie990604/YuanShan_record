# vue的计算属性

## computed

* 减少模板中表达式的使用
* 当计算属性在模板中使用，并且计算属性的依赖值发生改变的时候就会触发他的更改(调用的是get函数)。如果不发生变化，使用的就是缓存的属性值
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
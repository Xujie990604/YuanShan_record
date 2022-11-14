<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-09-19 21:20:28
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\Vue3\Vue3的介绍.md
 * @Description: 
-->
# Vue3的介绍

## 单文件组件

* 单文件组件(.vue文件)英文缩写SFC
* 单文件组件中会有一个组件的逻辑，模板，样式

## 应用实例

* Vue 的这种使用方法和 node 是在是太像了

```js
app.use(router)
// app 应用实例的 config 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，它将捕获所有由子组件上抛出而未被处理的错误
app.config.errorHandler = (err) => {
//  处理错误
}
// 使用 component 来注册应用范围内的可用资源
app.component('toDoListButton', toDoListButton);
```

## 动态绑定多个值

```js
// 这是一个包含多个 attribute 的 js 对象
const objAttrs = {
  id: 'app',
  class: 'content'
}
// 可以通过不带参数的 v-bind 将 objAttrs 绑定到单个元素上
<div v-bind="objAttrs"></div>
```

## JS表达式

* 在 Vue 中 js 表达式可以被使用在以下场景中
  
1. 在文本插值中
2. 在任何 Vue 指令(以v-开头的 attribute)attribute 的值中

```js
{{ OK ? 'YES': "NO" }}
<div :id="`list-${id}`"></div>
```

## 模板中受限的全局访问

* 模板中的表达式将被沙盒化，仅能访问到受限的全局对象，比如 Math
* 例如用户添加在 window 上的属性并不能直接在模板中使用，除非使用 app.config.globalProperties 显式的添加它们

## 响应式数据

* 在 Vue3 中，状态都是默认深层响应式的

```js
// reactive() 返回的是一个原始对象的 Proxy
// 在 Vue 中仅仅使用你声明的对象的代理版本
const raw = {}
const proxy = reactive(raw)
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

### reactive()

* 仅对对象类型有效(对象，数组，Set，Map)等。(string, number, boolean)等类型无效
* 必须始终保持对该响应式对象的相同引用，不可以随意的替换一个响应对象
* 为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身。
* 响应式对象的属性被赋值，解构至本地，或者当做函数的参数传递时会失去响应式(!!!仅当属性为非引用类型值的时候)(本质上就是只有被 proxy 代理的堆中的数据才具有响应式)

### ref()

* reactive()不能为 string, number, boolean 类型声明响应式，是因为 js 中没有给这三种值引用数据类型
* Proxy 是基于属性的访问进行响应式跟踪的。所以只能对引用类型进行跟踪。
* ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象(将一个基本类型的值变成引用类型的值之后，就可以把这个属性赋值，解构，或者是当做函数的参数传递了)

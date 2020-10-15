# class与style的绑定

## 对象的语法

* 通常和计算属性进行配合，控制类名的是否渲染。

```js
<div :class="{ active: isActive }"></div>
// 可以同普通的class attribute并存
// css类名有连字符需要使用引号括起来
class="static"
v-bind:class="{ active: isActive, 'text-danger': hasError }"
```
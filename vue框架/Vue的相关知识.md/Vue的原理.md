<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-05-24 22:14:52
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的相关知识.md\Vue的原理.md
 * @Description: 一些和Vue的原理有关的知识点
-->
# Vue的一些原理类知识

## Vue.use(plugin)

* 该方法需要在调用new Vue({})之前被调用
* 如果插件是一个对象，这个对象必须有install函数
* 如果插件是一个函数，它就会被当做install方法调用
* Vue.use()之后，Vue会自动执行插件的install方法，来做一些操作

### 插件需不需要Vue.use()

* Vue-router，Vuex，Element-ui等插件都具有install方法，并且插件的运行也都依赖于install方法中的操作，所以这些插件需要使用Vue.use()
* axios不需要install方法也能正常使用，所以axios插件不需要使用Vue.use()

### Vue.use()和install()的具体实现

#### Vue.use()内部的具体实现

1. 检查插件是否安装，不会重复安装
2. 没有安装就安装上，并且执行插件的install方法，并传入Vue实例

#### install()函数内部的实现

1. 自定义一些参数()

```JS
// 自定义一些参数 (Element-ui插件的例子)
// opts是参数，如果我们coder传入这个参数就是用传入的，否则就使用默认的数值
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
    // 调用vue.use()时，传入参数。Vue.use()内部又会把参数传给install()方法。
  Vue.use(Element, { size: 'small', zIndex: 3000 });
```

2. 在原型上注册一些方法

```js
// 在Vue的原型上直接赋予一个函数，到时候就能直接通过this.$alert()调用ELement-ui内部的函数
Vue.prototype.$alert = MessageBox.alert;
// 在每个Vue组件上都添加了$router属性，并且是响应式的添加。
Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
```

3. 注册全局组件

```js
// 注册 <router-view>组件
  Vue.component('RouterView', View)
// 注册<router-link>组件
  Vue.component('RouterLink', Link)
```

## Vue组件的style标签中的scoped属性

* 当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件，也就是说，该样式只能适用于 当前组件内出现过 的元素。通过该属性，可以使得组件之间的样式不互相污染。如果一个项目中的所有style标签全部加上了scoped，相当于实现了样式的模块化。

### 原理

* 给一个组件中的所有 出现在页面上的dom 添加了一个独一无二的动态属性(同一个组件内的DOM添加的动态属性是一样的)，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom(组件内部dom)
* 一个Vue组件被父组件引用时，子组件最外层DOM结构上既有父组件的动态属性，又有子组件的动态属性，这样在父组件和子组件的 scoped style中都能修改子组件最外层的样式

### scoped的弊端

* 在我们自己的Vue组件中(组件的style带有scoped属性)引入第三方的插件时，按照普通的css层级去修改第三方插件 内部的DOM(并不是第三方的组件都不能修改，而是只能修改在当前组件中出现过的DOM，例如 el-input 的样式可以修改，但是el-input内部的DOM样式就不能修改了) 不会生效。
* 例如在vue.app组件中(组件的style带有scoped属性)引入element-ui插件。在带有scoped属性的style标签中去修改Element组件的内部DOM的css属性不会生效。因为Vue只会在当前组件的第一层DOM结构上添加那个动态的属性，不会在引用组件的第二层DOM上添加动态属性，但是只要是写在带有scoped属性的style标签中的 css选择器 都会被加上动态属性。因此会导致最终渲染出来的 css选择器 和我们想要 控制的DOM 匹配不上。

### scoped弊端的解决方案

* 使用 >>>(普通css) 击穿符号(或者 ::v-deep(预处理CSS), /deep/)(在Vue Cli3版本以上不可以使用) 指令) 使用穿透符号之后，在穿透符号后面的 CSS选择器上 不会被加上动态的属性

```css
/* 使用v-deep语法时前面需要有父选择器 */
.father {
  ::v-deep.son {
    ...
  }
}
/* 使用::v-deep{ } 语法时可以前面没有父选择器 */
::v-deep {
  .son {
    
    ...
  }
}
```

* 使用两个style标签(不要使用这种方案，仅仅用于原理的理解)

```css
<style>
/* 用于修改第三方库的样式 */
/* 在这里面定义的属性全局样式，如果其他组件内有相同的结构，其他组件的样式会受到影响 */
</style>
 
<style scoped lang="scss">
/* 自己的组件内样式 */
</style>
```

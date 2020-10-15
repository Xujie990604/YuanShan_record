# Vue的语法和指令

## mustache语法

* {{}}
* 该语法中不仅可以放置变量，还可以放表达式
* 不过一般不会放表达式，如果有这种需求也是让computed属性进行计算。

## v-once

* v-once指令可以让插值处的内容不在更新
* 在视图首次展示，不会响应数据的变化。

## 原始html

* 使用v-html指令来解析原始html```<span v-html="msg"></span>```
* 作为载体的span标签会被msg中的html结构代替
* 动态的HTML十分危险，请保证安全的HTML部分使用插值的形式

## Vue渲染

* 先是按照正常的html来解析html，然后使用Vue来解析Vue特定的指令，语法
* 所以Vue的语法会覆盖原生的语法，在使用script引用时，刷新页面会闪一下。

## v-cloak

* 这是一个属性，添加到DOM上，具有这个属性的DOM不会被解析，只有Vue代码执行完毕之后(v-cloak属性会被去除)
* 通过css的属性选择器来给具有这个属性的DOM设置display：none;
* 用来解决画面闪烁的问题

## 属性绑定v-bind

* Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 v-bind 指令
* ```<div v-bind:id="msg"></div>```
* 语法糖的写法就是 :
* 不仅仅是需要绑定变量的时候才使用v-bind，只要是需要Vue解析语法就需要使用v-bind(如果你就是想要传递一个没有被变量引用的字符串时，不要使用v-bind，反而会出错，会自动把你想要当字符串传递的字符串当做变量来识别。相反不加v-bind的话，你传的什么都会被当做字符串.)

## 过滤器

* 可以使用在双括号语法和v-bind表达式中。写在js表达式后面。使用 | 符号指示
* 用于一些常见的文本格式化

```js
// 定义showDate过滤器
filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return date
    },
  }
// 使用过滤器
 <span class="date">{{ commentInfo.created | showDate }}</span>
```
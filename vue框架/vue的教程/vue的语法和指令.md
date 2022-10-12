<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:11:00
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\vue的语法和指令.md
 * @Description: 
-->
# Vue的语法和指令

## mustache语法

* {{}}
* 该语法中不仅可以放置变量，还可以放表达式
* 不过一般不会放表达式，如果有这种需求也是让computed属性进行计算。

## v-if

* 实际上利用的就是三目运算符

## v-once

* v-once指令可以让插值处的内容不在更新(v-once指令写在DOM结构中)
* 在视图首次展示，不会响应数据的变化。

## 原始html

* 使用v-html指令来解析原始html(如果data中的数据是一个DOM结构的话，使用v-html指令来告知Vue把这个数据按照DOM来解析而不是按照一个字符串来解析)
* ```<span v-html="msg"></span>      msg: '<a href="www.baidu.com">百度一下</a>'```
* 作为载体的span标签会被msg中的html结构代替
* 动态的HTML十分危险，请保证安全的HTML部分使用插值的形式

## Vue渲染

* 先是按照正常的html来解析html，然后使用Vue来解析Vue特定的指令，语法
* 所以Vue的语法会覆盖原生的语法，在使用script引用Vue.js时，刷新页面会闪一下。

## v-cloak

* 这是一个属性，添加到DOM上，具有这个属性的DOM不会被解析，只有Vue代码执行完毕之后才会对具有v-clock属性的DOM进行解析(v-cloak属性在vue代码执行前会存在，vue代码执行完毕之后v-clock会被去除)
* 通过css的属性选择器来给具有这个属性的DOM设置display：none;(在vue代码没有执行前v-clock属性存在，但是因为设置了display:none; Vue代码执行前DOM不会被渲染，等到vue代码执行完成v-clock属性消失后DOM才会被渲染。)这样的话就可以解决画面闪烁的问题(适用于使用script引入vue的场景)

## 属性绑定v-bind

* Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 v-bind 指令
* ```<div v-bind:id="msg"></div>```
* 语法糖的写法就是 :
* 不仅仅是需要绑定变量的时候才使用v-bind，只要是需要Vue解析语法就需要使用v-bind(如果你就是想要传递一个没有被变量引用的字符串时，不要使用v-bind，反而会出错，会自动把你想要当字符串传递的字符串当做变量来识别。相反不加v-bind的话，你传的什么都会被当做字符串.)

```js
// 尽管这些都不是变量，但是还是要加上v-bind修饰符。因为不加v-bind即使你写的是 数字42 布尔值false 都会被当作纯字符串被传入
// 只有使用了v-bind修饰符，Vue才会尝试将他们识别为 Number Boolean Array Object
<blog-post v-bind:likes="42"></blog-post>
<blog-post v-bind:is-published="false"></blog-post>
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
<blog-post v-bind:author="{ name: 'Veronica', company: 'Veridian Dynamics'}"></blog-post>
```

## 动态参数

* ```<div :[imgData]="image"></div>```
* 当参数使用[]中括号括起来的时候，Vue会把括号内的imgData当做变量来解析
* 如果data中 ```imgData: 'url'```那么上文中绑定的属性就是 ```:url="image"```
* 也可以使用同样的方式动态绑定事件类型

## 过滤器

* 可以使用在双括号语法和v-bind表达式中。写在js表达式后面。使用 | 符号指示
* 用于一些常见的文本格式化

```js
// 定义showDate过滤器
filters: {
    showDate(value) {
      return "$" +  date;
    },
  }
// 使用过滤器
 <span class="date">{{ commentInfo.value | showDate }}</span>
```

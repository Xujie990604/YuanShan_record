# class与style绑定

## 对象语法（class）

```javascript
<div v-bind:class="{ active: isActive }"></div>
可以同普通的class attribute并存
class="static"
v-bind:class="{ active: isActive, 'text-danger': hasError }"
```

## 绑定的数据对象不必内联定义在模板里（class）

```javascript
<div v-bind:class="classObject"></div>
设置可以把classObject设定为一个返回值为对象的计算属性，功能更加强大
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

## 数组语法（class）

```javascript
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

* 数组语法想要实现条件切换来控制style，就需要使用三元运算符，或者对象数组里面使用对象数组。

## style绑定内联样式

```javascript
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}

直接绑定一个对象会更加简洁，对象的语法常常结合对象的计算属性使用
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

## 数组语法(style)

```javascript
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

## 自动添加前缀

* 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

## 多重值

```javascript
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

* 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

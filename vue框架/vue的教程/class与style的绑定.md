<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-05-09 20:54:40
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2022-07-08 10:27:43
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue的教程\class与style的绑定.md
 * @Description: 
-->
# class与style的绑定

## class的绑定

### 数组的语法

```html
// 数组语法中的aaa和bbb都是vue中定义的变量
// 数组语法中想要使用条件切换就要使用三元运算符
<div class="father" :class="[ isActive ? aaa : '', bbb ]"></div>
```

### 对象的语法

* 通常和计算属性进行配合，控制类名的是否渲染。

```html
// 对象语法中的active不是Vue中的变量，就是字符串'active'
<div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
// 可以同普通的class attribute并存一个DOM结构可以同时有class和:class
// css类名有连字符需要使用引号括起来
```

## style的绑定

### style中对象的语法

```html
// 属性名fontSize既可以使用大驼峰的形式。 还可以使用连字符的形式font-size

// '50px'加上了单引号Vue就会把'50px'当做字符串来解析
<div class="main" :style="{fontSize: '50px'}">数据</div>
// finallySize没有加单引号的时候，Vue就会把finallySize当做变量来解析
<div class="main" :style="{fontSize: finallySize}">数据</div>

// 可以将这个对象写在data数据中，方便DOM结构的清晰
<div class="main" :style="fStyle">数据</div>
data{ 
    fStyle: {
        fontSize: '50px',
        ...
    }
}
```

### style中的数组的语法

```html
// sStyle,bStyle都是定义在data中的对象
<div class="main" :style="[sStyle,bStyle]">数据</div>
```

* 就是对象的写法可以保存到外面，然后使用数组的话，可以使用多个对象的写法。

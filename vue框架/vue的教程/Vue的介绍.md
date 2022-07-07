# Vue的介绍

## Vue不再直接操作DOM节点

1. Vue可以把数据绑定到DOM文本，attribute(属性)，还有DOM结构。
2. 数据都是响应式的。

## 渐进式框架

* Vue是一个渐进式框架，意味着可以作为应用的一部分嵌入其中。
* vue Core + Vue Router + Vuex生态

## Vue的使用方式

### CDN的引用

* CND从更近的服务器来引入内容。能够更加快速的交付内容。
* 开发版本的CDN 没有压缩过代码，可以看源码。还有帮助的命令行警告
* 生产环境的CDN 压缩代码，优化了尺寸和速度。

## 编程范式

### 原生js

* 要想把一个变量输出到屏幕上，需要创建div，添加id属性，创建文本节点，把变量放进入然后显示
* 这叫命令式编程

### Vue

* 声明式编程
* 数据和结构分离

### 其他的编程范式

* 面向对象编程(对象是第一公民)
* 面向函数编程(函数是第一公民)

## mvc和mvvm

### mvc

* view -> controller -> model -> view
* 数据是单向传递的

### MVVM

* view       -><-      viewModel    -><-     model
* template模板        new Vue(...)         data() {...}
* viewModel会实现view和model的同步显示
* Model用纯javascript对象来表示，View负责显示，两者做到了最大程度的分离。把Model和View相关联起来的就是ViewModel
* 我们不必再考虑DOM的结构，我们只需要操作model，最简单的数据存储方式就是对象
* 改变javascript的状态，DOM结构会产生相应的变化
* 关注点从如何操作DOM，变成了如何更新对象的状态
* 设计的优点：双向绑定
* MVVM的设计思想：关注Model的变化，让MVVM框架去自动更新DOM的状态。把开发者从操作DOM的繁琐步骤中解放出来
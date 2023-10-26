# Vue 的响应式数据

## 一，Vue的页面渲染

Vue.js的渲染过程是声明式的，我们通过模板来描述状态与DOM之间的映射关系。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948955723-742f1588-50a4-42e1-9ee1-a4de1e68bbdf.png#averageHue=%231e1e1e&id=Tyk0I&originHeight=366&originWidth=902&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948956084-252dbace-d711-4372-96e2-3b1f5621f2cb.png#averageHue=%231e1e1e&id=bRc4S&originHeight=279&originWidth=645&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
Vue.js会自动通过状态生成DOM，并将其输出到页面上显示出来，这个过程叫渲染

### 1.1 页面的初次渲染

1. 将Vue 的类HTML语法模板编译成render 函数

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948956489-7be32cc0-e55c-49df-b452-38d9f96f817a.png#averageHue=%23fefdfd&id=YxO3t&originHeight=330&originWidth=775&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
Render 函数中也包含状态和DOM之间的映射关系(开发的时候也可以使用 render 函数的形式来写模板，可以省去 Vue 编译的过程)

2. Render 函数的执行会生成 VNode

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948957220-bf56b287-d900-4808-a71d-d91fe7bd7895.png#averageHue=%23fefdfd&id=PPcBf&originHeight=577&originWidth=920&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3. 通过 patch 算法将 VNode 渲染成真正的 DOM 结构。

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948958483-0c1f3e4f-2b86-478c-afca-682eaf431a20.png#averageHue=%231f1e1e&id=wP9vk&originHeight=305&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 1.2 页面的更新

通常，在运行时应用内部的状态会不断发生变化，此时需要不停地重新渲染。Vue如何知道有哪些 DOM 结构需要被重新渲染？如何去更新 DOM 结构。

使用**变化侦测**的方式来解决这个问题。

1. 在哪里用到了(读取值)某个响应式数据，会在一个数组中记录这个地方(变化的追踪)
2. 当某个响应式数据被更新了(修改值),会根据这个值对应的数组去逐个更新。

Vue更新的粒度为 **中粒度**。即一个状态所绑定的依赖并不是具体的DOM结点也不是整个网页。而是一个组件，这样当状态发生变化后只会将通知发送给对应的组件。然后组件内部执行 render 函数基于当前最新的状态生成的最新 VNode 去和 旧的 VNode 进行对比。从而得知具体哪些 DOM 结构需要被更新。

## 二，Vue的响应式原理分析

### 2.1 Observer类

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948959123-82e90ee5-2480-404b-8f90-d00d9309fb1a.png#averageHue=%231f1e1e&id=sqNFg&originHeight=390&originWidth=757&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### **2.2 Dep类**

可以简化看成是一个用来存储回调函数的数组
Window.target 是一个全局变量，方便依赖的收集
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948959556-23af3cad-fed4-4bb0-a3c8-8be0c39bf8e4.png#averageHue=%231e1e1e&id=VQSeM&originHeight=550&originWidth=820&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### **2.3 Watcher类**

可以简化看成是一个回调函数（回调函数的内容包含了要在哪里做？做什么事情）
Vue中的三种watcher: 1. 组件的render watcher 2. 计算属性watcher 3. $watcer 对应的watcher
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948960045-71533d38-3d4c-4082-a974-88971cd7b459.png#averageHue=%231e1e1e&id=DsCZ8&originHeight=449&originWidth=880&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2.4 整体流程

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948960467-8fb70d30-92f4-4c7a-9eb1-1c354bef8c5f.png#averageHue=%23868687&id=py5ZV&originHeight=283&originWidth=530&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
**页面初始化时：** Observer 类会附加到每一个 object 上。递归的调用 defineReactive 函数将每一个属性都通过 Object.defineProperty() 进行数据拦截。在读取数据时会收集依赖，在修改数据后会触发依赖。每一个属性都会拥有一个独立的 Dep 实例
**页面使用数据时：**读取数据时会实例化一个 Watcher,在 new Watcher 的过程中会将 watcher 实例赋值给全局的变量(方便 dep 去收集)。然后默认读取一下该属性(读取该属性会触发依赖收集，从而将 watcher 实例放到响应式属性的 dep 中)
**改变数据后:** 改变数据会触发依赖执行，执行当前响应式属性的 dep 数组中的所有 watcher 的 update 方法(update 的回调函数 可能是执行组件的 render 函数，也可以是执行用户自定义的回调函数)

### **2.5 数组的响应式处理：**

处于性能和业务场景（大多数情况下是通过方法来改变数组，而非直接操作key/index 来改变数组）的考虑。数组不会针对每一条数据使用 Object.defineProperty() 进行数据拦截。
数组的响应式处理为在 get 中收集依赖，在数组方法中触发依赖。
**重写七个可改变数组的方法：**
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948960899-bd6e8a55-5f24-4fd3-9c49-f056277b9bc4.png#averageHue=%23201f1e&id=LuICe&originHeight=240&originWidth=858&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
替换响应式数组的原型
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948961361-00e40c07-d2a7-45f2-a5f0-eabbb873fdf2.png#averageHue=%231f1e1e&id=XZztd&originHeight=97&originWidth=855&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 三，Vue2响应式数据的缺陷

### 3.1 缺陷的体现

1. 由于 Vue 会在实例初始化的时候对 property 进行 getter/setter 转化。所以只有在一开始就存在 data 中的数据才是响应式的。(比如在组件的created, beforeCreate钩子函数中为组件添加一个属性，这个数据不是响应式的数据)(所有需要响应式的值都要在 data 中声明，即使它目前是一个空值，也要占上位子)
2. 对象: Object.defineProperty 只能追踪一个属性是否被更改在一个对象中添加一个新属性，使用 delete 删除一个属性的时候不会触发响应式。
3. 数组：push()pop()shift()unshift()splice()sort()reverse()称为变更方法，会触发视图更新。数组长度的变化是非响应式的， arr.length = 4。通过索引来直接修改数组中的数据也是非响应式的 arr[2] = 'xujie'

### 3.2 缺陷的解决方案

Vue.set(object, 'key', 'value')          Vue.delete(object, ‘key)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948961769-8090bdd0-0191-4bf6-9b95-bd13ee28670d.png#averageHue=%23201f1e&id=HqXJA&originHeight=149&originWidth=915&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948962244-8a97cda3-8799-49fd-84d0-531ffc9d3517.png#averageHue=%23201f1e&id=eV3sP&originHeight=247&originWidth=756&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 四，Vue 3的响应式原理

### 4.1 使用 proxy 监听对象的行为

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948962627-13f51302-ffcb-4ff7-8e5f-2da9e63d4e8b.png#averageHue=%231e1e1e&id=xclq8&originHeight=563&originWidth=850&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 4.2 Proxy 和Object.definePrototy() 对比

1. 通过Proxy（代理）能够拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
2. Proxy 是对整个对象的监听。Object.definePrototy() 是对某个属性的监听。当对象嵌套层级较深时，proxy的性能较好
3. Proxy 是 ES6 的语法，兼容性较差（有点问题，但问题不大）

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676948962973-e885d1a1-f87f-4fdd-b3eb-3a08baead6c3.png#averageHue=%23ece1cc&id=G59A6&originHeight=275&originWidth=1287&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

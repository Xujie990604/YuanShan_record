# 辅助函数

## 使用Vuex的辅助函数

```js
// 从vuex导入辅助函数
import { mapSate, mapGetters, mapMutations, mapActions } from 'vuex
// computed: {
    ...mapGetters(['name'])
    ...mapGetters({
        lastName: 'name'
    })
}
```

## 使用场景

* state和getters需要在computed中引入
* mutations和actions需要在methods中引入
* 可以使用数组语法和对象语法这两种形式来引入。(引入的是对象属性，注意引用的形式)
* 引入之后就可以直接this.名字使用，就像本页面的属性和方法一样使用
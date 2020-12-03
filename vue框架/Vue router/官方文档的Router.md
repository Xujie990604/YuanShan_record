# Vue Router

## 起步

* 通过注入路由器，我们可以在任何组件中使用this.$router来访问路由器，通过this.$route来访问当前路由。
* 可以通过this.$router和router来访问路由，只不过后者需要在每一个需要路由的组件里导入路由。
* 当router-link的路由匹配成功时，将自动设置class属性值,router-link-active

## 动态路由匹配

* 我们经常需要把某种模式匹配到的所有路由都映射到一个组件里,例如/user/1 和/user/2等进入同一个同一个组件
* 配置时path:'/user/:id' 然后参数会设置到this.$route.params.id中并且可以在每个组件中使用 参数用: 标记
* router.push({name:'user',params:{id:123}}) 根据你的动态路由配置进行跳转 跳转到/user/123
* 动态路由可以设置多层参数
* 从/user/1 到/user/2时为了效率，组件会复用。意味着组件的生命周期钩子不在调用，可以使用导航卫士beforeRouteUpdate。或者使用watch($route来对路由参数的变化做出响应)

### 通配符 *

* path:'/user-*' 会匹配以/user-开头的任意路径  ‘*’的内容会添加到$route.params.pathMatch中

### 匹配优先级

* 有时候一个路径可以匹配到多个路由
* 按照谁先定义的，谁的优先级就最高

## 嵌套路由

### /

* 以/开头的嵌套路径会被当做根路径，这让你充分的使用嵌套组件，而不必设置嵌套的路径。

### 匹配空路由

* 可以通过匹配空路由来实现默认子路由

## 编程式的路由导航

* 在Vue实例的内部，可以使用$router来访问路由实例、使用this.$router.push()会在history中添加一个记录，当用户点击回退按钮时，回到之前的URL
* router.push('home') 可以是路径(patch)也可以是路由的命名(name)
* router.push({path: 'home'})
* router.push({name: 'home', params: {userId: "123"}}) 在有path参数的时候，不会处理params参数
* router.push({name: 'home', query: {city: "北京"}}) 带有查询参数，路径会变成/home?city=北京
* router.replace()不会向history里面添加记录
* go(n)在history记录中前几或者后退几步

## 命名路由

* router.push({name: 'user', params: {id: 123}}) 根据你的动态路由配置进行跳转 跳转到/user/123
* 需要配合着动态路由参数实现，id就是定义的路由参数(如果没有配置动态路由参数，直接就会进入name为user的路由，并且携带参数id：123，页面刷新的话params会丢失)

## 命名视图

* 常规的情况下，进入一个路由，只会渲染一个组件(子组件不算)。 如果使用了命名视图的话，进入一个路由会同时渲染多个组件。(并且每个组件的显示都会有一个router-view对应)

```js
 <div id="app">
      <router-link to="/">Home</router-link> --
      <router-link to="/more">more</router-link>
    //   有三个router-view出口来对应着more路由中的三个组件
    <router-view/> //对应着default的组件
    <router-view name="b"/>
    <router-view name="c"/>
  </div>

  {
    path: '/more',
    components: {
    // 在这个more的路由中，有三个组件，也就是进入more这个路由的话，会有三个router-view出口。
      default: () => import("../views/more/Aoo.vue"), //default组件对应着没有name属性的router-view
      b: () => import("../views/more/Boo.vue"),
      c: () => import("../views/more/Coo.vue"),
    }
  }
```

## 重定向和别名

* 重定向的意思是，当用户访问/a 时，URL会被替换成/b，然后匹配路由为/b
* 重定向可以{ path: '/a', redirect: '/b' }，也可以{ path: '/a', redirect: { name: 'foo' }}

```js
{
    path: '/redir',
    component: () => import("../views/redirct/Father.vue"),
    // 甚至redirect也可以是一个函数
    // to就是 目标路由 redir
    redirect: to => {
      return  to.path + "/son1";
    },
    children: [
      {
        path: 'son1',
        name: 'son1',
        component: () => import("../views/redirct/Son1.vue")
      },
      {
        path: 'son2',
        name: 'son2',
        component: () => import("../views/redirct/Son2.vue")
      }
    ]
  },
```

* 别名的意思是，/a的别名是/b的意思是，当用户访问/b时，URL会保持/b，但是路由匹配为/a，

```js
<router-link to="/home">Home</router-link>  //访问/home路由。url为/home,路由匹配到home
<router-link to="/xujie">Home</router-link> //访问/xujie路由。url为/xujie，路由匹配到home
相当于给了一个组件 多种(路径和url)被访问的方式
 {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    alias: '/xujie',
  },

```

## 路由组件的传参

* 在组件中使用route的话，会把组件和对应的路由形成高度的耦合。限制了其灵活性。
* 使用props来将路由的组件解耦，组件中使用props来接收参数
* 在路由配置中可以使用多种形式(布尔，对象，函数)来定义props。
* 然后你就可以像使用正常数据一样来，使用this.$router.params上的参数

```js

<template>
  <div class="about">
    {{id}}
  </div>
</template>
<script>
export default {
  name: 'User',
  props: {
    id: Boolean //和路由表对应。但是id的值不是Boolean。是route.params的值
  }
}
{
    path: '/user/:id',
    component: () => import('../views/User.vue'),
    prop: true //设置为true的时候,route.params会被设置为组件的属性
}
```

## history模式

* history模式需要后台的配置支持???
* 应该在Vue应用里面覆盖所有路由的情况下，定义一个404页面。

## 导航守卫

> 导航表示路由正在发生变化
> 记住参数或查询的改变并不会触发进入/离开的导航守卫(组件内的进入和离开守卫， 和路由配置表中的守卫都不会触发)(全局的前置守卫， 后置守卫， 全局解析守卫可以触发)。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

### 全局前置守卫

* router.beforeEach((to,from,next) => {...})
* to 即将要进入的目标路由对象
* from 当前导航要离开的路由对象
* next 调用方法执行的钩子函数
    1. next(false)中断当前的导航，重置到from的路由地址
    2. next()执行管道中的下一个钩子函数，如果全部钩子执行完了，那么导航的状态就是confirmed(确认)
    3. next('/login'),当前的导航被中断，进行一个新的导航， 可以添加任何在router-link和router.push()上的选项
    4. next(error)导航终止并且错误会被传递到router.onError()注册过的回调
* next()只能被严格调用一次

### 全局解析守卫

* 用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

### 全局后置钩子

* router.afterEach((to, from) => {})
* 也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身

### 路由独享的守卫

* 可以直接在路由配置上定义beforeEnter守卫

### 组件内的守卫

> beforeRouteEnter

// 在渲染该组件的对应路由被 confirm 前调用
// 不！能！获取组件实例 `this`
// 因为当守卫执行前，组件实例还没被创建

```js
next(vm => {
    // 通过 `vm` 访问组件实例
    // 通过回调函数来访问this
})
```

> beforeRouteUpdate (2.2 新增)

// 在当前路由改变，但是该组件被复用时调用
// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
// 可以访问组件实例 `this`

> beforeRouteLeave

// 导航离开该组件的对应路由时调用
// 可以访问组件实例 `this`
// 通常用来禁止用户还未保留修改就离开

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

注意**导航守卫触发的整个过程都在，组件被创建之前**

## 路由元信息

* routes配置中的每个路由对象被称之为路由记录， 一个URl可能会匹配多个路由记录
* 在$route的matched字段中， 记录了当前的$route对象都匹配了哪些路由记录
* 如果想要在不同的路由下浏览器页面有不同的标题，就在路由映射表里面定义meta对象。然后通过to来访问即将进入的路由对象，

## 路由的过渡

* 看官网

## 路由的滚动行为

* 看官网

## 路由的懒加载

* 使用一种特殊的注释的方法，可以把组件按组分块
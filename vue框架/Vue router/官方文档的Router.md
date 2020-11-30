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


# Vue Router

## 其他知识点

* 可以通过this.$router和router来访问路由，只不过后者需要在每一个需要路由的组件里导入路由。
* hash的URL很是不好看，不像是真正的URL，因此需要在Router实例中配置一下mode：'history'

## 起步

* 通过注入路由器，我们可以在任何组件中使用this.$router来访问路由器，通过this.$route来访问当前路由。
* 当router-link的路由匹配成功时，将自动设置class属性值,router-link-active

## 动态路由匹配

* 我们经常需要把某种模式匹配到的所有路由都映射到一个组件里,例如/user/1 和/user/2等进入同一个同一个组件
* 配置时path:'/user/:id' 然后参数会设置到$route.params.id中并且可以在每个组件中使用 参数用: 标记
* router.push({name:'user',params:{id:123}}) 根据你的动态路由配置进行跳转 跳转到/user/123
* 动态路由可以设置多层参数
* 从/user/1 到/user/2时为了效率，组件会复用。意味着组件的生命周期钩子不在调用，可以使用导航卫士。
* beforeRouteUpdate

## 通配符 *

* path:'/user-*' 会匹配以/user-开头的任意路径  ‘*’的内容会添加到$route.params.pathMatch中

## 匹配优先级

* 有时候一个路径可以匹配到多个路由
* 按照谁先定义的，谁的优先级就最高

## 编程式的路由导航

* 在Vue实例的内部，可以使用$router来访问路由实例
使用this.$router.push()会在history中添加一个记录，当用户点击回退按钮时，回到之前的URL
* router.push('home') 可以是路径(patch)也可以是路由的命名(name)
* router.push({path:'home'})
* router.push({name:'home',params:{userId:"123"}})
* 在有path参数的时候，不会处理params参数
* router.replace()不会向history里面添加记录
* go(n)在history记录中前几或者后退几步

## 命名路由

* router.push({name:'user',params:{id:123}}) 根据你的动态路由配置进行跳转 跳转到/user/123
* 需要配合着动态路由参数实现，id就是定义的路由参数(如果没有配置动态路由参数，直接就会进入name为user的路由，并且携带参数id：123)

## 命名视图

* 可以在一个界面里，有多个视图。

## 重定向和别名

* 重定向的意思是，当用户访问/a 时，URL会被替换成/b，然后匹配路由为/b
* 重定向可以{ path: '/a', redirect: '/b' }，也可以{ path: '/a', redirect: { name: 'foo' }}
* 别名的意思是，/a的别名是/b的意思是，当用户访问/b时，URL会保持/b，但是路由匹配为/a，

## 路由组件的传参

* 在组件中使用route的话，会把组件和对应的路由形成高度的耦合。限制了其灵活性。
* 使用props来将路由的组件解耦，组件中使用props来接收参数
* 在路由配置中可以使用多种形式来定义props。
* 然后你就可以像使用正常数据一样来，使用this.$router.params上的参数

## history模式

* 应该在Vue应用里面覆盖所有路由的情况下，定义一个404页面。

## 路由的动画

* 可以直接在router-view那里设置动画，也可以在单个页面设置动画。
* 观测路由的有关信息时。使用
  
```javascript
    watch: {
        '$route'(to,from) {
            ...
        }
    }
```

## 数据的获取

* 在路由confirm之后，申请数据，在跳转后的页面加载动画
* 在路由confirm前，在导航守卫中请求数据 。在跳转前的页面加载动画

## 滚动行为

* 在路由配置的时候定义scrollBehavior方法
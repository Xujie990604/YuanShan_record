# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.(response);
        commit("setLogo",response.data)
}

Vue的nextTick的原理，是事件循环的宏任务。

scroll插件的使用和封装和生命周期钩子函数的使用。

$attrs和$listener的使用

key使用index的话会有隐患，删除列表中项并且该项有子组件的时候可能出现错误。在diff的层面来理解key值。在不同的场景下使用key和不使用key会有不同的效率。

Vue的数据双向绑定原理

vueRouter的base属性作用
router应该是真的和数据请求的url有关。。。。,
路由的层架超过两层的话，就会在请求(axios或者下载链接)上，添加添加当前的路由的路径。那应该在哪里配置来解除干扰。(好像使用hash模式就可以改变这种现象)
router的hash模式和history模式的区别。
路由的$route是不是比created的生命周期还早？

git的实现原理

Vue在二级路由底下刷新的时候。index.html中引入的文件会在前面自动加上一层路由，导致请求失败和SPA页面有关吗。home里面的样式没有加scope，从home进入search组件的时候，search组件的样式就会受到影响。但是在search组件刷新一下的话，样式又会正常，是不是因为spa页面。在某些路由下需要请求哪个路由下面的资源，才导致index.html中的请求地址也会随着路由的变化而变化.

异步获取的数据想要在Vue中使用需要注意哪些要点
在页面中展示的话，可以给组件添加v-if，在没有数据的时候不渲染，有数据在渲染防止报错(有些时候在data中设置好默认值的话。也不会报错。) 待会回头看看city的报错问题 null和undefined想要获取属性会出问题
要是想要在computed中使用异步的数据怎么办？？？computed在初始化的时候异步数据还未请求过来就会报错。
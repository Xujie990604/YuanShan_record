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

Vue在二级路由底下刷新的时候。index.html中引入的文件会在前面自动加上一层路由，导致请求失败
# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.(response);
        commit("setTlogodos",response.data)
}

Vue的nextTick的原理，是事件循环的宏任务。

$attrs和$listener的使用

key使用index的话会有隐患，在diff的层面来理解key值。在不同的场景下使用key和不使用key会有不同的效率。

vueRouter的base属性作用

Vue在二级路由底下刷新的时候。index.html中引入的文件会在前面自动加上一层路由，导致请求失败。
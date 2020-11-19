# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.(response);
        commit("setTlogodos",response.data)
}

vm.nextTick()和Vue.nextTick()的区别

$listener的使用

遍历数组的时候key值怎么写效率最高，遍历对象的话是不是key填写item.id最好？？？虚拟DOM的工作机制原理弄明白。

vueRouter的base属性作用

Vue在二级路由底下刷新的时候。index.html中引入的文件会在前面自动加上一层路由，导致请求失败
# vue的疑问点

vue 的官网的深入了解组件的自定义事件，插槽，动态组件，和处理边界情况。

子组件使用父组件的数据，并且实现双向绑定笔记上简单写法的原理

Vue.use()是安装的意思，任何插件在使用前都需要在Vue中安装一下。都什么是插件，什么是依赖包

Vue.use()命令会内部执行install命令，用来全局注册一些组件。axios不需要注册组件，element-ui，router，需要注册组件
vuex需不需要注册组件 Vuex需要使用Vue.use()来安装插件一下

element可以使用vue add来安装安装之后会有啥效果？？？？
router的vue add 和 npm install有啥不一样？？？？

使用最新的vuecli4 的脚手架的版本，总结一下vuecli4的新功能和一些不同的东西。

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log(response);
        commit("setTodos",response.data)
}
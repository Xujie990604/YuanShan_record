# vue的疑问点

vue 的官网的深入了解组件的自定义事件，插槽，动态组件，和处理边界情况。

子组件使用父组件的数据，并且实现双向绑定笔记上简单写法的原理

Vue.use()是安装的意思，任何插件在使用前都需要在Vue中安装一下。都什么是插件，什么是依赖包

Vue.use()命令会内部执行install命令，用来全局注册一些组件。axios不需要注册组件，element-ui，router，需要注册组件
vuex需不需要注册组件 Vuex需要使用Vue.use()来安装插件一下

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log(response);
        commit("setTodos",response.data)
}

vue的父子两个组价中都对一个元素进行了css的处理，系统实现处理Vue中父组件的css还是处理子组件中的css，这涉及到css的层叠覆盖问题。
目前来看是先看子组件的再看父组件的
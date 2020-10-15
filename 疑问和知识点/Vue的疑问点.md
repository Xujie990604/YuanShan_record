# vue的疑问点

Vue.use()是安装的意思，任何插件在使用前都需要在Vue中安装一下。都什么是插件，什么是依赖包

Vue.use()命令会内部执行install命令，用来全局注册一些组件。axios不需要注册组件，element-ui，router， Vuex需要注册组件

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log(response);
        commit("setTodos",response.data)
}

vue的父子两个组价中都对一个元素进行了css的处理，是先处理Vue中父组件的css还是处理子组件中的css，这涉及到css的层叠覆盖问题。
目前来看是先看子组件的再看父组件的

父组件传给子组件的是对象(传的地址)的话，子组件修改数据是否还需要在注册事件告诉父组件。

vue中v-model和计算属性的配合使用。需要set方法吗？

# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log(response);
        commit("setTodos",response.data)
}

vue的父子两个组价中都对一个元素进行了css的处理，是先处理Vue中父组件的css还是处理子组件中的css，这涉及到css的层叠覆盖问题。
目前来看是先看子组件的再看父组件的

父组件传给子组件的是对象(传的地址)的话，子组件修改数据是否还需要在注册事件告诉父组件。
Vue中父组件和子组件谁先被创建和挂载。

vm.nextTick()和Vue.nextTick()的区别

vue中何时函数的this指向为undefined?那些在methods属性里面的函数里面的函数，this指向是undefined？？？不是window吗？
watch的定义和用法？有截图
$listener的使用

异步函数的请求： 一个函数中包含异步的请求，异步请求的下面就是需要本次请求结束才能执行的代码。如何保证已经做完了异步的请求在执行的下面的语句
一个函数中包含一个异步请求的函数，这个子函数异步请求没有结束的话，父函数是等待子函数执行完之后再执行父函数下面的函数还是,先挂起自己，直接执行自己下面的函数

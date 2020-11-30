# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.(response);
        commit("setLogo",response.data)
}

$attrs和$listener的使用

key使用index的话会有隐患，删除列表中项并且该项有子组件的时候可能出现错误。在diff的层面来理解key值。在不同的场景下使用key和不使用key会有不同的效率。

Vue的数据双向绑定原理

git的实现原理


异步获取的数据想要在Vue中使用需要注意哪些要点
在页面中展示的话，可以给组件添加v-if，在没有数据的时候不渲染，有数据在渲染防止报错(有些时候在data中设置好默认值的话。也不会报错。) 待会回头看看city的报错问题 null和undefined想要获取属性会出问题
要是想要在computed中使用异步的数据怎么办？？？computed在初始化的时候异步数据还未请求过来就会报错。
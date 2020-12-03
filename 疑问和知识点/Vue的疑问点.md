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
git的使用原理。git的分支的作用，mobil-shop因为分支的原因下载不下来。
躲不过的git使用
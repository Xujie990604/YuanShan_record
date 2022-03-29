# vue的疑问点

vuex配合着async和await的使用，async的使用用途。
async fetchTodos({commit}) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.(response);
        commit("setLogo",response.data)
}

$attrs和$listener的使用


Vue的数据双向绑定原理

git的实现原理
git的使用原理。git的分支的作用
躲不过的git使用
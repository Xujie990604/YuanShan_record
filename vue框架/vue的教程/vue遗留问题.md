# vue未解决问题

## 计算属性和监听器

## 对象的计算属性和v-model相配合

* 这次遇到的需求是使用form时绑定一个对象的计算属性，里面的input绑定form对象里面的属性。刚开始我还以为要给这个对象变量同时设置get和set。可以后面根据计算属性的定义来说，根本就不需要了
* 计算属性是当get依赖的数据发生变化时，才会触发get，我的计算属性get依赖的属性是address，可是每次我在input中输入的时候更改的就不是address对象，更改的是address对象里面的属性，在vue里面直接更改对象的属性应该是不会触发响应式的，所以不需要使用set。

```js
// template的模板
// :model="editForm" 在v-model中使用了计算属性，不需要set方法的原因是，计算属性没有被改变(vue中对象的属性被改变应该不会触发响应式)
<el-form :model="editForm">
      <el-form-item label="姓名">
        <el-input
        // v-model="editForm.name" 尽管在v-model中，并且值被更改，可是它根本就不是计算属性。get和set方法都没有
          v-model="editForm.name"
          placeholder="请输入学生的姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="editForm.password"
          placeholder="请输入学生的密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="爱好">
        <el-input
          v-model="editForm.major.majorName"
          placeholder="请输入学生的爱好"
        ></el-input>
      </el-form-item>
</el-form>

// script的定义
    export default {
  name: "Edit",
  data() {
    return {
      address: {}
    };
  },
  computed: {
    editForm: {
      get() {
        // 从上一个路由接收的参数赋值给address
        this.address = this.$route.query.editForm;
        return this.address;
      }
    }
  },
```

## 不同控件

* radio属性的input需要value来定义radio的值。然后每个radio使用v-model绑定一个变量。这个变量会与被选择的radio控件的value同步
* radio要想有默认值的话，不能用checked来指定默认值，要用Vue的变量来指定默认值

* checkbox单选框的话绑定一个布尔值，checkbox多选框的话要绑定一个数组(数组里面放的是每一个checkbox的value值)。
* checkbox单选的时候不需要有value，只是绑定一个v-model就行了。

* 绑定到input绑定到文本同步更新
* 绑定到textarea多行文本，同步更新。textarea标签中间填写的数据不会被显示

* 单选按钮绑定到一个字符串类型值上(v-model绑定到select上)
* 选择框不给value值时，option的值为标签之间的数据
* select选择框加入multiple ，可以一次选择多个属性，需要绑定到数组类型上(一次性选中，必须一次性鼠标选中)v-model也是写在select上

### 值绑定的概念

* 就是表单元素使用v-for遍历数组来生成，数据不是写死的

```javascript
<div id="example-5">
//如果v-model的初始值未能匹配任何选项，select元素将会被渲染为未选中状态，在ios中，会导致用户无法选择第一个选项
//因为这样的情况下，ios不会触发change事件，所以推荐使用这种第一个值为空的禁用选项
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```
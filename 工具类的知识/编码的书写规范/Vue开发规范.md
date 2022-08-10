<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-08-06 23:36:21
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\工具类的知识\编码的书写规范\Vue开发规范.md
 * @Description: Vue开发时的代码规范
-->
# Vue的开发规范

## 命名规范

### 普通变量的命名规范

---

* 命名方法： 小驼峰命名(pascalCase)
* 命名规范：
  1. 命名要和内容相关
  2. 命名是复数的时候需要加s，比如声明一个数组表示很多人的名字`let names
= []`
`

### 常量

---

* 命名方法：全部大写
* 命名规范： 使用大写字母和下划线来组合命名，下划线用以分割单词

```js
const MAX_COUNT = 10;
const URL = 'https://www.baidu.com'
```

### 组件命名规范

---

**官方文档推荐使用遵循规则**

PascalCase (单词首字母大写命名)是最通用的声明约定
kebab-case (短横线分隔命名) 是最通用的使用约定

1. 组件名应该始终是多个单词的，根组件 App 除外
2. 有意义的名词、简短、具有可读性
3. 命名遵循 PascalCase 约定
   * 公用组件以 Abcd (公司名缩写简称) 开头，如（AbcdDatePicker,AbcdTable）
   * 页面内部组件以组件模块名简写为开头，Item 为结尾，如（HomeSwiperItem）
   * 页面视图组件以组件模块命名。
4. 使用遵循 kebab-case 约定
   * 在页面中使用组件需要前后闭合，并以短线分隔，如`（<abcd-date-picker></abcd-date-picker>，<abcd-table></abcd-table>）`
5. 导入及注册组件时，遵循 PascalCase 约定
6. 同时还需要注意：必须符合自定义元素规范: 切勿使用保留字。

### views下的文件命名

* 尽量是名词，且使用驼峰命名法
* 使用多个单词命名
* login，index等单个单词的命名方式除外

### method方法命名规范

---

* 小驼峰命名法，统一使用动词或者动词 + 名词的形式

```js
// bad
go, nextPage, show
// good
openCarInfoTable
```

* int, refresh单词除外
* 尽量使用常用的单词开头(set,get,delete)

附： 函数方法常见的动词

```text
get 获取/set 设置,
add 增加/remove 删除
create 创建/destory 移除
start 启动/stop 停止
open 打开/close 关闭,
read 读取/write 写入
load 载入/save 保存,
begin 开始/end 结束,
edit 编辑/modify 修改,
select 选取/mark 标记
copy 复制/paste 粘贴,
insert 插入/delete 移除,
add 加入/append 添加
```

### props命名

---

* 在声明 prop 的时候，命名始终保持小驼峰形式(pascalCase)
* 在模板中使用的时候，始终使用  kebab-case

```js
props: {
  pageStart:{
    type: Number,
    default: 0
  }
}
<home-swiper page-start="5"></home-swiper>
```

### 事件的注册

* 在子组件中注册事件和在父组件中接收事件时，统一使用 kebab-case 形式

```html
<!-- 子组件中提交事件 -->
<my-home-swiper @input="$emit('change-value')"></my-home-swiper>
<!-- 父组件中监听事件 -->
<my-home @change-value="handleChangeValue"></my-home>
```

## 结构化规范

### 通用目录文件夹及子文件规范

```js
src                                        目录含义
| -- assets                                静态资源统一管理
| -- common                                公用js文件夹
| -- | -- const.js                         通用常量js文件
| -- | -- utils.js                         工具函数js文件
| -- components                            公共组件文件夹
| -- | -- common                           和业务无关的公用组件             
| -- | -- content                          和业务相关的公共组件
| -- network                               网络请求(子目录结构和view下保持一致)
| -- router                                项目路由文件夹
| -- store                                 Vuex数据文件夹
| -- views                                 视图组件文件夹
| -- | -- MyProfile                        个人信息模块文件夹
| -- | -- | -- MyProfile.vue               个人信息模块入口组件
| -- | -- | -- MyProfileChild              个人信息模块子组件文件夹
| -- App.vue                               Vue项目根目录组件
| -- main.js                               Vue项目入口文件
```

### 多个特性的元素规范

* 多个元素应该分多行编写，每个特性一行

```html
```

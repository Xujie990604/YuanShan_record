# Vue2项目规范

> Vue 项目规范以 Vue 官方规范  为基础，在其上面进行项目开发，故所有代码均遵守该规范。
> 请仔仔细细阅读 Vue 官方规范，切记，此为第一步。
> kebab-case（短横线命名）PascalCase （帕斯卡命名法，也称大驼峰）camelCase（骆驼命名法）

## 一，组件规范

### 组件文件名为 kebab-case 格式

```text
// bad 
myComponent.vue
mycomponnet.vue

// good
my-component.vue
```

### 基础组件文件名为 base 开头，使用完整单词而不是缩写

- 看到 `base-xxx` 就能知道这是一个 `基础组件`

```text
// bad
base-ui/
|--my-button.vue
|--vue-table.vue

// good
base-ui/
|--base-button.vue
|--base-table.vue
```

### 路由页面的入口组件以 page 开头

- 看到 `page-xxx`就能知道这是一个 `路由入口组件`

```text
// bad
views/
  login/
  |-- cpts
  |-- my-login.vue

// good
views/
  login/
  |-- cpts
  |-- page-login.vue
```

### 在 Template 模版中使用组件，应使用 PascalCase 模式，并且使用自闭合组件

```html
// bad
<my-component></my-component>


// good
<MyComponent/>
```

### 注册组件时使用 PascalCase 模式

```vue
<template>
  <MyComponent/>
</template>

import MyComponent from './my-component.vue'
export default{
  name: 'HomePage',
  components:{ MyComponent }
}
```

### prop 的大小写

- 写在 HTML 中使用 kebab-case 格式，写在 props 选项中使用 camelCase 格式

```vue
<MyComponnet :person-name="xxxx"></MyComponent>

props: {
  personName: {
    type: string,
    default: 'admin'
  }
}
```

### 事件命名

- 统一使用 kebab-case 格式

```javascript
// 监听事件
<MyComponnet @clik-button="clickButton"></MyComponent>
// 提交事件
this.$emit('click-button')
```

## 二，router 规范

### path 采用 kebab-case 格式

- 尽量和 Vue 文件的目录结构保持一致，因为目录、文件名都是 kebab-case，这样方便找到对应的文件

### path 必须以 / 开头，即使是 children 里的 path 也要以 / 开头

**目的**：某个页面有问题，要立刻找到这个 vue 文件，如果不用以 / 开头，path 为 parent 和 children 组成的，可能经常需要在 router 文件里搜索多次才能找到，而如果以 / 开头，则能立刻搜索到对应的组件

### name 命名规范采用 **PascalCase** 命名规范

- name 命名规范采用 PascalCase  命名规范且和 component 组件名保持一致！（因为要保持 keep-alive 特性，keep-alive 按照 component 的 name 进行缓存，所以两者必须高度保持一致）

```javascript
{
    path: '/file-page',
    name: 'FilePage',
    component: () => import('@/views/file/file-page.vue'),
    children: [
      {
        path: '/file-page/file-list',
        name: 'FileList',
        component: () => import('@/views/file/file-list.vue')
      },
      {
        path: '/file-page/file-add',
        name: 'FileAdd',
        component: () => import('@/views/file/file-add.vue')
      },
      {
        path: '/file-page/file-update',
        name: 'FileUpdate',
        component: () => import('@/views/file/file-update.vue')
      }
    ]
  }
```

## Q&A

Q: 为什么有些命名看起来既可以 PascalCase 又可以 kebab-case的，都选择了 kebab-case ？
A: 因为如果有很多同时使用 kebab-case 的话，比较方便记忆，仅此而已。

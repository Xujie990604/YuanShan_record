# Vuetify 组件库试用

* Github Star 38.8k
* 采用 Google 推出的 Material Design 设计语言

## 一、布局

* Vuetify 提供了一个应用布局系统以便于轻松创建复杂的网站设计

1. v-app-bar 一个放置导航组件、品牌展示、搜索栏和操作按钮的容器
2. v-system-bar 取代原生手机系统栏的系统栏
3. v-navigation-drawer 一个持有站点导航链接的持久性或临时性的容器
4. v-footer 一个替换默认的 html 页脚的通用组件
5. v-bottom-navigation 一个具有导航链接且通常用于较小设备的持久性或临时性的容器
  
```html
<!-- App.vue -->
<!-- v-app 是整个 Vuetify 组件的挂载点，全局只能有一个 -->
<v-app>
  <!-- 取代原生手机系统栏 -->
  <v-system-bar class="d-flex justify-center"> Vuetify 组件演示 </v-system-bar>
  <!-- 在 v-main 中放置页面内容 -->
  <v-main>
    <router-view />
  </v-main>
</v-app>
```

## 二、全局配置

* Vuetify 允许您在设置应用程序时全局或每个组件设置默认 prop 值

```ts
// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components';

// 导出 vuetify 实例
export default createVuetify({
  // 使用别名，在原组件的基础上派发出新的组件
  aliases: {
    VBtnSecondary: VBtn,
    VBtnTertiary: VBtn,
  },
  defaults: {
    // 为组件自定义 prop
    VBtn: {
      color: '#f3f4f7'
    },
    // 定义的新组件可以直接在项目中使用
    VBtnSecondary: {
      color: 'secondary',
      variant: 'flat',
    },
    VBtnTertiary: {
      rounded: true,
      variant: 'plain',
    },
    // 禁用所有组件的波纹
    global: {
      ripple: false,
    },
    // 定义嵌套在 card 中的 btn 组件 variant 属性
    VCard: {
      VBtn: { variant: 'outlined' },
    },
  },
})
```

* 默认提供程序允许您为应用程序的某个部分中的组件提供特定的默认 prop 值
  
```ts
// xxx-xxx.vue
// defaults 属性与 createVuetify 的 defaults 一致(也可以使用全局定义的别名)
<v-defaults-provider
  :defaults="{'VBtn':{'color':'primary','size':'large','variant':'tonal'}}"
>
  <v-btn>Button</v-btn>
</v-defaults-provider>
```

## 二、组件内 SASS 变量

* Vuetify 使用 SASS/SCSS 来设计框架所有方面的样式和外观，每个组件都对外暴露了 scss 变量(文档中可查)，通过对 SCSS 变量的覆盖即可达到全局的样式覆盖效果

```scss
// 修改当前文件后，需要重新编译项目后才会生效
// NOTE: 有些属性可以在多个地方进行配置，权重关系如下
// 权重关系：settings.scss < 组件内 < vuetify.ts > 组件内 + ！important
@use 'vuetify/settings' with (
  // btn
  $button-height: 40px,
  $button-banner-actions-padding: 16px,
);
```

## 三、样式和动画

### 3.1 CSS reset

* 不同的浏览会为 DOM 元素注入不同的样式(各浏览器的标准不尽相同)，CSS 重置就是为了消除这些差异
* Vuetify 内置 CSS reset, 可以在 settings.scss 文件中通过 `$reset: false` 来禁用
  
> 应用 box-sizing: border-box 到所有元素.
> 重置所有元素的 padding 和 margin .
> 在所有元素和为元素中指定 background-repeat: no-repeat .
> 继承 text-decoration 和 vertical-align 到 ::before 和 ::after.
> 在所有的浏览器中移除悬停时的 outline .
> 指定code元素的字体为 font-family: monospace .
> 重置input元素的 border-radius .
> 指定表单元素的字体继承。
> 移除所有浏览器中的默认按钮样式。
> 指定文本区域的大小调整为垂直。
> 应用 cursor: pointer 到按钮元素.
> 在 html 中应用 tab-size: 4 .
> 像标准input一样的 select 样式.
> 由aria属性设置 cursor 样式.
> 隐藏屏幕上的内容，但不隐藏屏幕阅读器。

### 3.2 动画

* 当前的 H5 项目确实在动画方面存在一定的短板，页面的操作显得生硬不流畅

<img src="./img/Vuetify组件库试用/组件动画.gif" alt="GIF Description" />

### 3.3 调色板

* 开发者可以直接访问 Vuetify 提供的 颜色值，并通过 scss 和 JS，这些值可以在样式表、组件、color 属性上使用

```html
// 语法格式为：{color}-{lighten|darken}-{n}
<v-btn color="red-lighten-3">
  no One
</v-btn>
```

* 规范中的每种颜色都会转换为背景和文本变体，以便通过`类`在应用程序中进行样式设置

```scss
// text语法格式： text-{color}-{lighten|darken}-{n}
// 背景色语法格式：bg-{color}-{lighten|darken}-{n}
<v-btn class="text-red-lighten-3 bg-grey-lighten-3">
  no One
</v-btn>
```

### 3.4 工具类

* Vuetify 将常用的 CSS 样式(阴影、颜色、间距、flex)集合都封装成了 CSS 类名，我们仅需要添加类名便能得到对应的样式，很少需要手动去写 CSS 样式代码
* 通过 js 执行操作 CSS 样式会比较繁琐，在 Vuetify 中可以直接用 JS 来操作类名(操作类名较简单)，来实现改变样式的效果
* TODO: 带来的问题是，CSS 的类名要去哪里查询？是否有插件的支持
* 和传统 css 开发形式的好处：1. 项目能达到统一的样式风格 2. 用 vuetify 提供的类名能够更好的实现响应式开发(配合断点去使用)

1. border-radius 辅助类 详见：工具类 - 边距圆角

2. 显示辅助类
   .d-{value} 用于 xs, value: none inline inline-block block table table-cell table-row flex inline-flex
   .d-{breakpoint}-{value} for sm, md, lg, xl, and xxl

| 屏幕大小            |       类名                  |
| :--------------:   | :----------------------:   |
| 全部隐藏            |     .d-none                |
| 仅在 xs 大小时隐藏   |     .d-none .d-sm-flex     |
| 仅在 sm 大小时隐藏   |     .d-sm-none .d-md-flex  |
| 全部可见            |     .d-flex                |
| 仅在 xs 大小时可见   |     .d-flex .d-sm-none      |
| 仅在 sm 大小时可见   |.d-none .d-sm-flex .d-md-none|

3. 阴影辅助类
  .elevation - {n} 0~24 n 越大，阴影明显 详见：工具类 - 阴影

4. 弹性布局辅助类

```scss
.d-flex - > display: flex;
```


```css


```

## 响应式布局

* 栅格系统、显示辅助类、断点
* Vuetify 还在 JS 层面提供了当前设备的类型，拥有 JS 代码的响应式适配(eg: 按钮点击后 pc 需要弹窗再次确认，移动端则直接进行操作)
* 裁定断点，在不同的断点内应用不同的样式
* 移动优先(xs 可忽略)： .text-xs-h1 除了手机外，还能向上影响其他的断点，.text-md-h1 笔记本、桌面端、超大屏

```scss
> 1904px        超大屏 xl
1264px><1904px  桌面端 lg
960px><1264px   笔记本 md
600px><960px    平板 sm
<600px          手机 xs
```

## 四、布局

## 五、主题(暗黑模式)

## vscode 适配

* 是否有 vscode 插件的支持？
* 对比其他UI库会有哪些体验的提升

## tree-shaking

* Vuetify 自动支持 tree-shaking 而无需任何的配置

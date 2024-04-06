# postcss 介绍

- postcss 是一个用 javaScript 工具和插件转换 CSS 代码的工具(postcss 是一个平台和 webpack 是一个概念，postcss 本身没有什么功能，只是用 JS 来处理 CSS，postcss 的插件才是实现功能的主体)
- scss 被称为预处理器，是因它的工作环节在 CSS 之前，scss 文件最终会被转化为 css 语法
- postcss 被称为后处理器，是因为它的`部分`工作环节是在 css 之后，会将 css 语法进行转化(eg： 添加浏览器后缀，编译高级语法到低级语法，px 转成 rem)

## 二、功能

### 2.1 Autoprefixer

- 根据设置的浏览器支持度，自动给 CSS 规则添加前缀

### 2.2 PostCSS Preset Env

- 将`现代` CSS 语法转化为浏览器支持程度高的语法

### 2.3 pxtorem

- 将 px 转化为 rem
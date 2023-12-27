# plugin 和 loader

## 一，插件

- 对于 webpack 现有功能的扩展，可以贯穿 Webpack 打包的生命周期，执行不同的任务比如打包优化，文件压缩, 代码检查。

### 常见 plugin

1. htmlWebpackPlugin 自动生成 HTML 模板并且引入资源文件
2. CleanWebpackPlugin 打包之前清除之前的文件
3. miniCssExtractPlugin 把 CSS 以外链文件的形式引入 HTML 中
4. copyWebpackPlugin 复制指定文件夹到 dist 目录中
5. speed-measure-webpack-plugin 查看 webpack 的构建费时情况
6. webpack-bundle-analyzer 查看打包文件的体积大小
7. optimize-css-assets-webpack-plugin 压缩 CSS
8. terser-webpack-plugin 压缩 JS(webpack 默认开启)
9. purgecss-webpack-plugin 清除无用的 CSS
10. `EsLint` 很严格的 JS 代码规范

## 二，loader

- webpack 默认支持处理 `js` 和 `json` 文件，其他类型的处理不了，需要借助 `loader` 来转化特定类型的文件，将文件转化为 webpack 能处理的类型。

### 常见 loader

1. style-loader 把 css 语句写入 style 标签中，然后插入到 html 页面里
2. css-loader 识别 CSS 语法
3. postcss-loader 识别 postcss 语法
4. sass-loader 识别 scss 语法
5. babel-loader 识别 ES6+ 语法并转移成兼容指定浏览器的 JS 代码
6. cache-loader 缓存一些性能开销较大的 loader 的处理结果
7. thread-loader 开启多进程打包优化
8. url-loader 和 file-loader 类似，但是可以将较小的文件转成 base64 的 URI，然后图片可以和其他资源放在一个请求中，减少对服务器的压力
9. vue-loader(vue 加载) 和 vue-template-compiler(vue 模板编译)

### babel

- 作用

## 三，postCSS

- postCSS 不是单纯的 plugin 或者 loader。它和 webpack 一样，`是一个工具, 是一个平台`。
- postCSS 本身并没有实际的功能，需要引入对应的插件工具后才能拥有对应的功能。

### 常见的工具

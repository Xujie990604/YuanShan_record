# Vite

* Vite 预设了场景 `WEB`, 并且将大部分常见的 WEB 构建需求都直接做成了默认的配置(TS、JSX、CSS、SCSS、LESS、POSTCSS、CSS Modules)

## 一、开发阶段

* 使用 ESBuild 进行转译(使用 GO 语言编写，可以直接转换成机器代码。能够充分利用 CPU 多核的运算)
* 开发过程中不需要事先打包应用程序，而是在应用程序`运行时`即时`编译和构建`。

### 1.1 利用缓存提速

* 已`预构建的依赖`请求使用 `HTTP 头 max-age=31536000, immutable` 进行`强缓存`，以提高开发期间页面`重新加载的性能`

### 1.2 仅执行转译

* Vite 仅执行 `.ts` 的转译工作(使用 ESBuild 将 ts 转成 js)，并`不执行`类型检查。并假定类型检查已经由 IDE 实现了。
* 因为类型检查需要了解`整个模块图`，这和 Vite 开发阶段 `按需编译` 的原则相违背。
* 同理 Eslint 的静态分析也与 Vite 的工作流程解耦
  
## 二、build 阶段

* 使用 Rollup 进行打包

## 三、index.html

* index.html 会被 Vite 视为依赖图的一部分
* 在开发阶段整个 Vite 项目目录会被视为服务器的根目录，index.html 是入口文件。在 index.html 中可以直接基于 Vite 项目目录的结构进行资源引入

## 四、浏览器支持度

1. 开发阶段：Vite 将 `esnext` 作为转化目标，假设是`现代浏览器`并支持所有最新的 js 和 css 特性，这样在开发阶段就能尽量减少 Vite 的代码转译工作，使得速度更快
2. 生产构建：支持`原生 ES 模块`、`原生 ES 动态导入` 和 `import.meta`

## 五、静态资源处理

* 服务时引入一个静态资源会返回解析后的公共路径
* css 中的 url() 以同样的方式处理
  
```js
// imgUrl 在开发时会是 /img.png，在生产构建后会是 /assets/img.2d8efhg.png。
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

* public 目录的特性和之前保持一致，永远使用根绝对路径引入

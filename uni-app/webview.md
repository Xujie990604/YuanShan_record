# Webview 的介绍

* uni-app 自带 JS 引擎(在 Web 平台，逻辑层和渲染层都运行在统一的 WebView 中，但是在小程序和 APP 端，渲染层和逻辑层被分开了(为了更好的性能))(因为这个导致 uni-app 编写的代码在小程序和 APP 中运行时不能调用 document window 等对象)(APP 端可以引入 renderJS 来实现对 DOM Window 对象的操作)
* 小程序 端由于自带一个很大的 WebView, 所以小程序端不存在 CSS 的浏览器兼容问题。
* APP 端的页面使用手机自带的 WebView 进行渲染，所以需要额外注意 APP 端的 CSS 属性浏览器兼容问题。
* APP 端的 nvue 页面不存在浏览器的兼容问题，它自带一个统一的原生渲染引擎，不依赖 WebView

* Webview 是一个基于 (webkit 内核) 的 组件，可以解析 DOM 元素，进行 HTML 页面的展示。它和浏览器展示页面的原理是相同的。
* WebView 用于在手机应用程序内部直接展示 HTML 页面，而不必额外去打开浏览器应用。
* 传统上 Webkit 内核包含：WebCore 引擎 + JavaScriptCore 引擎。但是随着 JavaScriptCore 引擎的独立性越来越强。现在的 Webkit 和 WebCore 已经基本等同于同一个概念（eg: Chrome 浏览器的 JavaScriptCore 引擎 为 V8, 但是仍然宣称使用 webkit 内核 ）

* 使用 WebView 的好处时可以不必要求用户更新APP，便可以获取到最新的页面（热更新）
* 运行在 WebView 中的 JS 代码是有能力调用原生的系统 API 的，没有传统浏览器沙箱的限制。是因为在传统浏览器中你永远不能信任加载的 WEB 内容，所以不允许调用原生的系统 API, 但是开发人员通常可以完全控制 WebView 加载的内容，所以允许 WebView 中运行的 JS 代码调用系统的 API(为什么？浏览器加载代码不可控的原因？ Webview 加载代码可控的原因？)

## 浏览器的内核

### PC 浏览器

1. IE        Trident(俗称 IE 内核)  
2. FireFox   Gecko(俗称 Firefox 内核)
3. Chrome    webkit 内核-> Blink 内核(统称为 Chromium 内核(Blink 内核 fork 了 Webkit 内核))
4. Safari    Webkit 内核
5. Opera     Presto 内核 -> Webkit 内核 -> Blink 内核

* 国内浏览器号称双内核，其实是 Trident 内核 + Webkit 内核。在访问不需要网上交易的网站时 使用 Webkit 内核，得到更高的性能。在访问需要网上交易的网站时，使用 Trident 内核

### 移动端

* 移动端的浏览器内核指的是 `系统内置浏览器` 的内核
* phone 和 IOS 主要使用 Webkit 内核， Android4.4 之前使用的是 Webkit 内核，Android4.4 之后系统浏览器切换到了 Chromium 内核

## Webview 和 浏览器的区别

1. WebView 可以在离线状态下工作，但浏览器不能
2. WebView 可以使用应用程序的缓存和数据，而浏览器不能

## Webview 与 原生的通信

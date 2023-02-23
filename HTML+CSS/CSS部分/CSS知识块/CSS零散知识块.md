<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:10:58
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\HTML+CSS\CSS部分\CSS知识块\CSS零散知识块.md
 * @Description: 
-->
# CSS零散知识点

## CSS前缀

前缀 | 浏览器 |
:-: |:-: |
-webkit | chrome和safari |
moz | firefox |
-ms | IE |
-o | opera|
根据内核来区分的，打包工具会自动添加。

## 性能

* 放置的位置： 放在 head 元素中，尽快下载 html 和 css 非常重要。
* 减少 http 请求： 控制 css 文件的数量最少，最小化 http 请求次数。使用 @import 并不能减少下载的时间，相反还会更加浪费时间，不推荐在上线的网页中使用。
* 压缩和合理缓存内容也是十分重要的步骤：
* 不让浏览器的渲染阻塞于 javascript： script 的下载放置在 body 的结束标签前面。或者在 head 中引用 script 时，使用 async 和 defer 修饰符。

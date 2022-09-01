<!--
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-09-01 16:38:58
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\Vue Cli教程\Vue项目中的静态资源.md
 * @Description:
-->
# 关于项目中使用各种类型资源时的一个汇总

## Vue 请求静态资源中的路径()

* URL中是绝对路径，URL会被直接保存下来(适合请求public文件夹中的内容)(注意此时的路径应该是基于打包后的路径)
* URL中是相对路径。URL中的内容会被作为一个模块进行请求。且基于你的文件系统中的目录结构进行解析。(适合请求assets文件夹中的内容)

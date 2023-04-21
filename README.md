# 介绍

* 一个前端程序员的成长笔记

## HTML + CSS

* 菜鸟教程
* MDN
* B站- 渡一教育- HTML + CSS入门宝典
* 渡一教育- HTML5 + CSS3教程
* 《精通CSS》

## JavaScript

* B站- 渡一教育- JavaScript 入门宝典
* 腾讯课堂- 米修在线 - JavaScript 30个实战项目彻底掌握原生JS
* 《JavaScript DOM 编程艺术》第二版
* 《JavaScript 高级程序设计》第三版
* 《JavaScript 高级程序设计》第四版
* 《JavaScript 忍者秘籍》第二版
* 《ES6 标准入门》阮一峰
* 《JavaScript语言精粹》

## 计算机网络

* B站- 计算机网络微课堂- 湖科大教书匠
* 《图解HTTP》

## Node.js

* B站- 黑马程序员- Node.js基础入门
* 《深入浅出 Node.js》

## Vue框架

* Vue.js 官方文档
* 腾讯课堂- 米修在线- 还原饿了么订餐 app 1 2 3 4
* B站- codeWhy- 2019 Vue.js全套教程
* 《深入浅出 Vue.js》
* B站- codeWhy - Vue3 + TS

## 计算机知识体系

* 《JavaScript 数据结构与算法》
* 《JavaScript 设计模式与开发实践》

## Java

* 菜鸟教程

```
// 按需加载语言文件并对页面进行一定的初始化
function initLang() {
  var langPath; // 语言文件路径
  var type;     // 语言类型
  var langName; // 语言文件对象名称
  switch (localStorage.currentLan) {
    case "1":
      type = "zh";
      langPath = "../lang/zh_strings.js";
      langName = "langZh"
      break;
    case "2":
      type = "en";
      langPath = "../lang/en_strings.js";
      langName = "langEn"
      break;
    default:
      switch (localStorage.defaultLan) {
        case "1":
          type = "zh";
          langPath = "../lang/zh_strings.js";
          langName = "langZh"
          break;
        case "2":
          type = "en";
          langPath = "../lang/en_strings.js";
          langName = "langEn"
          break;
        default:
          type = "en";
          langPath = "../lang/en_strings.js";
          langName = "langEn"
          break;
      }
  }
  // 按需加载 JS 语言文件
  $("#langScript").replaceWith('<script src=' + langPath + '><\/script>')
  console.log('加载语言文件的路径', '<script src=' + langPath + '><\/script>');
  var langData = window[langName]
  console.log('加载的语言文件', langData);

  $("[data-text]").each(function () {
    var $this = $(this);
    var name = $this.attr("data-text");
    $this.html(langData[name]);
  })
  $("[data-placeholder]").each(function () {
    var $this = $(this);
    var name = $this.attr("data-placeholder");
    $this.attr("placeholder", langData[name]);
  })
  var langMap = {};
  langMap.type = type;
  langMap.lang = langData;
  return langMap;
}
```

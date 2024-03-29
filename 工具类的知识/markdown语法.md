# Markdown 语法的使用

## 标题

使用几个#就是几级标题

## 字体

- *文字两边左右分别一个`_`号是斜体*
- **文字两边左右分别两个`*`号是加粗**
- ***文字两边左右分别三个`\*`号是斜体加粗***
- ~~文字两边左右分别两个`~`号就是删除线~~

## 引用

> 在要引用的文字面前加上 `>` 就是引用

## 分割线

---

## 图片

![图片](./../../HTTP计算机网络/img/00001.png "NETWORK")

## 超链接

[百度](http://www.baidu.com "百度的链接")

## 列表嵌套

1. 第一行
2. 1999\.若是想要用数字开头。使用\反斜杠来转义英文的句号
   1. 嵌套的第一行包含代码`JavaScript`(使用三个空格的缩进代表下一个层级)
   2. 嵌套的第二行

## 代码

使用一层和两层 \` 包含代码的效果是`JavaScript`

使用三层 \` 包含代码的效果是

```js
JavaScript;
```

## 图表

- 使用 | 分割单元格，使用 ---- 分割表头和其他行
- ----:右对齐 :----左对齐 :----:居中对齐

| 表头表头表头             |       表头       |
| :----------------------- | :--------------: |
| 行内数据行内数据行内数据 | 行内数据行内数据 |
| 行内数据                 |     行内数据     |

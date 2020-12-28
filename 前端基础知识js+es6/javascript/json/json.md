# json

## JSON的书写格式

```json
{
    "name": "xujie",
    "age": 22
}
```

* JSON是一种数据格式而不是编程语言，JSON不属于javascript
* JSON中必须使用双引号把字符串和属性名括起来(漏掉双引号和使用单引号是常见的错误)

## JSON 静态类

* JSON的优势在于可以被直接转化为可用的javascript对象。很方便。
* JSON.parse() JSON类型的字符串-->javascript数据  前端获取的后端的数据(字符串)，转化为Javascript对象的数据类型，这样就可以在前端使用了。
* JSON.stringify() javascript数据 --> JSON类型的字符串 把前端的javascript对象转化为JSON字符串传递给后端。

## JSON.stringify()

* 除了序列化对象之外还可以添加两个参数， 第一个参数是过滤器，第二个参数是用于缩进JSON字符串的选项
* 还可以使用toJSON()方法。自定义JSON序列化

## JSON.parse()

* 也可以接收第二个参数，在JSON还原为javascript数据格式的时候，使用这个还原函数。
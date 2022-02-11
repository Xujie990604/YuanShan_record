# 继承树

## document继承自HTMLDocument.prototype继承自Document.prototype   继承树，原型链

1. getElementById()方法定义在了Document.prototype上，即Element节点不能使用这个方法。(xml可以使用)

2. getElementByName()方法定义在了HTMLDocument.prototype上，即非html中的document以外不能使用。(xml,document,Element)

3. getElementsByTagName()方法定义在了Document.prototype和Element.prototype上。
    也就是说不只是document可以调用这个方法，我们自己的html元素也可以使用这个方法。

4. HTMLDocument.prototype上定义了一些常用的属性。body，head分别代表HTML文档中的```<body><head>```标签，不用再去选择。

5. Document.prototype上定义了documentElement属性，指代文档的根元素。在html文档中。他总是指代```<html>```元素
    document.documentElement 就是```<html>```
    document.body 就是 ```<body>```
    document.head 就是 ```<head>```

6. getElementByClassName,querySelectorAll,querySelector在Document.prototype,Element.prototype类中均有定义
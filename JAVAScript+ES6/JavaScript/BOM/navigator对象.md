# navigator

## navigator对象中的属性通常用于检测网页的浏览器类型

* 但是手动测试，navigator对象的某些有关浏览器名称的属性，并不能正确的对应浏览器的名称(电子欺骗导致的)。以下是在chrome浏览器中测试的
* window.navigator.appName "Netscape"
* window.navigator.appCodeName "Mozilla"
* 因此需要使用用户检测技术来检测DOM和BOM的方法能否实现。

## 检测插件

* navigator有一个属性plugins是浏览器的插件数组

## 注册处理程序

* registerContentHandler()和registerProtocolHandler()
* 这两个方法可以让一个站点指明它可以处理特定类型的信息。
* 接收三个参数，要处理的MIME类型，可以处理该MIME类型的页面的URL，和应用程序的名称。
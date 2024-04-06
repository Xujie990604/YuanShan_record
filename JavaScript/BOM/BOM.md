# BOM

## screenLeft/screenTop 和 screenX/screenY

* 相同的作用不过是不同的浏览器的支持情况不同。
* 返回的是浏览器窗口相对于屏幕的位置。
* window.screenLeft

## moveTo()/moveBy()

* 浏览器可能会禁用这两个方法
* moveTo(x,y)是移动到这个坐标，moveBy(x,y)是在当前位置的基础上移动多少距离。
* window.moveTo(x,y)

## resizeTo()和resizeBy()

* 浏览器可能会禁用这两个属性
* 其中resizeTo(x,y)接收浏览器窗口的新宽度和新高度，而resizeBy(x,y)接收新窗口与原窗口的宽度和高度之差
* window.resizeTo(x,y)

## innerHeight/innerWidth 和 outerWidth/outerHeight

* 每个浏览器的支持情况都不一样
* 在Chrome中吗，这四个值都返回视口(控制台不算视口)的大小。
* window.innerHeight

## window.open()弹出窗口

* 导航到一个特定的URL，或者打开一个新的浏览器窗口。
* 四个参数：要加载的URL地址，窗口目标，一个特性字符串，新页面是否取代当前页面的布尔值。
* var myWindow = window.open()  myWindow.close()通过close方法可以关闭通过open创建的页面。
* 主窗口的页面没有得到用于的允许不同关闭，不过弹出窗口倒是可以通过top.close()在不经用户同意的情况下关闭。
* myWindow.opener属性里面保存着打开它的原始窗口对象。
* 在chrome中可以把opener属性赋值为null，意味着切断与其他标签页的通信，且切断之后没有办法恢复。

## clientWidth/clientHeight

* 元素的尺寸大小

* clientWidth的实际宽度 clientWidth = width + 左右padding
* clientHeigh的实际高度 clientHeigh = height + 上下padding
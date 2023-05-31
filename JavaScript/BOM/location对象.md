# location对象

## location

* 提供了与当前窗口加载的文档有关的信息，还提供了一些导航功能
* 即是window对象的属性也是document对象的属性。
* 包含很多属性，href，host等

## 位置操作

### location.assign

* location.assign("http://www.baidu.com"),立即打开新的URL并且在历史记录总生成一条记录。
* 和window.location,location.href等价。
* 通过location的其他属性也可以改变URl。hash，search，hostname等，以后再研究。
* 通过修改location的属性(hash除外)来修改URl的话，页面都会以新的URL刷新。上述的任何方法(包括hash)都会在历史记录生成新的记录。用于回退键。

### location.replace()

* location.replace("http://www.baidu.com")，也是导航到新的URl，不过不会生成历史记录。
* 用户不能回退到上一个界面。

### location.reload()

* 重新加载当前的界面
* 如果不传递然和参数就会以最佳的效率重新加载，比如在本地缓存中加载
* 如果传递了参数true，就会强制从服务器加载。
* reload()后面最好不要写代码，可能不会被执行。

## Vue router的实现原理

### hash模式

* hash虽然会出现在URL中，但是不会被包括在HTTP请求中，对后端没有影响。因此改变hash不会重新加载页面
* 页面URL的散列变化的时候会触发hashchange事件。

### history模式

* 利用了H5的 pushState() 和 replaceState()方法，这两个方法应用于浏览器的历史记录栈。改变当前的URL，但是不会立刻像后端发起请求。
* 使用history的方法改变页面的URL时， 会触发window上的popstate事件。

### hash和history的区别

* pushState()设置的新 URL 可以是与当前 URL 同源的任意URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL
* pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中
  
后端请求时的区别

* hash模式下，仅仅会把hash 符号(#)之前的内容会被包含在请求中，(比如URL ```http://160.238.86.82:8003/#/user/posts``` 只会把 ```http://160.238.86.82:8003```发送到后端) 因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
* history模式下， 会把整个URL发给后端(例如URL```http://160.238.86.82:8003/#/user/posts```会把整个```http://160.238.86.82:8003/#/user/posts```全部发送给后端)，所以需要后台的支持。前端匹配不到任何URL的情况下， 要返回同一个index.html页面。这个页面就是你app依赖的页面。

history模式的缺点

* 怕刷新， 因为刷新的时候就是实实在在的去请求服务器。(并且是把完整的URL传给服务器)(需要通过后端的路由配置来解决这个问题)
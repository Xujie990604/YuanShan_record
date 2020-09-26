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
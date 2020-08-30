# 在HTML中使用javascript

## ```<script>```元素

* async属性:可选 表示立即下载脚本(异步加载)。不妨碍页面中的其他操作，比如下载其他资源和等待加载其他脚本。 只对外部脚本文件有效
* defer属性：可选 表示脚本可以延迟到文档完全被解析之后再执行。 只对外部脚本文件有效。
* type属性：可选 不是必需的如果没有指定则默认为  text/javascript

### src属性

* 没有src属性时，在解释器对```<script>```内的所有代码解释求值完毕之前，页面内的其他内容都不会被浏览器加载和显示
* 有src属性时

1. 在解释外部文件的时候(包括下载)时，页面的处理也会暂时停止。
2. 有src属性时，```<script>```标签内的代码会被忽略。
3. src也可连接网络上的js文件(jq)
4. 忽略defer和async的影响，```<script>```会按照DOM的顺序被加载。

## 标签的位置

### 普通

* ```<script>```会按照普通DOM的方式来被使用。放在body前面就会在页面显示之前下载和执行js文件。(十分不推荐，浏览器窗口会显示空白时间太长)，一般建议放在body标签内部的最后面，这样就会在页面内容都呈现完毕之后再下载和执行js文件

### 改变处理脚本的行为

#### defer延迟脚本（有的资料说只有IE能用，但是实测谷歌也可以）

* 使用这个属性的目的是：表明脚本在执行时不会影响页面的构造，脚本会被延迟到整个页面都解析完毕之后在运行。(只适用外部脚本)
* 开启新的线程下载脚本文件，并且在文档解析完成之后执行。
* 多个设置了defer属性的脚本会按照出现的先后顺序执行，并且先于DOMContentLoaded和load事件执行(按照html5的规范来说，但是现实并不一定这样)。因此最好只包含一个延迟脚本。
* 即便是延迟脚本最好也放在页面的底部。

#### async异步脚本

* 使用这个属性的目的是： 不让页面等待脚本的下载和执行。从而异步的加载页面其他的内容，因此建议在异步的脚本加载期间不要修改DOM(只适用外部脚本)
* html5新增属性，用于异步下载脚本文件，下载完毕之后立刻执行。(异步执行不会阻塞页面)(js的异步和浏览器的异步不一样，所以下载完之后能立刻执行，而不是等到主线程都执行完毕在执行异步任务)
* 多个设置了async属性的脚本并不会按照出现的先后顺序进行执行，因此保证多个异步脚本之间互不依赖很重要。
* 异步脚本一定会在页面的load事件前面前执行。可能会在DOMContentLoaded事件触发之前或者之后触发。

#### 按需加载js的方法

```javascript
 <script type="text/javascript">
        function loadScript(url, callback) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "compete" || script.readyState == "compete") {
                        //针对IE进行 IE会有一个状态码 状态码改变时会触发onreadystatechange函数 当变成compete 或者compete时，说明已经加载完成
                        callback();
                    }
                }
            } else {
                //script文件下载完的时候会触发load事件 Safari chrome firefox opera 兼容
                script.onload = function () {
                    callback();
                }
            }
            //以防js文件的下载在，src的赋值前，导致onreadystatechange事件没办法执行。下载语句写到事件绑定后，事件一定会在下载完之前被绑定。
            //只是给一个src的话不会被执行，但是会被下载(异步的下载)，只有在appendChild()方法之后才会被执行
            script.src = url;
            document.head.appendChild(script);
        }

        loadScript("tools.js", function () {
            a();
        });
        //执行这个执行语句时，这个函数的本体还没有完全被js识别。js只是把loadScript的函数名识别了一下。
        // 因为咱们要使用的a() 是被定义在tools.js里的。 如果不使用匿名函数的话所以会报错。
        // 同样， 参数是一个匿名函数， 读取参数时， 只是看到参数是一个函数， 具体内容不会看。 等真正要使用参数时。
        // js文件已将下载完了。 就能够识别了。
    </script>

```

## 推荐使用外部链式的方式来引入js文件

## 文档模式

* 混杂模式和标准模式
* 如果在文档的开始处没有发现文档类型的声明时，则所有浏览器都会开启混杂模式。

## ```<noscript>```

* 标签里面的内容只有特定情况下才会显示

1. 浏览器不支持脚本
2. 浏览器支持叫脚本，但是脚本被禁用
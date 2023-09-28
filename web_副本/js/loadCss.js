/**
 * CSS文件加载器，主要功能：动态加载CSS文件，支持加载完成时候的回调（成功 and 失败 情况下）
 * 源码实现借鉴：https://github.com/rgrove/lazyload/commit/6caf58525532ee8046c78a1b026f066bad46d32d
 * 更多关于CSS加载的坑的讨论，见：http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 *
 * 测试方法：1）将文件解压到服务器上（或用fiddler等本地文件替换） 2）访问demo.html即可
 *
 * @example
 *   loadCSS.load('style.css');
 *   loadCSS.load('style.css', function(){ alert('style.css loaded'); });
 *   loadCSS.load('style.css', function(obj){ alert('age is '+obj.age); }, {age: 24});
 *   loadCSS.load(['a.css', 'b.css'], function(){ alert('a.css and b.css are all loaded'); });
 *
 * 更多说明：目前只能判断CSS文件加载事件是否完成，至于是否出现404、5XX等，还判断不了
 * 曲线救国：回调里判断CSS里定义的某个样式是否存在/生效，借此判断CSS是否下载成功，如下
 *   loadCSS.load('sytle.css', function(){
 *      var div = document.createElement('div');
 *      div.className = 'pre_defined_class';  //pre_defined_class 为测试用的预定义类，假设为 .pre_defined_class{display:none;}
 *      var value = getStyle(div, 'display');
 *      if(value=='none'){
 *        //成功
 *      }else{
 *        //失败
 *      }
 *   })
 *
 * @version 1.0
 * @TODO: 1）静态加载的CSS文件的检测（是否成功加载）2）加载配置项
 * @author casper  chyingp@gmail.com
 *                 http://www.cnblogs.com/chyingp
 *                 http://www.zcool.com.cn/u/346408
 *
 */
var LoadCSS = (function() {

    //配置项，未实现
    var CFG = {
        POLL_INTERVAL: 50,
        MAX_TIME: 10
    };

    var head = document.head || document.getElementsByTagName('head')[0];
    var styleSheets = document.styleSheets
    var env = getEnv(); //获取用户代理信息，为浏览器差异化加载提供判断依据
    var queue = []; //CSS加载队列
    /*
      @格式1 queue队列内元素格式
      {
        urls: ['a.css', 'b.css', 'd.css'],
        callback: function(param){},  //urls里面所有CSS文件加载完成后的回调方法，可选
        obj: {age:24} //callback回调方法传入的实参
      }
     */

    function indexOf(arr, ele) {
        var ret = -1;
        for(var i = 0, len = arr.length; i < len; i++) {
            if(arr[i] == ele) ret = i;
        }
        return ret;
    }

    /**
     * @private
     * @description 返回用户浏览器代理信息，为判断不同浏览器提供依据
     * @return {Object} 格式见内部代码
     */
    function getEnv() {
        var ua = navigator.userAgent;
        var env = {};

        (env.webkit = /AppleWebKit\//.test(ua)) ||
        (env.ie = /MSIE/.test(ua)) ||
        (env.opera = /Opera/.test(ua)) ||
        (env.gecko = /Gecko\//.test(ua)) ||
        (env.unknown = true);

        return env;
    }

    /**
     * @private
     * @description gecko内核的浏览器轮询检测方法
     * 参考：http://www.zachleat.com/web/2010/07/29/load-css-dynamically/
     * @param {HTMLElement} node style节点，node.nodeName == 'STYLE'
     * @param {Object} queueObj 见@格式1
     */
    function pollGecko(node, queueObj) {
        try {

            node.sheet.cssRules;

        } catch(ex) {

            node.pollCount++;

            if(node.pollCount < 200) {

                setTimeout(function() {
                    pollGecko(node, queueObj);
                }, 50);

            } else {

                finishLoading(node.href, queueObj); //用不用略做些延迟，防止神一样的渲染问题？？

            }

            return;
        }

        finishLoading(node.href, queueObj);
    }

    /**
     * @private
     * @description webkit内核的浏览器轮询检测方法
     * @param {HTMLElement} node link节点，node.nodeName == 'LINK'
     * @param {Object} queueObj 见@格式1
     */
    function pollWebKit(node, queueObj) {

        for(var i = styleSheets.length; i > 0; i--) {

            if(styleSheets[i - 1].href === node.href) {
                finishLoading(node.href, queueObj);
                return;
            }
        }

        node.pollCount++; //轮询次数加1

        if(node.pollCount < 200) {
            setTimeout(function() {
                pollWebKit(node, queueObj);
            }, 50);
        } else {
            finishLoading(node.href, queueObj);
        }
    }

    function checkSucc(className, attr, value) {
        var div = document.createElement('div');
        div.style.cssText += 'height:0; line-height:0; visibility:hidden;';
        div.className = className;
        document.body.appendChild(div);

        return getComputedStyle(div, attr) == value;
    }

    /**
     * @description 获取节点样式值——只能获取比较简单的样式的值，一些兼容性问题不是重点，在这里不做处理，有兴趣可以看下jquery源码
     * @param {HTMLElement} node dom节点
     * @param {String} attr 样式名字，如display、visibility等
     */
    function getComputedStyle(node, attr) {
        var getComputedStyle = window.getComputedStyle;
        if(getComputedStyle) {
            return getComputedStyle(node, null)[attr];
        } else if(node.currentStyle) {
            return node.currentStyle[attr];
        } else {
            return node.style[attr];
        }
    }

    /**
     * @private
     * @description url对应的CSS文件加载完成时的回调（404也包括在内）
     * @param {String} url CSS文件的url
     * @param {Object} queueObj 见@格式1
     */
    function finishLoading(url, queueObj) {
        var index = indexOf(queueObj.urls, url);
        queueObj.urls.splice(index, 1);

        if(!queueObj.urls.length) {
            queueObj.callback(queueObj.obj);

            index = indexOf(queue, queueObj);
            queue.splice(index, 1);
        }
    }

    /**
     * @description 加载CSS的方法
     * @param {Array} urls 加载的CSS文件名队列
     * @param {Function} [callback] CSS文件队列全部加载完的回调
     * @param {Object} obj callback的参数
     * @param {Object} context
     * @return {Undefined}
     */
    function loadCSS(urls, callback, obj) {
        var queueObj = {
            urls: urls,
            callback: callback,
            obj: obj
        }
        queue.push(queueObj);

        var pendingUrls = queueObj.urls;
        for(var i = 0, len = pendingUrls.length; i < len; ++i) {

            var url = pendingUrls[i];
            var node;
            if(env.gecko) {
                node = document.createElement('style');
            } else {
                node = document.createElement('link');
                node.rel = 'stylesheet';
                node.href = url;
            }
            //node.setAttribute('charset', 'utf-8');  //设不设置有木有影响，持保留态度

            if(env.gecko || env.webkit) { //老版本webkit、gecko不支持onload

                node.pollCount = 0;
                queueObj.urls[i] = node.href; //轮询判断的时候用到，因为不同浏览器里面取到的node.href值会不一样，有的只有文件名，有的是完整文件名？（相对路径、绝对路径）

                if(env.webkit) { //之所以要用轮询，后面讨论，@TODO: 新版本的webkit已经支持onload、onerror，优化下？

                    pollWebKit(node, queueObj);

                } else {

                    node.innerHTML = '@import "' + url + '";'; //为什么这样做，猛点击这里：http://www.phpied.com/when-is-a-stylesheet-really-loaded/
                    pollGecko(node, queueObj);
                }

            } else {

                node.onload = node.onerror = function() {
                    finishLoading(this.href, queueObj);
                };
            }

            head.appendChild(node);
        }
    }

    //---------------------- 对外接口！---------------------------
    return {

        /**
         * @description 加载CSS文件
         * 考虑：成功回调，错误回调分开？
         * @param {Array|String} urls 要加载的CSS文件的文件名（相对路径，或绝对路径），比如：'style.css', ['style.css', 'test.css']
         * @param {Function} [callback] 可选：文件加载完成后的回调（成功；或失败，如404、500等）
         * @param {Object} [obj] 可选：回调执行时传入的参数
         */
        load: function(urls, callback, obj) {
            loadCSS([].concat(urls), callback || function() {}, obj || {});
        }

    };
})();
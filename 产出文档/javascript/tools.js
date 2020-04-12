// 兼容的获取浏览器可视窗口的大小
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }

}

//封装一个函数，用来兼容获得滚动轮的距离
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            x : window.pageXOffset,
            y : window.pageYOffset
        }
    }else {
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取一个元素距离文档的距离
function getElementPosition(DomElement) {
    var l = 0, t = 0;
    function a(DomElement) {
        if (DomElement.offsetParent) {
            l += DomElement.offsetLeft;
            t += DomElement.offsetTop;
            DomElement = DomElement.offsetParent;
            a(DomElement);
        } else {
            console.log(l);
            console.log(t);
        }
    }
    a(DomElement);
}

// 封装函数兼容用来查询元素的css属性
function getStyle(Element, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(Element, null)[prop];
        // 因为prop是字符串类型传进来的，所以必须用[prop]而不是.prop
    } else {
        return Element.currentStyle[prop];
    }
}

//封装函数兼容用来为元素绑定事件
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

//封装函数兼容用来取消冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//封装函数兼容用来取消默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

//封装函数兼容用来按需加载js文件的某个函数
//1.url参数传入时必须是字符串形式
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    document.head.appendChild(script);
    if (Script.readyState == "compete" || script.readyState == "loaded") {
        callback();
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
}

//封装函数用来进一步精细typeof()方法
function type(target) {
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number - object",
        "[object Boolean]": "boolean - object",
        "[object String]": "string - object"
    }

    if (target === null) {
        return null;
    }

    if (typeof (target) == 'object') {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return typeof (target);
    }
}

//封装函数用来数组去重
Array.prototype.unique = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        //没有定义过的对象属性是undefined。布尔值为false。
        //!temp[this[i]]的意思就是碰到没有定义过的属性才进行以下代码块，定义过的不处理
        if (!temp[this[i]]) {
            temp[this[i]] = "a";
            console.log(this[i]);
            arr.push(this[i]);
        }
    }
    console.log(temp);
    return arr;
}

//封装函数，返回元素e的第n层祖先
function retParent(ele, n) {
    while (ele && n) {
        ele = ele.parentElement;
        n--;
    }
    return ele;
}

//封装函数，返回元素的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负，返回前面的兄弟节点。
function retSibling(ele, n) {
    while (ele, n) {
        if (n > 0) {
            ele = ele.nextElementSibling;
            n--;
        } else {
            ele = ele.previousElementSibling;
            n++;
        }
    }
    return ele;
}

//封装函数，hasChildren方法()
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            return true;
        }
        return false;
    }
}

//封装函数用来insertAfter()
Element.prototype.insertAfter = function (targetEle, afterNode) {
    beforeNode = afterNode.nextElementSibling;
    if (beforeNode) {
        this.insertBefore(targetEle, beforeNode);
    } else {
        this.appendChild(afterNode);
    }
}

//封装函数将目标节点内部的节点顺序逆转
Element.prototype.retEle = function () {
    var all = this.children;
    var len = all.length;
    for (var i = len - 2; i >= 0; i--) {
        var target = this.removeChild(all[i]);
        this.appendChild(target);
    }
}
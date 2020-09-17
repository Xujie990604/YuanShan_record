# js疑问点

深度拷贝 封装type方法(和数组去重在同一章节) 数组的去重

setTimeout函数里面填写函数时，传递参数时必须要用字符串连接？怎么连接。
"moveElement('"+elementID+"',"+final_x+","+interval+")"字符串的连接。
call的重写方法中，eval的使用和args.push('arguments['+ i +']');为什么i的两边要加''
定时器使用var和不使用var的区别。

使用removeChild(),replaceChild()这种纯粹的DOM方法应该会删除带有的事件处理程序吧？使用innerHtml肯定是不会删除事件处理程序

使用Array.prototype.slice.call(argument,0)可以把arguments对象转化为数组，也可以把NodeList对象转换为数组。

焦点事件的支持冒泡和不支持冒泡，事件触发的机制是怎么回事。

事件的类型，看高程的事件类型  p362

# js疑问点

深度拷贝 封装type方法(和数组去重在同一章节) 数组的去重

event事件对象的使用，需要从html调用函数的时候传递吗  好像不需要在调用时传递event，直接在事件函数中使用就可以。


setTimeout函数里面填写函数时，传递参数时必须要用字符串连接？怎么连接。
"moveElement('"+elementID+"',"+final_x+","+interval+")"字符串的连接。
call的重写方法中，eval的使用和args.push('arguments['+ i +']');为什么i的两边要加''
定时器使用var和不使用var的区别。


js 的BOM的方法，下拉加载和上拉刷新。懒加载


使用Array.prototype.slice()可以把arguments对象转化为数组，也可以把NodeList对象转换为数组。
# REPL

* 输入 node 回车进入 REPL 环境
* 两次 ctrl + C 退出执行环境
* node xx.js 切换到 JS 所在的目录中，执行代码

## 全局对象

### process

* node 进程中的信息
* process.argv 中存储着我们执行 node 命令时传入的参数

## console

* console.clear() 清空打印信息
* console.trace() 打印执行栈
* 更多的 console 需要查看 node 的官网说明

## 定时器函数

* setTimeout() setInterval() setImmediate()

## global

* global 中存在很多很多属性(类似于浏览器的 window, 但是用户在全局定义的属性不会自动放到 global 中)
* JS 中不使用声明符号的变量会被放到 window 上，是 JS 的一个设计缺陷

### 特殊的全局对象

* 他们并不是真正的全局对象(不可以再控制台使用)，他们是模块中的变量，只不过每个模块都有，看起来像全局对象
* __dirname 当前文件的所在目录
* __filename 当前文件所在的目录 + 文件名
* exports module require()

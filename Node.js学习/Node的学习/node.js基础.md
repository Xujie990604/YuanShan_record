# 初识node

* node 是一个基于 Chrome V8 引擎的 JS 的运行环境
* V8 引擎使用 C++ 编写。V8 可以独立运行，也可以嵌入到任何 C++ 程序中(因此 javaScript 具有跨系统执行的优势)
* 输入 node 命令进行 node 的交互环境(类似于浏览器控制台)

## node中的js运行环境

![node中的js运行环境](img/0001.png)

## node 中运行 JS 代码

* node xx.js 切换到 JS 所在的目录中，执行代码
* process.argv 中存储着我们执行 node 命令时传入的参数

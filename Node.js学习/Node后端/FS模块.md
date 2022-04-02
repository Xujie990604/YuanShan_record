# FS文件系统模块

## 基本使用

```js
// 只要安装了node环境，就可以直接引用fs模块(因为fs模块是node内置的API)
const fs = require('fs');

// 参数一： 文件路径
// 参数二(可选)：读取文件的编码格式，默认utf-8
//参数三： 回调函数
fs.readFile(__dirname + '/1.text', 'utf-8', (err, data) => {
    console.log(err)
    console.log(data)
})

// 参数一： 文件要存放的路径(只能创建文件，不能创建目录)
// 参数二： 写入的内容
// 参数三(可选)： 以什么格式写入文件内容，默认utf-8
// 参数四： 回调函数

fs.writeFile(__dirname + '/2.text', 'aaaa',(err)=>{
    // 如果写入成功err的值为null
    // 如果写入失败，err的值为错误对象
    console.log(err)
})
```

## 路径问题

* fs模块操作文件时，若代码是相对路径。在代码运行时，会以node命令所处的目录为基准进行拼接。(在不同的目录启动文件会有不同的基础路径，导致失败)
* 使用绝对路径的话，就不会出现路径拼接失败的问题。(绝对路径中一个/不行，要加上转义字符//代表路径中的分隔符)
* __dirname代表当前文件所处的目录

## Path路径模块

* node中用来处理路径的方法

### path.join([...path])

* path.join([...path])可以接受多个路径，将多个路径拼接成一个路径
* '../'作为参数会抵消一层路径

### path.basename(path[,type])

* 使用path.basename(path[,type])从一个文件路径中，获取到文件的名称部分。(type是指定的文件类型)

```js
path.basename('/xujie/foo/name.html','.html')  //name.html
path.basename('/xujie/foo/name.html')          //name   结果中不带文件类型
```

### path.extname(path)

* 得到路径中文件的扩展名
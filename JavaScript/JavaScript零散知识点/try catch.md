# try catch

* try catch 块的优点是，当 try 中的代码有警告的话， 代码不会直接死掉而是可以在 catch 中尝试解决这个错误
* 还可以使用 throw 来自定义错误

## Error.name的六种对应的信息

1. EvalError: eval()的使用和定义不一致
2. RangeError： 数值越界
3. ReferenceError：非法或不能识别的引用数值
4. SyntaxError：发生语法解析错误
5. TypeError：操作数类型错误
6. URLError：URL处理函数使用不当

```js
try {
   ...
} catch (e) {
    console.log(e.name + e.message);
}
```

## throw

* throw 错误的时候，可以直接 throw("..."), 也可以 throw 一个 Error 对象(throw New Error("..."))

## 注意点

* try catch 只会对运行时的 error 有效， 如果代码包含语法的错误，try catch 将会无法正常工作
* try 中如果包含了计划要执行的函数， 例如 setTimeout 里面的错误不会被捕捉到(异步的错误不会被捕获到)

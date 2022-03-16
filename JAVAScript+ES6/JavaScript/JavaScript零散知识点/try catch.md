# try catch

* try catch块的优点是，当try中的代码有警告的话， 代码不会直接死掉而是可以在catch中尝试解决这个错误
* 还可以使用throw来自定义错误

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

* throw错误的时候，可以直接throw("..."), 也可以throw一个 Error对象(throw New Error("..."))

## 注意点

* try catch只会对运行时的error有效， 如果代码包含语法的错误，try catch将会无法正常工作
* try中如果包含了计划要执行的函数， 例如setTimeout里面的错误不会被捕捉到()(和任务队列的知识有关)
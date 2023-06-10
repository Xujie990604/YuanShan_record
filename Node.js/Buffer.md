# Buffer

- 在处理文件和大量二进制数据时，无法使用 JS 自带的字符串方法，需要使用 Buffer
- Buffer 所占用的内存不是通过 V8 分配的，属于堆外内存
- BUffer 和 Array 比较类似，可以通过 .length 获取长度 可以通过 [] 读写值

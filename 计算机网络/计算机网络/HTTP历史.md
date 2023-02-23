<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-02-20 22:33:32
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\计算机网络\计算机网络\HTTP历史.md
 * @Description: 
-->
# HTTP 历史

## HTTP 0.9

1. 协议规定由客户端发起请求，由服务端响应请求
2. 协议诞生之初的目的只是用来传输超文本内容 HTML, 因此仅支持 GET 请求
3. 因为仅用来传输 HTML, 所以没有多余的请求头。请求报文只有一行，响应报文只有一行
4. 以 ASCII 字符流编码的格式返回 HTML 文档
5. 服务端发送完响应就关闭 TCP 连接
6. 虽然设计理念简单，但是充分验证了 WEB 服务的可行性

## HTTP 1.0

1. 增加了 HEAD(查询资源可行性) POST 方法
2. 传输的数据不再局限于文本
3. 引入了协议版本号的概念
4. 增加了响应状态码，标记可能的错误原因
5. 增加了 HTTP Header 的概念，让 HTTP 处理请求和响应更加灵活
6. 缺点：一个 TCP 请求只能发送一个 HTTP 请求，引入了非标准字段 Connection: keep-alive 来达到复用 TCP 的目的
7. 核心改动：增加了 Header 的概念

## HTTP 1.1

1. 

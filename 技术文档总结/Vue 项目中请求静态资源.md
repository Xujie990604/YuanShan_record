# Vue 请求静态资源

## **一， Vue的public和assets文件夹的不同**

### **Public文件夹（static）**

public文件夹中的内容在打包的时候，会被原封不动的移动到dist目录中

### **Assets文件夹**

assets文件夹中被使用到的资源(没有被使用到的文件并不会被放进dist文件夹中)在打包时，会被webpack处理。由 webpack 的配置文件决定将资源放置到哪里。并且经过webpack 处理过的资源都会被加上哈希的文件名后缀，这是为了更好的应对浏览器的缓存。（有时候替换一张图片，还使用原来的名字，如果没有webpack加上这样一个动态的哈希值的话，浏览器会直接使用缓存中的图片，导致替换了之后却没有效果
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624284241-1ff2bb36-2a97-47f6-8d12-2903743168cc.png#averageHue=%23202b34&id=akHXN&originHeight=168&originWidth=689&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624284631-07972da0-0830-46c7-a52a-ae992111a576.png#averageHue=%23262728&id=QbbA8&originHeight=477&originWidth=652&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## **二，Vue对相对路径和绝对路径的处理**

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624285057-d3c56c41-f0c0-4688-b410-e3a0bdcaac8d.png#averageHue=%23fefdfc&id=yKtL7&originHeight=170&originWidth=772&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### **使用绝对路径**

当我们想要使用public文件夹中的资源时，可以使用绝对路径的形式来请求资源。Vue在识别路径时发现是一个绝对路径，URL会被直接的保存下来放到img的src属性下。代码更改之后，Vue热更新将最新的dist文件交给浏览器去识别。浏览器在解析img DOM时，直接去请求img/aaa.jpg.。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624285594-e06693db-cc57-4d8a-989d-d2d6437b5e11.png#averageHue=%23252221&id=O89CY&originHeight=71&originWidth=654&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624286109-23251838-e32b-437d-b615-80949d9bd73c.png#averageHue=%23fdfbf8&id=pybOB&originHeight=112&originWidth=564&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
因为public文件夹中的内容会被原封不动的添加到dist 文件夹中，所以可以正确的请求到图片资源。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624286627-b4aeed34-b23e-4c4d-80ac-0e5f593f3aab.png#averageHue=%23262728&id=dNBhV&originHeight=235&originWidth=663&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624287143-9235e59f-0dd7-4a67-9bb9-7c31a18ec068.png#averageHue=%23252527&id=kW7lH&originHeight=233&originWidth=652&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### **使用相对路径**

我们想要使用assets 文件夹中的内容时，需要使用相对路径的形式来请求资源。Vue在识别路径时发现是一个相对路径，会路径进行解析。
官方文档的解释：
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624287719-81a3b85c-324d-4011-9ce8-fb63f236187b.png#averageHue=%23fefdfc&id=NrjIR&originHeight=73&originWidth=763&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624288104-b4d0d309-03ca-4d09-85a9-93c11914b4c0.png#averageHue=%23242220&id=kS66o&originHeight=140&originWidth=1013&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624288435-3e425904-74c8-4083-9fde-33d6ff8dde3e.png#averageHue=%23e3d492&id=Ni46q&originHeight=47&originWidth=526&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
我们写代码的时候我们在引用文件的时候开发者所关注的目录结构是编辑器打开的这个项目文件夹。但是浏览器在识别代码时，浏览器识别的是打包后的dist文件夹。在我们使用相对路径来引入资源时，如果Vue没有对路径做处理，而是直接交付给浏览器，那么浏览器一定找不到对应的文件。所以Vue在将这部分结构打包到dist文件夹之前一定是做了一些处理，让浏览器能正确的找到资源。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624288723-5fa4937f-5d2e-4880-9769-4ff11f9530ad.png#averageHue=%2368aa76&id=yuw2y&originHeight=215&originWidth=748&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
Vue 所做的处理就是针对相对路径调用了一次require函数。
node使用的是CommonJS规范，require 语句作为 node 规范下的模块导入函数。平时在项目中使用比较多的 import … from … 是ES6的模块规范。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624289109-6646abb3-050c-4c90-aac9-e8dd2a6996c0.png#averageHue=%23faf8f7&id=AkFUu&originHeight=232&originWidth=1646&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624289394-a6725579-5b9a-4707-b6ac-74506179f7ae.png#averageHue=%23242120&id=x0NAA&originHeight=107&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624289818-88d23450-ebb7-49d8-8d0e-967017fde324.png#averageHue=%23fdfcfb&id=IFWvR&originHeight=58&originWidth=511&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

官方推荐：使用相对路径的形式来导入资源
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624290171-677c2831-8209-4339-860c-47f4f415c6a5.png#averageHue=%23fefcfb&id=nLQhT&originHeight=166&originWidth=764&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 何时使用public文件夹

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624290644-261ad7df-42bf-4d31-ab54-82ab0740a4f8.png#averageHue=%23fefdfc&id=jZ4aA&originHeight=158&originWidth=777&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## **三， 使用axios来请求本地数据**

平时在自己mock数据的时候发现的问题。自己写的本地JSON文件在使用axios和fetch进行请求时，必须放在public文件夹下，并且使用绝对路径来请求。
在使用相对路径进行请求时，发现会找不到资源并且路径并没有经过require语句进行处理。
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624290968-95bf024d-0871-4570-85b2-3afeaeb5b647.png#averageHue=%23222120&id=WXAY0&originHeight=156&originWidth=1004&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624291553-9bc8313c-b15b-47b8-80b2-ef944aa8486a.png#averageHue=%23f7f6f5&id=Cpur3&originHeight=138&originWidth=672&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624291958-12b6e5fe-8024-4b21-8d30-20ac361973af.png#averageHue=%23fdfcfa&id=vSdGw&originHeight=138&originWidth=757&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
官方文档只是明确说明这这三种情况下Vue会对相对路径进行处理。个人猜测是Vue不会对Axios中的相对路径进行处理。所以以后出现这种请求资源找不到的时候，可以先去浏览器看一下请求的路径，如果发现是因为没有被 Vue 处理而找不到文件的话，可以尝试使用require 语句来手动处理一下。

## **四， Require()函数**

1. CommonJS规范是同步的加载，会出现浏览器假死的状态，因为是同步的加载，所以完全可以当做同步代码来使用

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624292517-88fe1101-9bd0-44ef-ac81-25c37487d51d.png#averageHue=%23222120&id=OBwr5&originHeight=142&originWidth=1051&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624292999-5ef4c591-6d6a-4d37-9b49-16ee84c14cbb.png#averageHue=%23fefcf9&id=ItBXC&originHeight=89&originWidth=572&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

2. 加载JSON等数据时，返回值就是得到的数据。加载图片等资源时，返回值是一个处理过的路径。

![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624293532-ee76cf2e-fd96-4cfe-8e91-8bac7a7f5afa.png#averageHue=%23232120&id=nTP1N&originHeight=142&originWidth=1177&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/511039/1676624293969-4cf4b1f3-eccb-4d31-ac91-cd2b4ad20b7d.png#averageHue=%23fefdf9&id=h9C6d&originHeight=58&originWidth=570&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3. Require中只能填写相对路径

想要在require中填写 绝对路径的方式来访问 public 文件夹中的内容是行不通的，个人理解如下。Require是 node 提供的api。浏览器是不会识别require语句的。所以在打包 dist 完成之前。Require语句就被执行了，得到了处理过后的字符串。在打包完成之前当前的文件结构就是我们开发者创建的项目。Require会基于这个来识别路径；。所以使用绝对路径来访问public中的文件是行不通的。
这个现象和axios中只能使用绝对路径也是类似的。识别axios中的路径这一步是在浏览器的环境下执行的，浏览器得到的是dist文件夹，所以在axios中也只能通过绝对路径的形式

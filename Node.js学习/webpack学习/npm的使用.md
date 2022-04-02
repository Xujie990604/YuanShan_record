# NPM的使用

## 基础的指

* npm install(install可以简写成 i) XXX 安装插件
* npm install 按照package.json文件中的信息，自动安装所有插件
* npm uninstall XXX 卸载插件
* npm update XXX  更新插件
* npm init 初始化项目，自动生成package.json文件，方便记录项目中使用到的各种依赖信息
* npm publish 把本地自己的包上传到NPM官网上

## 版本 @ ~ ^

* ~3.2.2 的意思就是会自动匹配到3.2.x的最新版本，3.3.0的版本不会自动更新
* ^3.2.2 的意思就是会自动匹配到3.x.x的最新版本 4.x.x的版本不会自动更新(现在的npm默认的形式)
* npm安装的时候。使用@符号可以指定插件的版本

* 3.2.1

3的位置版本变化代表不能兼容的大版本变化
2的位置版本变化代表增加新的功能 可以向后兼容
1的位置版本变化代表修复了BUG 可以向后兼容

## npm本地安装和全局安装

### 全局安装

* npm install X -g(这里-g是-global的简写),通常全局包安装在node目录下的node_modules文件夹。(一般只有工具类的包才需要使用全局安装，是为了更加方便的使用包提供的命令)
* 全局安装的包可提供直接执行的命令(在所有类型的终端中都可以直接使用命令)，例如 node -v等版本号的查看。如果没有全局安装的话，想要执行某个包的命令还得去找到包所在的文件目录才能执行对应的命令。

### 本地安装

* npm install X (后面可以加几种修饰符，主要有两种--save-dev和--save),包安装在你当前项目文件夹下的node_modules文件夹中。
* 本地安装的好处是，当在一个项目中想要使用某些包时。因为包是本地安装，所以直接使用require('xxx')命令即可。
* 如果没有本地安装只有全局安装的话引入一个包就得 require('/usr/local/....')通过全局包的路径引入。十分的麻烦
* 而且一台主机上会有很多个项目，因此本地安装可以更灵活地在不同的项目使用不同版本的包，并避免全局包污染的问题，

## npm --save --save-dev 的区别

* npm install X 不会修改package.json 以后运行npm install时，不会自动安装
* npm install X --save(--save可以简写-S) 修改package.json文件，把版本号和插件名字写进dependencies(生成环境)模块中。 以后运行 npm install 会自动安装到node_modules目录中 安装到生成环境例如 vue react axios。
* npm install X --save-dev(--save-dev可以简写-D) 修改package.json文件，把版本号和插件名字写进devDependencies(开发环境)模块中。使用npm install时根据是npm包还是项目会有不同的作用。例如gulp babel webpack等辅助构建工具

* 在发布npm包的时候，本身dependencies(生成环境)下的模块会作为依赖，一起被下载；devDependencies(开发环境)下面的模块就不会自动下载了；但对于项目而言，npm install 会自动下载devDependencies和dependencies下面的模块。

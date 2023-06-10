# NPM 的使用

## 基础的指令

- npm install(install 可以简写成 i) XXX 安装插件
- npm install 按照 package.json 文件中的信息，自动安装所有插件
- npm uninstall XXX 卸载插件
- npm update XXX 更新插件
- npm init 初始化项目，自动生成 package.json 文件，方便记录项目中使用到的各种依赖信息 -y 全部使用默认信息
- npm publish 把本地自己的包上传到 NPM 官网上
- npm cache clean 清除缓存

## 版本 @ ~ ^

- ~3.2.2 的意思就是会自动匹配到 3.2.x 的最新版本，3.3.0 的版本不会自动更新
- ^3.2.2 的意思就是会自动匹配到 3.x.x 的最新版本 4.x.x 的版本不会自动更新(现在的 npm 默认的形式)
- npm 安装的时候。使用 @ 符号可以指定插件的版本

- 3.2.1

3 的位置版本变化代表不能兼容的大版本变化
2 的位置版本变化代表增加新的功能 可以向后兼容
1 的位置版本变化代表修复了 BUG 可以向后兼容

## npm 本地安装和全局安装

### 全局安装

- npm install X -g(这里 -g 是 -global 的简写),通常全局包安装在 node 目录下的 node_modules 文件夹。(一般只有`工具类`的包才需要使用`全局安装`，是为了更加方便的使用包提供的`命令`)
- 全局安装的包可提供直接执行的命令(在所有类型的终端中都可以直接使用命令)，例如 node -v 等版本号的查看。如果没有全局安装的话，想要执行某个包的命令还得去找到包所在的文件目录才能执行对应的命令。

### 本地安装

- npm install X (后面可以加几种修饰符，主要有两种 --save-dev 和 --save ),包安装在你当前项目文件夹下的 node_modules 文件夹中。
- 本地安装的好处是，当在一个项目中想要使用某些包时。因为包是本地安装，所以直接使用 require('xxx') 命令即可。
- 如果没有本地安装只有全局安装的话引入一个包就得 require('/usr/local/....') 通过全局包的路径引入。十分的麻烦
- 而且一台主机上会有很多个项目，因此本地安装可以更灵活地在不同的项目使用不同版本的包，并避免全局包污染的问题，

## npm --save --save-dev 的区别

- npm install X 不会修改 package.json 以后运行 npm install 时，不会自动安装
- npm install X --save(--save 可以简写 -S) 修改 package.json 文件，把版本号和插件名字写进 dependencies (生成环境)模块中。 以后运行 npm install 会自动安装到 node_modules 目录中 安装到生成环境例如 vue react axios。
- npm install X --save-dev(--save-dev 可以简写 -D) 修改 package.json 文件，把版本号和插件名字写进 devDependencies (开发环境)模块中。使用 npm install 时根据是 npm 包(不会下载)还是项目(会下载)会有不同的作用。例如 gulp babel webpack 等辅助构建工具

- 在发布 npm 包的时候，本身 dependencies (生成环境)下的模块会作为依赖，一起被下载。devDependencies (开发环境)下面的模块就不会自动下载了；但对于项目而言，npm install 会自动下载 devDependencies 和 dependencies 下面的模块。

## npm 指令

- npm info xxx 查看 xxx 的最新版本情况

## npx 指令

- npx 让调用项目内部模块的命令简单起来。npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量 $PATH 里面，检查命令是否存在(webpack5.2.0 以上版本支持)
- 避免全局安装模块，`npx create-react-app my-react-app` npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app

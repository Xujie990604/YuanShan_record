# 配置文件的抽离

* 创建一个文件夹放置三个配置文件
* 分别是 base.config.js 公共的配置   prod.config.js 生产时的配置  dev.config.js 开发时的配置

## 安装一个 webpack-merge 的包

* 这个包是用来合并配置文件的
* 执行开发的命令就会合并 base 和 dev 的配置文件
* 执行打包的命令就会合并 base 和 prod 的配置文件
* 开发的命令和执行的命令去 package.json 文件中定义

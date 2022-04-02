# 配置文件的抽离

* 创建一个文件夹放置三个配置文件
* 分别是base.config.js公共的配置   prod.config.js 生产时的配置  dev.config.js开发时的配置

## 安装一个webpack-merge的包

* 这个包是用来合并配置文件的
* 执行开发的命令就会合并base和dev的配置文件
* 执行打包的命令就会合并base和prod的配置文件
* 开发的命令和执行的命令去package.json文件中定义

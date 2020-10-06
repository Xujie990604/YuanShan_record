# Github

## 在github上创建仓库

* 想要在Github上分享一个自己的项目的时候，需要在github上自己创建一个仓库
* readme.md文件不是必须的，因为vscode在创建时会自动添加一个readme.md的文件
* gitingnore也不是必须的，Vscode也会自带一个这个文件
* 许可证的话选择MIT，开源

## 如何把本地的文件和github上的建立起关系

### 使用拷贝的方式(笨方法)

* 使用git clone 把github上空的文件夹拷贝下来，
* 然后把本地项目里面的文件拷贝到git下来的那个文件里，(不要带着.本地的git文件，clone下来的自带.git文件)(不需要带着node_modules文件夹，反正也会被忽略)

### 使用指令的方式

* 先在github上创建一个空的仓库，
* 然后在自己本地的项目上使用git remote add origin https://......, 建立起联系
* 在使用git push -u origin master来push进去
* 第一次的话需要使用-u
* 以后再进行push的话，不在需要带上-u，只需要git push origin master命令

## github的使用

* 点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone。一定要从自己的账号下clone仓库，这样你才能推送修改。如果从bootstrap的作者的仓库地址克隆，因为没有权限，你将不能推送修改
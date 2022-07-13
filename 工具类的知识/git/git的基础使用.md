# git

## Git的本地命令

### git init

* 通过git init命令把这个目录变成Git可以管理的仓库

### git add

* git add file1 file2  可以一次添加多个文件更改到暂存区
* git add . 将当前目录下的所有更改都添加到暂存区

### git commit -m '本次提交的说明'

* 把暂存区中的修改提交到仓库
* 一次commit可以包含多个add。尽量一次commit是有意义的。因为每次版本回退的时候，回退的是每次commit的状态。

### git diff

* git diff file 来查看某个文件在工作区和暂存区的改动(也就是说现在要git add file 的话，file中都包含哪些修改)
* git diff        查看当前目录下所有文件在工作区和暂存区的改动(也就是说现在要git add .的话。当前目录都会有哪些修改)

* git diff --cached 查看暂存区和仓库差异，
* git diff HEAD     查看工作区和仓库的差异，

### git status

* 查看当前的状态(是否有当前尚未提交到暂存区的修改，是否当前有提交到了暂存区但是没有提交到仓库的修改)

### git log

* 显示所有的commit的版本。那些一大串的十六进制数字是commit的版本号。
* 使用q来结束git log命令

### git reset --hard  commit_id

* 回退到某个指定的commit版本
* 也可以使用HEAD表示当前版本，上个版本就是HEAD^。上一百个版本HEAD~100

### git reflog

* 可以查看commit版本的穿梭历史
* (使用了回退命令后，git log命令显示commit版本会显示不全，使用git relog命令会完整的显示所有commit版本，包括因为回退而被丢弃的commit版本)

### git restore -- 文件夹(修改还未添加到暂存区)

* 当你改乱了工作区某个文件的内容，但是还没有添加到暂存区的时候。想直接丢弃工作区的修改时，用命令git restore -- file。
* 命令git restore -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
* 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
* 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
* 总之，就是让这个文件回到最近一次git commit或git add时的状态。

### git restore --staged 文件夹(修改已经添加到了暂存区)

* git restore --staged 文件夹，把暂存区的修改撤销，重新放回到工作区。然后在使用git restore -- 文件夹 丢弃工作区的修改。

## Git相关的远程命令

### git remote

* git remote add origin "GitHub上的仓库地址"   本地文件关联GitHub上的仓库(git默认远程库的名字为origin，但是也可以改成别的？？这个origin在哪体现了？？)
* git remote rm origin 解除本地和远程的绑定关系
* git remote -v 查看远程库的信息

### git push

* git push -u origin master  把本地的仓库推送到远程，其实是把当前的master分支推送到远程
* 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
* 现在起，只要本地作了提交，就可以通过命令  git push origin master把本地master分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

### 从远程仓库克隆

* 如果想要从零搭建一个项目的话，最好是先在github上创建一个仓库，然后clone下来，再将脚手架生成的文件内容复制到clone下来的仓库里(不要带上脚手架文件里面的git文件, clone下来的仓库也会带有git文件，不然的话这两个git文件会发生冲突)(git remote add origin "GitHub上的仓库地址"这条指令的作用就是将本地文件中的git信息改写成clone仓库的git信息)

### git clone 地址

* 使用这条命令就可以把github上的远程仓库克隆到本地

## Git的分支相关命令

### git checkout -b dev

* 创建dev分支并切换到dev分支，相当于两个指令
* git branch dev是创建dev分支(创建分支的意思就是基于主分支创建一个副本用来进行改动，和svn相比节省了一次拷贝的步骤)
* git switch dev 是切换到dev分支

### git branch

* 列出所有的分支，并且标记当前的分支

### git merge 指定分支

* 用于将指定的分支的改变合并到当前的分支中
* 可以会有冲突的存在，需要解决冲突

### git branch -d 分支名

* 删除指定的分支

### git log --graph

* 查看分支合并图

## vscode

* VSCode可以直接把本地的文件夹添加到GitHub上。不需要事先在GitHub上创建仓库然后clone，也不需要使用git remote命令把本地的文件夹和GitHub上的仓库建立起联系。
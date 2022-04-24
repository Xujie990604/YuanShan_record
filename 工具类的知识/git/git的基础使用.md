# git

## Git的命令

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

### git push

* 把本地的仓库推送到远程，其实是把当前的分支master推送到远程
* 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
* 现在起，只要本地作了提交，就可以通过命令  git push origin master把本地master分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

### git clone 地址

* 使用这条命令就可以把github上的远程仓库克隆到本地

### git switch -c dev

* 创建dev分支并切换到dev分支，相当于两个指令
* git branch dev是创建dev分支
* git switch dev 是切换到dev分支

### git branch

* 列出所有的分支，并且标记当前的分支

### git merge 指定分支

* 用于将指定的分支合并到当前的分支

### git branch -d 分支名

* 删除指定的分支

## 版本回退

* 每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作
* HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
* git reset --hard “HEAD^”
* 当前版本是HEAD HEAD^是上一个版本 HEAD~100是一百个版本
* 版本回退的话，回退之前的那个版本会找不到。好比你从21世纪坐时光穿梭机来到了19世纪，想再回去已经回不去了。有办法使用 git reset --hard "版本号"，就可以指定回到未来的版本。

## 工作区和暂存区

* 在电脑中看到的目录就是工作区
* git文件夹中有很多东西，其中就有暂存区和分支(master)以及分支中的指针HEAD
* 使用git add就是把东西放到暂存区
* 使用git commit就是把暂存区中的文件一次性提交
* 就算是你的工作区文件修改了，但是没有添加到暂存区的话，使用git commit命令也并不会把最新的工作区改动提交到最新的版本库版本中。

## 添加远程仓库

* 如何把本地的一个仓库和github上的仓库关联起来
* git remote add origin 地址
* git push -u origin master
* 添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

## 从远程仓库克隆

* 如果想要从零搭建一个项目的话，最好是先在github上创建一个仓库，然后clone下来

## 分支的管理

* 一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点

！！！ 在vscode中可以直接把没有提交到暂存区的改动撤销十分人性。

## vscode

* 好像可以直接使用vscode来把本地的文件夹添加到github上，不需要事先在github上建立仓库，直接上传(并创建)到同名的仓库上。
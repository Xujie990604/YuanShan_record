# git

* git的良好使用习惯，在 push 之前先 pull

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

* git diff --cached 查看暂存区和仓库差异
* git diff HEAD     查看工作区和仓库的差异

### git status

* 查看当前的状态(是否有当前尚未提交到暂存区的修改，是否当前有提交到了暂存区但是没有提交到仓库的修改)

### git log

* 显示所有的 commit 的版本。那些一大串的十六进制数字是commit的版本号。
* 使用 q 来结束 git log 命令

### git reset --hard  commit_id

* 回退到某个指定的 commit 版本
* 也可以使用 HEAD 表示当前版本，上个版本就是 HEAD^。上一百个版本 HEAD~100

### git reflog

* 可以查看 commit 版本的穿梭历史
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

* git remote add origin "GitHub上的仓库地址"   本地文件关联GitHub上的仓库(git默认远程库的名字为origin(见名识意)，这条命令的作用是把本地的git仓库和远程的仓库联系起来)
* git remote rm origin 解除本地和远程的绑定关系
* git remote -v 查看远程库的信息

### git push

* git push -u origin master  (这条命令的作用是：把本地仓库的 当前所在分支 推送到远程仓库的 master 分支上)(本地分支的名字和远程仓库的分支名字保持一致十分重要，能够很清楚的知道本地哪个分支和远程的哪个分支相对应)
* 在第一次推送本地的分支时，远程库是没有 master 分支的，所以我们加上了 -u 参数，Git不但会把本地的master分支内容推送的远程新的 master 分支，还会把本地的master分支和远程的 master 分支关联起来，在以后的推送或者拉取时就可以简化命令。
* 现在起，只要本地作了提交，就可以通过命令  git push  把本地 master 分支的最新修改推送至 GitHub 的 master 分支，现在，你就拥有了真正的分布式版本库！

### 从远程仓库克隆

* 如果想要从零搭建一个项目的话，最好是先在github上创建一个仓库，然后clone下来，再将脚手架生成的文件内容复制到clone下来的仓库里(不要带上脚手架文件里面的git文件, clone下来的仓库也会带有git文件，不然的话这两个git文件会发生冲突)(git remote add origin "GitHub上的仓库地址"这条指令的作用就是将本地文件中的git信息改写成clone仓库的git信息)

### git clone 地址

* 使用这条命令就可以把github上的远程仓库克隆到本地

## Git的分支相关命令

### git checkout -b dev

* 创建 dev 分支并切换到 dev 分支，相当于两个指令
* git branch dev 是创建 dev 分支(创建分支的意思就是基于主分支创建一个副本用来进行改动，和svn 相比节省了一次拷贝的步骤)(TODO：是基于当前分支还是基于 master 分支)
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

## 分支切换的问题

* git系统中，未 add ，commit的内容不属于任何一个分支，也就是说对于所有的分支而言，工作区和暂存区是公共的
* 如果两个分支(最后一次的commit是相同的)，可以在不add或者commit新修改的情况下切换分支(例如从a->b)，但是本来在 a 分支上的修改会被带到 b 分支上，如果此时在 b 分支上add 或者 commit，那么那些这些改动会被添加到 b 分支上。(也是验证了git系统中的暂存区和工作区是公共的)
* 如果两个分支(最后一次 的commit不一样)，那么在没有add 或者 commit的情况下，不可以切换分支。

### 不提交代码的情况下进行分支的切换

* git stash 指令，将没有add 和 commit 的内容缓存起来。
* git stash list 指令，查看缓存的列表
* git stash pop stash@{id} 在当前分支上恢复缓存的内容，并且会将此次缓存删除掉
* git stash apply stash@{id} 在当前分支上恢复缓存的内容，但是不会将这次缓存删除

## 打标签

* git tag xxx 创建标签
* git tag 展示所有标签
* git tag origin xxx 将标签推送到远程

## vscode

* VSCode可以直接把本地的文件夹添加到GitHub上。不需要事先在GitHub上创建仓库然后clone，也不需要使用git remote 命令把本地的文件夹和GitHub上的仓库建立起联系

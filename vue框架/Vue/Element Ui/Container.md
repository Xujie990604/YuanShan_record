# Container

## 布局容器基本结构

* el-container 外层容器
* el-header 顶栏容器
* el-aside侧边栏容器
* el-main主要内容区域
* el-footer底栏容器
* container的子元素只能是后四者，后四者的父元素也只能是container
* 采用了flex的构建方式

## 搭建出最基本的布局样式

* footer和header有height属性
* aside有width属性
* container有direction属性，用来自指定子元素的排列方式
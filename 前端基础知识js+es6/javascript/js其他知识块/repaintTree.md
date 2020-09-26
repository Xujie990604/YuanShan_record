# 渲染树

Domtree 采用深度优先的方式进行渲染
而且不是整个加载完html在开始渲染，而是一旦识别(解析)标签类型就把它放到Domtree上。
解析完Domtree之后才会加载完Domtree

cssTree 也是深度优先

Domtree + cssTree = randerTree

按照randerTree去渲染页面

randerTree 触发重排（reflow）的情况：dom 节点的删除，添加，dom 节点的宽高变
化，位置变化，display none ==> block，offsetWidth，offsetLeft 
repaint 重绘：效率也比较低，效率影响较小。触发情况：改颜色，图片
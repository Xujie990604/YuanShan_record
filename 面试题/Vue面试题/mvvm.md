# MVVM

* view -><- viewModel -><- model
* Model用纯javascript对象来表示，View负责显示，两者做到了最大程度的分离。把Model和View相关联起来的就是ViewModel
* 改变javascript的状态，DOM结构会产生相应的变化，关注点从如何操作DOM，变成了如何更新对象的状态

## 设计的优点

* 设计的优点：双向绑定
* MVVM的设计思想：关注Model的变化，让MVVM框架去自动更新DOM的状态。把开发者从操作DOM的繁琐步骤中解放出来
# js的基础组建的设置

## 进度条

进度条使用input标签来实现。因为input标签有value属性，设置样式时，比较简单。

## 折叠侧边栏

需要折叠的侧边栏通过fixed定位，然后在 transform: translateX(-100%);隐藏自身。
切换时，通过js来给body添加类名。然后再根据实现定义好的类名transform: translateX(200px);达到平移效果。

## 登录表单全覆盖网页，透明色背景

在正常的表单外面加上一层div，用来覆盖全网页。

```css
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
```

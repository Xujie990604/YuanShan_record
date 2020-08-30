# html css 零散知识点

* Font Awesome的css链接 <!-- fontawesome字体图标引入 -->
```<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">```
* css的渐变色属于背景图片的分类
* object-fit 指定可替换元素的行为
  1. contain 保留长宽比，不足的地方添加“黑边”
  2. cover 保留长宽比，多余的地方进行裁剪
  3. fill 不保留长宽比，不足的地方进行拉伸
* transparent 颜色css3属性，全透明色。

* :before和:after特点
伪元素是通过样式来达到元素效果的，也就是说伪元素不占用dom元素节点，引用:before,:after伪元素妙用里面总结的，:before和:after伪元素的主要特点如下：

伪元素不属于文档，所以js无法操作它

伪元素属于主元素的一部分，因此点击伪元素触发的是主元素的click事件

原文说块级元素才能有:before, :after，其实是不妥的，大部分行级元素也可以设置伪元素，但是像img可替换元素，因为其外观和尺寸有外部资源决定，那么如果外部资源正确加载，就会替换掉其内部内容，这时伪元素也会被替换掉，但是当外部资源加载失败时，设置的伪元素是可以起作用的。

1. 优点

* 减少dom节点数
* 让css帮助解决部分js问题，让问题变得简单
  
1. 缺点

* 不利于SEO
* 无法审查元素，不利于调试

## css变量的使用

:root {
    --primary-color:#5fbaa7;
}
h1 {
    color: var(--primary-color);
}

## reset.css

* 为什么不推荐使用通配符然后，margin为0，padding为0，因为通配符选择器选择所有的元素，当网站的元素太多时，会妨碍执行效率
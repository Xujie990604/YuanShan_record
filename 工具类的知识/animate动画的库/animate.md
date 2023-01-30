# animate动画库的引用

## 最佳实践

* 添加有意义的动画，使用入口和出口动画来确定界面中发生的事情的动向
* 不要为大元素设置动画
* 不要为根元素设置动画
* 避免无限的动画
* 注意元素的初始状态和最终状态
* 不要禁用prefers-reduced-motion媒体查询

## 陷阱

* 无法为内联元素设置动画
* 使用 overflow 来管理溢出。
* 无法使用 css 做到实现重复之间的间隔，需要使用 javascript 来实现

## 使用

```html
<!-- 直接在DOM元素上加上animate__animated来声明动画，再添加带有animate__前缀的css类名来添加动画 -->
<div class="animate__animated animate__swing ">动画</div>

<!-- 也可以不用在DOM上添加类名，直接在DOM的css中写入animation: 动画名字; -->
.test {
    animation: bounce;
    animation-duration: 2s;  //不要忘记了设计动画的时间
}
```

## css自定义属性(css变量)

* animate是通过css变量来控制动画的持续时间，延迟和迭代。

```css
/* 更改局部的css变量 */
.animate__animated.animate__swing {
    --animate-duration: 5s;
    --animate-delay: 5s;
    --animate-repeat: 3;
}
/* 更改整体的css变量 */
:root {
    --animate-duration: 5s;
}
```

## 实用的程序类

### 延迟类

在--animate-delay为一秒的情况下。如果在：root中重新定义了--animate-delay属性，那么延迟类对应的延迟秒数也会根据：root中的属性调整(--animate-duration,--animate-repeat这两个属性同理)

* animate__delay-2s === 2s
* animate__delay-3s === 3s
* animate__delay-4s === 4s
* animate__delay-5s === 5s

### 动画的速度

* animate__slow === 2s
* animate__slower === 3s
* animate__fast === 800ms
* animate__faster === 500ms

### 重复的次数

* animate__repeat-1 === 1次
* animate__repeat-2 === 2次
* animate__repeat-3 === 3次
* animate__infinite === infinite次

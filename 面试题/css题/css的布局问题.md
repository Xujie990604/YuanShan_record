# css的布局问题

## 水平垂直居中方案

### 需要固定宽高的

* absolute和top: 50%; left: 50%; margin-left: 负宽度的一半，margin-top: 负高度的一半;(相对定位配合负边距)
* absolute和top: calc(50% - 子元素宽度的一半); left: calc(50% - 子元素宽度的一半);(相对定位配合着 calc函数)

### 不需要固定宽高的

* absolute和transform: translate(-50%, -50%);配合使用
* absolute和四个方位设置为零，margin：auto;
* flex和align-items，justify-content进行使用
* flex和margin: auto;进行搭配使用 并且margin的分配是在justify-content分配之前。

## 行内元素的垂直居中(这两天语句不是设置在子元素上，而是设置在父元素上)

* line-height: height的高度;
* text-align: center;(这条语句不单单是让文字水平居中，同时也可以让块级元素内的行内元素水平居中 例如div中的span元素)

## 几列布局

### 两列布局

#### 有一方定宽，另一方伸缩

* 定宽的float，伸缩的加上margin-left: 定宽的宽度;
* 定宽的float，伸缩的触发BFC，好处是可以直接给float一个margin就能分开。
* 定宽的absolute，top: 0;。伸缩的margin-left: 定宽宽度;
* 使用flex,定宽的flex: 0 0 200px; 伸缩的flex: 1 1 auto;

### 三列布局

* 两侧 absolute，定宽。中间的两侧加上定宽的大小的 margin-left 和 margin-right
* 使用flex，两侧flex: 0 0 200px; 中间flex: 1 1 auto;
* 使用浮动,只需要把中间的的 DOM 放在后面就可以了。两侧的分别左右浮动。
* 双飞翼布局和双飞翼布局

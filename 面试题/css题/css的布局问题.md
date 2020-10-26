# css的布局问题

## 水平垂直居中方案

### 需要固定宽高的

* absolute和margin-left: 负宽度的一半，margin-top: 负高度的一半;
* absolute和四个方位设置为零，margin：auto;

### 不需要固定宽高的

* absolute和transform(-50%,-50%)配合使用
* flex和align-items，justify-content进行使用
* flex和margin: auto;进行搭配使用 并且margin的分配是在justify-content分配之前。

## 行内元素的水平垂直居中

* line-height: height的高度;
* text-align: center;

## 几列布局

### 两列布局

#### 有一方定宽，另一方伸缩

* 定宽的float，伸缩的加上margin-left: 定宽的宽度;
* 定宽的float，伸缩的触发BFC，好处是可以直接给float一个margin就能分开。
* 定宽的float: left;，并且使用浮动相反的负边距100%.伸缩项的float: left;。里面的子元素margin-left: 定宽的宽度;
* 定宽的absolute，top: 0;。伸缩的margin-left: 定宽宽度;
* 使用flex,定宽的flex: 0 0 200px; 伸缩的flex: 1 1 auto;

### 三列布局

* 两侧absolute，定宽。中间的两侧加上定宽的大小的margin-left和margin-right
* 使用flex，两侧flex: 0 0 200px; 中间flex: 1 1 auto;
* 使用浮动,只需要把中间的的DOM放在后面就可以了。两侧的分别左右浮动。
* 双飞翼布局
* 圣杯布局
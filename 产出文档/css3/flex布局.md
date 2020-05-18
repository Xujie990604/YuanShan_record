# 弹性盒子布局

## 容器的属性

1. flex-direction：主轴项目的排列方式
    (默认值)row 左 → 右             row-reverse 右 → 左
    column 上 → 下          column-reverse 下 → 上

2. flex-wrap：换行
    (默认值)nowrap:不换行           wrap：第一行在上
    wrap-reverse：第一行在下

3. flex-flow：是flex-direction和flex-wrap的缩写

4. justify-content：定义项目在主轴上的对齐方式
    (默认值)flex-start：左对齐          flex-end：右对齐
    center：居中            space-between：两端对齐，项目间隔一样
    space-around：每个项目两端的间隔相等

5. align-items：定义项目在交叉轴方向的排列方式
    (默认值)stretch 高度一致，与最高的一样高
    flex-start:交叉轴起点对齐
    flex-end:交叉轴终点对齐
    center：居中
    baseline:项目第一行的文字基线对齐

6. align-content(定义了多根轴线的对齐方式)
    (默认值)stretch：轴线占满整个交叉轴
    flex-start:与交叉轴的起点对齐
    flex-end:与交叉轴的终点对齐
    center : 与交叉轴的中点对齐
    space-between:与交叉轴的两端对齐，轴线之间的间隔平分
    space-around:每根轴线两端的间隔都相等

## 项目的属性

1. flex是个缩写：
    flex-grow：无比例单位(剩余空间的放大比例)。
    flex-shrink：缩小比例(溢出空间的缩小比例)
    flex-basis：在放大缩小项目之前的空间大小，先按照此项分配空间，然后再根据放大和缩小比例进行调整。(主轴方向的高或者宽)
    flex默认值：（0 1 auto）

2. 可以使用align-self属性允许单个项目与其他项目有不一样的对齐方式。可覆盖align-items属性。(默认继承父元素)

3. order定义项目的排列顺序：数值越小越靠前。默认为0；

## flex布局中失效的css属性

1. float
2. clear
3. column
4. vertical-align

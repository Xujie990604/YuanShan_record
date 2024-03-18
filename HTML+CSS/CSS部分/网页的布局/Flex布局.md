# 弹性盒子布局

## 一、容器的属性

### 1.1 flex-direction(主轴项目的排列方式)

1. (默认值)row 左 → 右
2. row-reverse 右 → 左
3. column 上 → 下
4. column-reverse 下 → 上

### 1.2 flex-wrap（换行）

1. (默认值)nowrap:不换行
2. wrap：第一行在上
3. wrap-reverse：第一行在下

### 1.3 flex-flow

* 是 flex-direction 和 flex-wrap 的缩写

### 1.4 justify-content(定义项目在主轴上的对齐方式)

1. (默认值)flex-start：左对齐
2. flex-end：右对齐
3. center：居中
4. space-between：两端对齐，项目间隔一样
5. space-around：每个项目两端的间隔相等

### 1.5 align-items：定义项目在交叉轴方向的排列方式(单行时使用的属性)(只有在align-item是默认值的时候，才会与最高项默认对齐，填充满容器。在其他属性的时候会恢复元素默认的大小。)

1. (默认值)stretch 如果父容器有固定高度那就拉伸填充满父容器，如果父容器没有固定高度，那就和最高的子项一样高。
2. flex-start:交叉轴起点对齐
3. flex-end:交叉轴终点对齐
4. center：居中，保持原有高度
5. baseline:项目第一行的文字基线对齐

### 1.6 align-content(定义了多根轴线的对齐方式,和flex-direction的作用很是相似)(多行时定义的属性)(多行轴线的权重大于单行轴线的权重)

1. (默认值)stretch：轴线占满整个交叉轴,如果父容器有固定高度就拉伸填满父容器
2. flex-start:与交叉轴的起点对齐
3. flex-end:与交叉轴的终点对齐
4. center: 与交叉轴的中点对齐
5. space-between:与交叉轴的两端对齐，轴线之间的间隔平分
6. space-around:每根轴线两端的间隔都相等

## 二、项目的属性

* flex 是个缩写：flex-grow flex-shrink flex-basis;

### 2.1 flex-grow

* 无比例单位, `剩余空间`的放大比例。在根据 basis 属性设置完之后，把剩余的空间按照比例分配放大。

### 2.2 flex-shrink

* 缩小比例(溢出空间的缩小比例)
* 在根据 basis 属性设置完之后，把多余的空间按照自己的 basis 和 shrink 的乘积系数占总的 basis 和 shrink 的乘积和的比例进行缩小，目的是让大的元素缩小的更多。

### 2.3 flex-basis

* 在放大缩小项目之前的空间大小(基础值)，先按照此项分配空间，然后再根据放大和缩小比例进行调整。

* auto: 从 width 和 height 那里获得尺寸，如果没有规定那么就根据内容来分配大小。
* 0: 不在这一步获取内容的基础大小，直接到系数那里分配大小。basic 为 0 的话，width 属性的设置也会不起作用。使用 flex 的属性比 width 的优先级要高，(不考虑书写的顺序)。max-width 和 min-width 的优先级比 flex 的优先级要高。

### 2.4 flex 简写

1. flex默认值：（0 1 auto）
2. flex: 1; 代表 flex:1 1 0;
  
### 2.5 align-self

* 允许单个项目与其他项目有不一样的对齐方式。可覆盖 align-items 属性。(默认继承父元素)
  
### 2.6 order

* 定义项目的排列顺序：数值越小越靠前。默认为 0
* 使得内容的显示可以不同于源顺序，这样的好处是不用破坏良好的 html 结构的情况下，有一个更加良好的阅读体验。

## 三、flex布局中失效的css属性

1. float
2. clear
3. column
4. vertical-align

## 四、flex 的特点

* 图片视频等带有自己的宽高比的对象，作为伸缩项的时候会有问题，解决方案是给这些元素添加一个包装元素。
* flex 的可伸缩项也会有一个隐形的最小的宽度，不会比内容区更小，为了精准控制最好给项加一个 min-width 来规范
* flex 的元素可以直接设置 z-index 属性。创建新的堆叠上下文，不需要使用定位属性。
* 行内元素设置为弹性盒子需要设置 display 为 inline-flex
* 在 flex 的多行布局中，设置了同样的比例系数 `flex: 1;`，如果最后一行只有一个元素的话，就会占满一行，很不美观，所以可以通过 `max-width` 属性来限制每个子项目的最大宽度

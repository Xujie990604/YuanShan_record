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

5. align-items：定义项目在交叉轴方向的排列方式(单行时使用的属性)(只有在align-item是默认值的时候，才会与最高项默认对齐，填充满容器。在其他属性的时候会恢复元素默认的大小。)
    (默认值)stretch 如果父容器有固定高度那就拉伸填充满父容器，如果父容器没有固定高度，那就和最高的子项一样高。
    flex-start:交叉轴起点对齐
    flex-end:交叉轴终点对齐
    center：居中，保持原有高度
    baseline:项目第一行的文字基线对齐

6. align-content(定义了多根轴线的对齐方式,和flex-direction的作用很是相似)(多行时定义的属性)(多行轴线的权重大于单行轴线的权重)
    (默认值)stretch：轴线占满整个交叉轴,如果父容器有固定高度就拉伸填满父容器，
    flex-start:与交叉轴的起点对齐
    flex-end:与交叉轴的终点对齐
    center : 与交叉轴的中点对齐
    space-between:与交叉轴的两端对齐，轴线之间的间隔平分
    space-around:每根轴线两端的间隔都相等

## 项目的属性

1. flex是个缩写：
    flex-grow：无比例单位(剩余空间的放大比例)
    在根据basis属性设置完之后，把剩余的空间按照比例分配放大。

    flex-shrink：缩小比例(溢出空间的缩小比例)
    在根据basis属性设置完之后，把多余的空间按照自己的basis和shrink的乘积系数占总的basis和shrink的乘积和的比例进行缩小，目的是让大的元素缩小的更多。

    flex-basis：在放大缩小项目之前的空间大小(基础值)，先按照此项分配空间，然后再根据放大和缩小比例进行调整。(主轴方向的高或者宽)
    auto的意思是，从width和height那里获得尺寸，如果没有规定那么就根据内容来分配大小。
    content会根据内容的大小来分配大小，会忽略width和height   目前很多并不支持
    0 的话就是不在这一步获取内容的基础大小，直接到系数哪里分配大小basic为0的话，width属性的设置也会不起作用。使用flex的属性比width的优先级要高，(不考虑书写的顺序)。max-width和min-width的优先级在flex全部分配完之后。

    flex默认值：（0 1 auto）

    flex:1;代表 flex:1 1 0;
    在flex的多行布局中，同时设置了比例系数，如果最后一行只有一个元素的话，就会占满一行，很不美观，所以可以通过max-width属性来限制每个子项目的最大宽度
    在一定的容器中直接给单个子项的margin设置为auto那么直接垂直居中

2. 可以使用align-self属性允许单个项目与其他项目有不一样的对齐方式。可覆盖align-items属性。(默认继承父元素)

3. order定义项目的排列顺序：数值越小越靠前。默认为0，使得内容的显示可以不同与源顺序，这样的好处是不用破坏良好的html结构的情况下，有一个更加良好的阅读体验。

## flex布局中失效的css属性

1. float
2. clear
3. column
4. vertical-align

## flex的特点

* 图片视频等带有自己的宽高比的对象，作为伸缩项的时候会有问题，解决方案是给这些元素添加一个包装元素。
* flex的可伸缩项也会有一个隐形的最小的宽度，不会比内容区更小，为了精准控制最好给项加一个min-width来规范
* flex的元素可以直接设置z-index属性。创建新的堆叠上下文呢，不需要使用定位属性。

## 行内元素设置为弹性盒子需要设置display为inline-flex

## 一个项目设置为flex，那么他的直接子节点也会表现为flex???啥意思呀

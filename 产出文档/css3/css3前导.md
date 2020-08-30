# css3前导

## css3前缀

前缀 | 浏览器 |
:-: |:-: |
-webkit | chrome和safari |
moz | firefox |
-ms | IE |
-o | opera|
根据内核来区分的，打包工具会自动添加。

## border-radius

复合属性时 从左上角开始，顺时针旋转。
圆角属性的每一个值又可以拆成水平方向和垂直方向。
border-top-left-radius :20px 30px;

可以去控制台调数据实时更新

## box-shadow

可选值为两到4个。前两个偏移量必须填写。阴影就是类似于影子。通过偏移不被DOM元素遮挡来显示出来。影子本来是很清晰的，通过模糊半径来控制多大的区域是模糊的，阴影扩展半径来控制影子的大小。
box-shadow: x轴偏移量 y轴偏移量 [阴影模糊半径，模糊部分的大小] [阴影扩展半径，阴影大小缩放] [阴影颜色] [投影方式,默认向外投影];

shadow的css样式是性能杀手，占性能。

## text-shadow

text-shadow: x轴偏移量 y轴偏移量 [模糊程度] [颜色];

## 颜色值rgba

rgba(红，绿，蓝，透明度);

## 渐变

### 线性渐变

linear-gradient(方向，颜色，颜色，...)
方向: to top/right/left/bottom 和deg角度值
颜色: red 10%, 说明红色渐变到10%的位置

### 镜像渐变

radial-gradient: 渐变起点的坐标,颜色，颜色;

渐变坐标的起点: circle 100px at center center;

1. circle圆
   * 100px 指定了渐变的半径。
   * 位置指定可以用关键字(top,left,bottom,right)，数值数字(100px)。

2. ellipse 椭圆
   *渐变的半径分长轴和短轴

## font-face 自定义字体样式

@font-face {
    font-family: myFont;
    src: url('diyFont.eot');  IE9+
    url('diyFont.woff)format('woff');  chrome firefox
    url('diyFont.ttf)format('truetype');  chrome firefox opera safari android ios4.2+
    url('diyFont.svg#fontname)format('svg');   ios4.1+
}
font-family: myFont;

format里面的值填写的是字体的格式，因为浏览器无法通过后缀来自动识别字体样式。

## background-origin 背景图片起始区域

background-origin: border-box|padding-box(默认值)|content-box;

## background-clip裁减背景

background-origin: border-box|padding-box|content-box|no-clip(不裁剪);

## background-size 背景大小尺寸

background-size: 尺寸;

1. cover 根据可供使用的地方，进行拉伸和缩小，最终占满整个屏幕。
2. contain 保留图片原有的比例，进行放大和缩小。
3. 也可以使用数值和百分比

## background-position 背景图片定位

background-position: center|100px|20%;

## vh，vm，vw

* vh相对于视口的高度，视口被均分成100的单位的vh
* vw相对于视口的宽度，视口被分成100单位的vw
* vm 相对于视口的高度或者宽度中最小的那一个，其中最小的那一个被均分为100个单位的vm
* 视口的定义是浏览器内部的可视区域的大小，不包含任务栏标题栏，以及底部的工具栏的浏览器区域大小

### 使用场景

* 元素的尺寸限制，免得溢出浏览器窗口。
* 实现视口覆盖，弹出框的蒙版。
* vw, vh视区大小相关单位只适用于非定位元素的高度相关属性上！ //zxx: 高度相关属性如 – height/min-height/max-height/line-height/padding-top/padding-bottom等。因为在定位元素上可以使用%。来实现相同的效果。
* body使用100vh实现固定一屏，没有滚动条的效果。

## 高斯模糊

* 
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

## background-position 背景图片定位

background-position: center|100px|20%;

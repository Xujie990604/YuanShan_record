# css3前导

## css3前缀

前缀 | 浏览器 |
:-: |:-: |
-webkit | chrome和safari |
moz | firefox |
-ms | IE |
-o | opera|
根据内核来区分的，打包工具会自动添加。

## 渐变

### 线性渐变

* 渐变可以使用在任何支持image的属性上使用
* linear-gradient(方向，颜色，颜色，...)
方向: to top/right/left/bottom 和deg角度值
颜色: red 10%, 说明红色渐变到10%的位置 (也可以填写数值)

### 镜像渐变

radial-gradient: 渐变起点的坐标,颜色，颜色;

渐变坐标的起点: circle 100px at center center;

1. circle圆
   * 100px 指定了渐变的半径。
   * 位置指定可以用关键字(top,left,bottom,right)，数值数字(100px)。

2. ellipse 椭圆
   *渐变的半径分长轴和短轴

### 放射渐变和重复渐变

* 精通css p124

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

# canvas

## 基本使用

* 默认值为width300px高度150px
* 该元素也可以用css来定义大小，但是在绘制时，图像会自动伸缩以适应它的框架尺寸，如果css的尺寸和初始画布的比例不一致，它会出现扭曲。
* canvas刚开始会完全透明，canvas可以设置margin，border，background的等属性
* canvas标签之前写的内容会在不支持canvas的浏览器中被渲染，如果支持canvas则不会显示。

### 渲染上下文

* canvas创建了一个固定大小的画布，公开了一个或者多个渲染上下文。
* getContext()方法，用来获取渲染上下文。
  
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

## 绘制矩形

* 绘制一个填充的矩形  fillRect(x,y,width,height)
* 绘制一个矩形的边框 strokeRect(x,y,width,height)
* 清除指定矩形区域，让清除部分完全透明 clearRect(x,y,width,height)

## 绘制路径

* 图形的基本元素是路径，一个路径，甚至是一个子路径都是闭合的。
* 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。 beginPath()
* 闭合路径之后图形绘制命令又重新指向到上下文中。 ClosePath()
* 通过线条来绘制图形轮廓  Stroke()
* 通过填充路径的内容区域生成实心的图形。  fill()
* 闭合路径不是必须的(如果图形已经是闭合的那么该函数什么也不做)(当调用fill()函数时，所有没有闭合的形状都会闭合，但是stroke()函数不会)
* ！！！画图的时候不需要画全(三角形的话只需要两条线，然后使用fill或者是closePath来闭合)

### 移动笔触

* moveTo(x,y)将笔触移动到指定的坐标上
* 通常使用moveTO()来绘制一些不连续的路径。(例如笑脸，如果不用moveTo()函数移动坐标的话，在不连续的路径之间会有连线)

### 绘制线

* lineTo(x,y)绘制直线，绘制一条从当前位置到指定x,y位置的线
* 画不连续的线时，使用moveTo()函数来改变下一次的开始位置。(绘制线之前必须先指定一个起始位置，使用moveTo()

### 绘制圆弧

* arc(x,y,radius,startAngle,endAngle,anticlockwise)
* x，y为绘制圆弧的圆心坐标
* startAngle以及endAngle参数用弧度定义了开始以及结束的弧度 弧度 = (Math.PI / 180) * 角度
* 参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向

### 绘制矩形(以路径的方式)

* rect(x,y,width,height)  绘制矩形
* 当执行该方法时，moveTo()自动设置坐标参数(0,0)

### 二次贝塞尔曲线和三次贝塞尔曲线

* 以后用到在学

## Path2D对象

* 简化代码，提高性能。
* 以后用到在学。

## 添加样式和颜色

* fillStyle = ""  设置图形的填充颜色
* strokeStyle = "" 设置图形轮廓的颜色

### 添加透明度

* 可以使用globalAlpha属性来设置，(0.0 ~ 1.0)适合给大量相同透明度的图形使用
* 推荐使用rgba(0,0,0,0.5)

### 其他好多有关样式的属性

* 以后用到在学

## 绘制文本

* fillText(text,x,y,[maxWidth])  在指定的位置填充指定的文本，绘制的最大宽度是可选的
* strokeText(text,x,y,[maxWidth])  在指定的位置填充指定的文本边框，绘制的最大宽度是可选的

```javascript
ctx.font = "48px serif";
ctx.fillText("Hello world", 10, 50);
```

### 文本的其他样式

## 使用图片

## 动画

### requestAnimationFrame(callback) 在浏览器下次重绘之前调用指定的回调函数更新动画

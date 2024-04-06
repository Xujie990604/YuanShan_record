# meta元数据

不会显示在页面上，但是可以再计算机上解析。
浏览器（如何显示内容或重新加载页面），搜索引擎（关键字）和其他 Web 服务都使用元数据。

一共有四个属性 charset, name, http-equiv(相当于http的作用， 比如定义一些http的参数), content

## 定义和用法

```html
<!-- 定义字符集 -->
<meta charset="UTF-8">
```

```html
<!-- 定义搜索引擎的关键字： -->
<meta name="keywords" content="HTML, CSS, JavaScript">
```

```html
<!-- 定义您的网页描述： -->
<meta name="description" content="Free Web tutorials for HTML and CSS">
```

```html
<!-- 定义页面的作者： -->
<meta name="author" content="John Doe">
```

```html
<!-- 每30秒刷新一次文档： -->
<meta http-equiv="refresh" content="30">
```

```html
<!-- 设置视口，以使您的网站在所有设备上看起来都不错：
width=device-width部分将页面的宽度设置为跟随设备的屏幕宽度(视设备而定)
initial-scale=1.0部分设置浏览器首次加载页面时的初始缩放级别。 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

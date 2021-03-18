# 1. 响应式开发

### 1.1 响应式开发原理

就是通过媒体查询针对不同的宽度的设备进行布局和样式的设置，从而适配不同的设备

| 设备划分                 | 尺寸区间           |
| ------------------------ | ------------------ |
| 超小屏幕（手机）         | < 768px            |
| 小屏设备（平板）         | >= 768px ~ < 992px |
| 中等屏幕（桌面显示器）   | >= 992px ~ <1200px |
| 宽屏设备（大桌面显示器） | >= 1200px          |

### 1.2 响应式布局容器

响应式需要一个父级作为布局容器，根据布局容器的宽度来修改页面的样式和布局

平时我们的响应式尺寸划分

* 超小屏幕（<768px）：设置宽度为100%
* 小屏幕（>=768px）：设置宽度为750px
* 中等屏幕（>=992px）：设置宽度为970px
* 大屏幕（>=1200px）：设置宽度为1170px

# 2. Bootstrap前端开发框架

### 2.1 Bootstrap 简介

Bootstrap来自Twitter，是目前最受欢迎的前端框架，Bootstrap是基于HTML、CSS和JS的

它简洁灵活，使得Web开发更加快捷。

* 官网：http://getbootstrap.com
* 推荐：http://boostrap.css88.com （这里文档写的比较全）

##### 2.1.1 优点

* 标准化的html+css编码规范
* 提供了一套简洁、直观、强悍的组件
* 有自己的生态圈，不断的更新迭代
* 让开发更简单，提高了开发效率

### 2.2 Bootstrap使用

1. 创建文件夹结构
2. 创建html骨架结构
3. 引入相关样式文件
4. 书写内容

##### 2.2.1 创建文件夹结构

* css
* js
* fonts

##### 2.2.2 创建html骨架

```html
<!-- 要求当前网页使用IE浏览器最高版本的内核渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 视口的设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!--[if lt IE 9]>
	解决IE9以下浏览器对html5新增标签的不识别，并导致CSS不可用的问题
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	解决IE9以下浏览器对于css3 media query的不识别
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
```

##### 2.2.4 书写内容

* 直接用Bootstrap预设定好的样式
* 修改Bootstrap原有的样式，注意权重问题
* 学好Bootstrap的关键在于知道**它定义了怎样的样式，以及这些样式会带来怎样的效果**

### 2.3 布局容器

Bootstrap需要为页面和栅格系统包裹一个.container容器，bs预先设定好了这个类，叫做.container

它提供了两个作此作用的累

##### 2.3.1 container类

* 响应式布局的容器，固定宽度
* 超小屏幕（<768px）：设置宽度为100%
* 小屏幕（>=768px）：设置宽度为750px
* 中等屏幕（>=992px）：设置宽度为970px
* 大屏幕（>=1200px）：设置宽度为1170px

##### 2.3.2 container-fluid类

* 流式布局，百分比宽度
* 占据整个视口
* **适用于单独移动端开发**

# 3. Bootstrap栅格系统

### 3.1 栅格系统简介

栅格系统（grid systems）也有人翻译为“网格系统”，它是将页面布局划分为等宽的列，然后通过列数的定义来模块化布局。

### 3.2 栅格选项参数

栅格系统用于通过一些列的行（row）和列（column）的组合来创建页面布局，你的内容就可以放在这些创建好的布局中

|                     | 超小屏幕（<768px） | 小屏（>=768px） | 中屏（>=992px） | 大屏（>=1200px） |
| ------------------- | ------------------ | --------------- | --------------- | ---------------- |
| .container 最大宽度 | 自动（100%）       | 750px           | 970px           | 1170px           |
| 类前缀              | .col-xs-           | .col-sm-        | .col-md-        | .col-lg-         |
| 列（column数）      | 12                 | 12              | 12              | 12               |

* 行（row）必须放在container布局容器中
* 我们实现列的平均划分，需要给列添加**类前缀**
* xs-extra small：超小；sm-small：小；md-medium：中等；lg-large：大
* 如果列（column）大于12，多余的“列”所在的元素将被作为一个整体另起一行排列
* 每一个默认有左右15像素的padding
* 可以同时为一列指定多个设备的类名，以便划分不同份数，例如class="col-md-4 col-sm-6"

### 3.3 列嵌套

栅格系统内置的栅格系统将内容再次嵌套，简单理解就是**一个列内再次分成若干小份**。我们可以添加一个新的`.row`元素和一些列的`.col-sm-`元素到已经存在的`-col-sm-`元素中

```html
<!-- 列嵌套 -->
<div class="col-md-4">
    <!-- 我们列嵌套最好加一个行，这样可以去掉父元素的padding值，而且高度和父元素相同 -->
    <div class="row">
        <div class="col-md-6">1-1</div>
        <div class="col-md-6">1-2</div>
    </div>
</div>
```

### 3.4 列偏移

使用`.col-md-offset-*` 可以使列向右偏移，这种作用其实就是为当前元素增加了margin-left

```html
<div class="row">
    <div class="col-md-4">a</div>
    <!-- b向右偏移4份 col-md-offset-4 -->
    <div class="col-md-4 col-md-offset-4">b</div>
</div>

<div class="row">
    <!-- c占6份，想要居中对齐，就要往右偏移3份 -->
    <div class="col-md-6 col-md-offset-3">c</div>
</div>
```

### 3.5 列排序

通过使用`.col-md-push-*`和`col-md-pull-*`可以很容易的改变列的顺序

```html
<div class="row">
    <!-- col-md-push 往右边移 -->
    <div class="col-md-4 col-md-push-8">左边</div>
    <!-- col-md-pull 往左边移 -->
    <div class="col-md-7 col-md-offset-1 col-md-pull-5">右边</div>
</div>
```

### 3.6 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容

| 类名       | 超小屏 | 小屏 | 中屏 | 大屏 |
| ---------- | ------ | ---- | ---- | ---- |
| .hidden-xs | 隐藏   | 可见 | 可见 | 可见 |
| .hidden-sm | 可见   | 隐藏 | 可见 | 可见 |
| .hidden-md | 可见   | 可见 | 隐藏 | 可见 |
| .hidden-lg | 可见   | 可见 | 可见 | 隐藏 |

```html
<div class="row">
    <div class="col-md-3 col-sm-4">1</div>
    <div class="col-md-3 col-sm-4">2</div>
    <!-- 1. 使用.hidden-sm在小屏隐藏 -->
    <!-- 2. 既然在小屏隐藏，那么其他元素的排列方式就要改变为4份了 -->
    <div class="col-md-3 hidden-sm">我在小屏隐藏!!!!!!!</div>
    <div class="col-md-3 col-sm-4">3</div>
</div>
```

与之相反的是`visible-xs`、`visible-sm`、`visible-hd`、`visible-lg`显示。

<div class="row">
    <div class="col-md-4 col-sm-3">1</div>
    <div class="col-md-4 col-sm-3">2</div>
    <div class="col-md-4 col-sm-3">3</div>
    <!-- 1. 使用.visible-xs在小屏显示 -->
    <!-- 2. 既然在小屏显示，那么其他元素的排列方式就要改变为3份了 -->
    <div class="visible-sm col-sm-3">我在小屏显示!!!!!!</div>
</div>

```html
<div class="row">
    <div class="col-md-4 col-sm-3">1</div>
    <div class="col-md-4 col-sm-3">2</div>
    <div class="col-md-4 col-sm-3">3</div>
    <!-- 1. 使用.visible-xs在小屏显示 -->
    <!-- 2. 既然在小屏显示，那么其他元素的排列方式就要改变为3份了 -->
    <div class="visible-sm col-sm-3">我在小屏显示!!!!!!</div>
</div>
```

# 4. 移动端布局总结

### 4.1 移动端主流方案

##### 4.1.1 单独制作移动端页面（主流）

* 京东商店手机版
* 淘宝手机版
* 苏宁易购手机版
* ......

##### 4.1.2 响应式页面兼容移动端（其次）

* 三星手机官网
* ......

### 4.2 移动端技术选型

* 流式布局（百分比布局）
* flex 弹性布局（**推荐**）
* rem 适配布局（**推荐**）
* 响应式布局

**建议：选择一种作为主要技术选型，其他作为辅助，这种混合技术开发**


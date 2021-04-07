# 目标

* 能够说出什么是jQuery
* 能够说出jQuery的优点
* 能够简单使用jQuery
* 能够说出DOM对象和jQuery对象的区别

# 1. jQuery概述

### 1.1 JavaScript库

**JavaScript库**：即`library`，是一个封装好的特定的集合（方法和函数）。简单理解，就是一个JS文件，里面封装了一些原生JS实现的功能。比如jQuery，就是为了快速方面的操作DOM，里面基本都是函数（方法）。

**常见的JS库**：

* jQuery
* Prototype
* YUI
* Dojo
* Ext JS
* 移动端的zepto

### 1.2 jQuery的概念

jQuery是一个快速、简介的JS库，其设计的宗旨是"Write less, Do more"，即倡导写更少的代码，做更多的事。

j就是JavaScript，Query查询：意思就是查询JS，将JS中的DOM操作进行封装，这样可以快速查询使用里面的功能

jQuery封装了JS中的常见功能代码，优化了`DOM操作`、`事件处理`、`动画设计`和`Ajax交互`

### 1.3 jQuery的优点

* 轻量级，核心文件几十kb，不会影响页面的加载速度
* 跨浏览器兼容，基本兼容了现在主流的浏览器
* 链式编程、隐式迭代
* 对事件、样式、动画支持，大大简化了DOM操作
* 支持插件扩展开发，有丰富的第三方插件，例如：树形菜单、日期控件、轮播图等
* 免费、开源

# 2. jQuery的基本使用

### 2.1 jQuery下载

官方地址：https://jquery.com/

版本：

* 1.x：兼容IE6,7,8等低版本浏览器，官网不再更新
* 2.x：不兼容IE6,7,8等低版本浏览器，官网不再更新
* 3.x：不兼容IE6,7,8等低版本浏览器，官网主要更新维护版本

各版本下载：https://code.jquery.com/

### 2.2 jQuery使用

1. 在页面中引入`jQuery`源文件
2. 在JS文件中写代码

### 2.3 jQuery入口函数

```javascript
$(document).ready(function() {
    // 1. 传统写法
});
$(function() {
    // 2. 新版写法
});
```

1. 等待所有DOM需要的元素加载完毕即可开始执行，不必等待所有的外部资源。
2. 相当于原生JS中的`DOMContentLoaded`
3. 原生JS中的`load`事件是等所有的资源（图片、JS文件、CSS文件等）加载完后

### 2.4 jQuery顶级对象`$`

* `$`是jQuery的别称，可以使用`jQuery`代替`$`，但是一般为了方便，我们直接使用$

* `$`也是jQuery的顶级对象，相当于原生JS中的`window`。把元素利用$包装成jQuery对象，就可以调用jQuery方法

### 2.5 jQuery对象和DOM对象

1. 用`原生JS`获取的对象叫`DOM对象`
2. 用`jQuery`获取的对象叫`jQuery对象`
3. jQuery对象本质：利用`$`对`DOM元素`包装后产生的对象（用伪数组储存）
4. jQuery对象`不能使用`原生JS的属性和方法

DOM对象和jQuery对象之间是可以`互相转换`的

因为原生JS比jQuery更大，原生的一些属性和方法jQuery没有给我们封装，要想使用这些属性和方法需要把jQuery对象转换为DOM对象

##### 1. DOM对象转换为jQuery对象

```javascript
// (1). 直接获取为jQuery对象
$("video");
// (2). DOM对象转换为jQuery对象
const myDiv = document.querySelector("video");
$(myDiv); // 此时myDiv转换为了jQuery对象
```

##### 2. jQuery对象转换为DOM对象

```javascript
$("video")[0];
$("video").get(0);
```




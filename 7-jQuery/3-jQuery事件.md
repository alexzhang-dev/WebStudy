# 目标

* 能够说出4种常见的注册事件
* 能够说出on绑定事件
* 能够说出jQuery事件委派的优点以及方式
* 能够说出绑定事件与解绑事件

# 1. jQuery事件注册

### 单个事件注册

**语法**：

```javascript
element.事件(function(){})
```

```javascript
$("div").click(function(){ 点击事件 });
```

其他事件与原生JS基本一致，比如：

`mouseover`、`mouseout`、`blur`、`focus`、`change`、`keydown`、`keyup`、`resize`、`scroll`等



# 2. jQuery事件处理

### 2.1 事件处理`on()`绑定事件

##### 优势一：可以绑定多个事件

`on()`方法在匹配元素上绑定一个或多个事件的处理函数。

**语法**：

```javascript
element.on(events, [selector]. fn)
```

**举例**：

```javascript
$("div").on({
    click: function() {
        $(this).css("backgroundColor", "purple");
    },
    mouseover: function() {
        $(this).css("backgroundColor", "skyblue");
    },
});
```

**如果处理程序都是一样的，那么可以这么写**：

```javascript
$("button").on("mouseenter mouseleave", function() {
    alert("111");
});
```

##### 优势二：可以事件委派操作

事件委派的定义是：把原来添加给子元素的事件添加给父元素，利用事件冒泡的原理最终给每个子元素。

```javascript
$("ul").on("click", "li", function() {
    alert("hello world");
});
```

之前使用`bind()`、`live()`、`delegate()`等方法，新版本请使用`on()`替代

##### 优势三：可以给动态创建的元素绑定事件

动态创建的元素，使用`click()`无法绑定事件，但是`on()`可以

```javascript
$("ol").on("click", "li", function() {
    console.log("1111");
});
const li = $("<li>我是动态创建的</li>");
$("ol").append(li);
```


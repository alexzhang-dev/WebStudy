# 目标

* 能够写出常见的jQuery选择器
* 能够操作jQuery样式
* 能够写出常用的jQuery动画
* 能够操作jQuery属性
* 能够操作jQuery元素
* 能够操作jQuery元素尺寸、位置

# 1. jQuery选择器

### 1.1 jQuery基础选择器

原生JS获取元素的方式有很多，很杂，而且兼容性情况不一致，因此jQuery给我们做了封装，使获取元素统一标准。

```javascript
$("选择器") // 里面直接写CSS选择器即可，记得加引号
```

| 名称       | 用法              | 描述                  |
| ---------- | ----------------- | --------------------- |
| ID选择器   | `$("#id")`        | 获取指定ID的元素      |
| 全选选择器 | `$("*")`          | 匹配所有元素          |
| 类选择器   | `$(".class")`     | 获取同一类class的元素 |
| 标签选择器 | `$("div")`        | 获取同一类标签的元素  |
| 并集选择器 | `$("div,p,li")`   | 获取多个元素          |
| 交集选择器 | `$("li.current")` | 交集元素              |

### 1.2 jQuery层级选择器

| 名称       | 用法         | 描述                                       |
| ---------- | ------------ | ------------------------------------------ |
| 子代选择器 | `$("ul>li")` | 使用`>`只获取子级元素，不获取子级的子级    |
| 后代选择器 | `$("ul li")` | 使用`空格`获取所有的子元素，包括子级的子级 |

### 1.3 jQuery筛选选择器

| 语法       | 用法            | 描述                                  |
| ---------- | --------------- | ------------------------------------- |
| :first     | `$("li:first")` | 获取第一个li元素                      |
| :last      | `$("li:last")`  | 获取最后一个li元素                    |
| :eq(index) | `$("li:eq(2)")` | 获取第3个li元素，index是索引号从0开始 |
| :odd       | `$("li:odd")`   | 获取索引为奇数的li元素                |
| :even      | `$("li:even")`  | 获取索引为偶数的li元素                |

### 1.4 隐式迭代

**知识铺垫**

jQuery设置样式

```javascript
$("div").css("属性", "值")
```

遍历内部DOM元素（伪数组储存）的过程叫做`隐式迭代`。简单理解就是内部帮助我们迭代我们匹配的元素，不需要我们手动操作。

### 1.5 jQuery筛选方法（重点）

| 语法                 | 用法                         | 说明                                             |
| -------------------- | ---------------------------- | ------------------------------------------------ |
| `parent()`           | `$("li").parent()`           | 查找父级（返回最近一级）                         |
| `children(selector)` | `$("ul").children("li")`     | 相当于`$("ul>li")`，只找子元素                   |
| `find(selector)`     | `$("ul").find("li")`         | 相当于`$("ul li")`，后代选择器                   |
| `siblings(selector)` | `$(".first").siblings("li")` | 查找兄弟节点，不包括本身                         |
| `nextAll([expr])`    | `$(".first").nextAll()`      | 查找当前元素后面的所有兄弟元素                   |
| `prevAll([expr])`    | `$(".last").prevAll()`       | 查找当前元素前面的所有节点                       |
| `hasClass(class)`    | `$("div").hasClass("nav")`   | 检查当前元素是否包含某个特定的类，如果有返回true |
| `eq(index)`          | `$("li").eq(2)`              | 相当于`$("li:eq(2)")`从0开始                     |

### 1.6 jQuery中的排他思想

```javascript
// jQuery隐式迭代让所有的button增加了点击事件
$("button").click(function() {
    // 1. 当前元素变化背景颜色
    $(this).css("background", "pink");
    // 2. 其余的兄弟去掉背景颜色
    $(this).siblings().css("background", "");
});
```

记住`siblings()`

### 1.7 jQuery的链式编程

链式编程可以减少代码量

```javascript
$("button").click(function() {
    $(this).siblings().css("color", "");
    $(this).css("color", "red");
});
```

以上代码是一个非常简单的排他思想案例，我们可以通过使用链式编程来简化代码

```javascript
$("button").click(function() {
    $(this).css("color", "red").siblings().css("color", "");
});
```

使用链式编程时要注意`在操作哪个元素`

# 2. jQuery样式操作

### 2.1 操作css方法

jQuery可以使用css方法来修改简单的元素样式，也可以操作类，修改多个样式。

##### 1. 参数只写属性名，则返回属性值（带单位）

```javascript
$(this).css("color");
```

##### 2. 参数有2个，则第1个是属性名，第2个是修改的属性值

属性名记得加`""`，属性值如果是是数字，不需要加引号，如果不是数字记得加单位，例如`px`、`rem`

```javascript
$(this).css("width", "300px")
$(this).css("height", 300)
```

##### 3. 参数可以是对象形式，方便设置多组样式

属性名和属性值记得用`:`分开，这里的属性名可以省略`""`，如果是复合属性，记得使用驼峰命名法，如果不是数字属性值记得加`""`。

```javascript
$("div").css({
    width: 300,
    height: 400,
    backgroundColor: "red",
});
```

### 2.2 设置类样式方法

作用相当于之前的`classList`，可以操作类样式，注意参数类名不要加点

##### 1. 添加类

```javascript
$("div").addClass("current");
```

##### 2. 删除类

```javascript
$("div").removeClass("current");
```

##### 3. 切换类

```javascript
$("div").toggleClass("current");
```

### 2.3 类操作和className的区别

原生JS中的`className`会覆盖元素的原class

jQuery里面的`类操作`只会对指定类进行操作，不会覆盖原来的类名

# 3. jQuery效果

jQuery给我们封装了很多`动画效果`，最为常见的如下：

| 效果       | 方法                                              |
| ---------- | ------------------------------------------------- |
| 显示隐藏   | `show`、`hide()`、`toggle`                        |
| 滑动       | `slideDown()`、`slideUp()`、`slideToggle`         |
| 淡入淡出   | `fadeIn()`、`fadeOut()`、`fadeToggle`、`fadeTo()` |
| 自定义动画 | `animate()`                                       |

### 3.1 显示隐藏效果

##### 1. 显示语法规范

```javascript
show([speed, [easing], [fn]]);
```

##### 2. 显示参数

* 参数可以都省略，无动画直接显示

* `speed`：速度，有3个值`slow`、`normal`、`fast`或者直接写毫秒数，例如`1000`，表示1000毫秒。

* `easing`：指定切换效果，默认是`swing`，可选参数`linear`（匀速）
* `fn`：回调函数，在动画完成时执行函数，每个元素执行1次




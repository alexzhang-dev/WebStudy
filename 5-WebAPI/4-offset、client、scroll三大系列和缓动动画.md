# 目标：

* 能够说出常见的`offset`系列属性的作用
* 能够说出常见的`client`系列属性的作用
* 能够说出常见的`scroll`系列属性的作用
* 能够封装简单动画函数
* 能够写出网页轮播图案例

# 1. 元素偏移量 offset 系列

### 1.1 offset概述

`offset`翻译过来就是偏移量，我们使用`offset`系列相关属性可以`动态`得到该元素的位置（偏移）、大小等

* 获取元素距离`带有定位`的父元素的位置
* 获取元素自身的大小（宽度高度）
* 注意：返回的数值`不带单位`

### 1.2 offset系列常见属性

| 属性                   | 作用                                                         |
| ---------------------- | ------------------------------------------------------------ |
| element.`offsetParent` | 返回元素`带有定位`的父级元素，如果父级都没有定位则返回`body` |
| element.`offsetTop`    | 返回元素相对带有定位父元素的`上方`的偏移                     |
| element.`offsetLeft`   | 返回元素相对带有定位父元素的`左边框`的偏移                   |
| element.`offsetWidth`  | 返回自身包括padding、边框、内容区的`宽度`，返回数值`不带单位` |
| element.`offsetHeight` | 返回自身包括padding、边框、内容区的`高度`，返回数值`不带单位` |

### 1.3 offset 与 style 的区别

##### offset

* offset可以得到`任意`样式表中的样式值
* offset系列得到的数值都是`没有单位`的
* `offsetWidth`包含`padding`+`border`+`width`
* offset系列的属性都是`只读`属性，不可更改其值
* 所以如果我们想获取元素的大小，使用offset更加合适

##### style

* style只能得到`行内`样式表中的样式值
* style获得的都是`带有单位的字符串`
* `style.width`获得不包含`padding`和`border`的值
* style系列属性是`可读写`属性，可以获取也可以赋值
* 所以我们想更改元素的样式，使用style更加合适

# 2. 元素可视区 client 系列

### 2.1 client概述

`client`翻译过来就是客户端，我们使用`client`系列的相关属性来获取元素可视区的相关信息。通过`client`系列的相关属性可以动态的得到该元素的边框大小、元素大小等等

### 2.2 client常见属性

| client系列属性        | 作用                                                        |
| --------------------- | ----------------------------------------------------------- |
| element.`clientTop`   | 返回元素上边框的大小                                        |
| element.`clientLeft`  | 返回元素左边框的大小                                        |
| element.`clientWidth` | 返回元素自身包括`padding`、`宽度`，不含边框，返回值不带单位 |
| element.`clientTop`   | 返回元素自身包括`padding`、`高度`，不含边框，返回值不带单位 |

# 3. flexible.js 源码分析

### 3.1 立即执行函数

```javascript
(function(){
    
})()
```

立即执行函数：不需要调用，立即执行代码

主要作用：`创建一个独立的作用域`，函数内部所有的变量都是`局部变量`

第二个小括号相当于`调用`，所以像这样的函数也可以`传递参数`

```javascript
(function(name) {
    console.log(name);
})("alex"); // 打印出alex
```

还有一种写法：

```javascript
(function(name){
    console.log(name);
}("alex"));
```

### 3.2 pageshow事件

为什么在`flexible.js`中使用了`pageshow`事件而不是`load`事件呢？

下面三种情况会刷新页面并触发`load`事件：

* a标签的超链接
* F5或者刷新按钮（强制刷新）
* 前进后退按钮

但是在`火狐`中，有个`往返缓存`，这个缓存不仅保存着页面的数据，而且保存了DOM和JS的状态，实际上是把整个页面保存在了内存中。

所以此时后退按钮并不能刷新页面。

此时可以使用`pageshow`事件来触发，这个事件在页面显示时触发，无论页面是否来自于缓存。在重新加载页面中，`pageshow`会在`load`事件触发后触发，根据事件对象中的`persisted`判断`是否是缓存的页面触发的pageshow`。注意这个事件给`window`添加

### 3.3 源码分析

```javascript
(function flexible(window, document) {
    // 获取 DOM 顶级元素： HTML
    var docEl = document.documentElement;
    // dpr：物理像素比，如果能拿到，就用，拿不到就用1
    var dpr = window.devicePixelRatio || 1

    // adjust body font size   设置body的字体大小
    function setBodyFontSize() {
        // 如果页面中有body元素，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 如果没有拿到body，这是因为页面元素还没加载完成
            // 所以设置DOMContentLoaded事件，等待DOM元素加载完毕之后再设置大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10    设置HTML元素的文字大小
    function setRemUnit() {
        // HTML的宽度除以10，把整个页面分为了10等份，1份作为1个rem的大小
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize  如果页面尺寸发生变化，那么就重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
        // pageshow事件是重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        // 如果是从缓存触发的页面，也重新设置rem
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports   有一些移动端的浏览器不支持0.5像素的写法
    // 以下代码用于修复一些浏览器不支持0.5px
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))
```

### 3.4 核心逻辑

`flexible.js`将整个HTML分为10等份，每一份代表1rem，每次重新加载页面都会重新设置rem值。

`felxible.js`通过`dpr`来给body设置`font-size`。

`flexible.js`解决了某些浏览器不支持`0.5px`

# 4. 元素滚动 scroll 系列

### 4.1 元素 scroll 系列属性

`scroll`翻译过来就是滚动，我们使用`scroll`系列的相关属性来动态的获取该元素的`大小`，`滚动距离`等

| 属性                   | 作用                                           |
| ---------------------- | ---------------------------------------------- |
| element.`scrollTop`    | 返回被卷去的上侧距离，返回数值不带单位         |
| element.`scrollLeft`   | 返回被卷去的左侧距离，返回数值不带单位         |
| element.`scrollWidth`  | 返回自身实际宽度，`不含边框`，返回数值不带单位 |
| element.`scrollHeight` | 返回自身实际高度，`不含边框`，返回数值不带单位 |

### 4.2 页面被卷去的头部

如果浏览器的高（或宽）度不足以显示整个页面时，会自动出现滚动条。当滚动条向下滚动时，页面上面就被隐藏了，我们将隐藏的部分称之为被卷去的头部。滚动条在滚动时触发`onscroll`事件。

页面被卷去的头部，可以使用`window.pageYoffset`，如果是被卷去的左侧，则是`window.pageXoffset`。

**注意**：如果是元素那么是`element.scrollTop`，如果是页面，那么是`window.scrollXoffset`

# 三大系列总结

| 三大系列大小对比       | 作用                                                         |
| ---------------------- | ------------------------------------------------------------ |
| element.`offsetWidtgh` | 返回自身`包括`padding、边框、内容区宽度，返回值不带单位      |
| element.`clientWidth`  | 返回自身包括padding，内容区宽度，`不含边框`，返回值不带单位  |
| element.`scrollWidth`  | 返回自身宽度，`包括被卷去的距离`，`不含边框`，返回值不带单位 |

主要用法：

1. `offset`系列主要用于获取`元素位置`：`offsetLeft`，`offsetTop`
2. `client`系列主要用于获取`元素大小`：`clientWidth`，`clientHeight`
3. `scroll`系列主要用于获取`滚动距离`：`scrollTop`，`scrollLeft`
4. 注意`页面滚动距离`通过`window.pageXOffset`和`window.pageYOffset`来获取

# 5. 动画函数封装

### 5.1 动画实现原理

**核心原理**：通过定时器`setInterval()`不断移动盒子的位置

实现步骤：

1. 获取盒子当前位置
2. 当前的位置加1个移动距离
3. 通过定时器不断重复这个操作
4. 结束定时器
5. 此元素要添加定位，才能使用`element.style.left`

### 5.2 动画函数简单封装

注意函数需要传递2个参数，`动画对象`和`移动到的距离`。

```javascript
function animate(obj, target) {
    // 保证只会有一个定时器
    clearInterval(obj.move);
    // 把定时器赋值给obj的属性，有什么好处？
    // 1. 结构清晰
    // 2. 避免了每调用一次定时器方法，就创建了一次move变量，节省了内存空间
    obj.move = setInterval(function() {
        obj.style.left = obj.offsetLeft + 1 + "px";
        if (obj.offsetLeft >= target) {
            clearInterval(obj.move);
        }
    }, 5);
}
```

### 5.3 缓动效果原理

缓动动画就是让动画的速度有所变化，最常见的就是让速度慢慢停慢下来

思路：

1. 让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
2. 核心算法：（`目标值` - `现在的位置`） / 10 作为每次移动的步长（步长值需要取整，如果距离是`正`值，就向上取整`Math.ceil`，如果距离是`负`值，就向下取整`Math.floor`）
3. 停止条件：当前位置等于目标位置就停止

### 5.4 缓动动画最终代码：

```javascript
function animate(obj, target) {
    clearInterval(obj.move);
    obj.move = setInterval(function() {
        // 缓动动画核心算法：核心算法：（目标值 - 现在的位置） / 10 作为每次移动的步长
        // 把步长改为整数，不要出现小数的问题
        // 如果是正值，就往上取整，如果是负值，就往下取整
        var step = (target - obj.offsetLeft) / 100;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
        if (obj.offsetLeft == target) {
            clearInterval(obj.move);
        }
    }, 15);
}
```

### 5.5 动画函数添加回调函数

**原理**：函数可以作为一个参数，将这个函数作为参数传到另一个函数里面，当那个函数执行完毕后，再执行这个传入的函数，这个过程称之为`回调函数`

回调函数写在`定时器结束`的位置

### 5.6 动画函数封装到单独的JS文件里面

因为我们以后要频繁使用这个动画函数，可以将其放到单独的JS文件中，使用的时候直接引用这个JS文件就行

# 6. 常见网页特效案例

### 6.1 网页轮播图

需求：

1. 鼠标经过轮播图模块，左右按钮显示，反之隐藏
2. 点击左侧，图片往左播放，点击右侧按钮，图片往右播放
3. 图片播放的同时，下面的小圆圈模块也会一起变化
4. 点击小圆圈，可以播放相应图片
5. 鼠标不经过轮播图，轮播图也会自动播放
6. 鼠标经过，轮播图自动播放停止

详细源码请查看：[文件夹](code/90-网页轮播图练习/)或者[JS文件](code/90-网页轮播图练习/js/slider.js)

### 6.2 节流阀

防止轮播图连续点击左右按钮导致`播放过快`

节流阀目的：当上一个函数动画内容执行完毕之后，再去执行下一个函数动画，让事件无法被连续触发

核心实现思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数

### 6.3 返回顶部案例

利用之前封装的`aniamte`函数，只不过这里的向上移动，所以所有的`left`需要改成`window.pageYOffset`。

详见[原生JS返回顶部](code/91-动画返回顶部效果.html)

### 6.4 筋斗云案例

鼠标经过某个li，筋斗云跟到当前li的位置

鼠标离开，筋头云复原回原来的位置

鼠标点击了某个li，筋头云就停在点击的这个li的位置上 
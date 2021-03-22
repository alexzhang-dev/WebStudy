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
    var docEl = document.documentElement
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
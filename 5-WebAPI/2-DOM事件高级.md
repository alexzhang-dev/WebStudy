# 目标：

* 能够写出元素注册事件的两种方式
* 能够说出删除事件的两种方式
* 能够说出DOM事件流的三个阶段
* 能够利用事件对象完成跟随鼠标案例
* 能够封装阻止冒泡的兼容性函数
* 能够说出事件委托的原理
* 能够说出常用的鼠标和键盘事件

# 1. 注册事件（绑定事件）

### 1.1 注册事件概述

给元素添加事件，称为注册事件或者绑定事件

注册事件有两种方式：传统方案和方法监听注册方式

##### 传统注册方式

* 利用 on 开头的事件：`onclick`
* `<button onclick='alert("hello")'></button>`
* `btn.onclick = function(){}`
* 特点：注册事件的**唯一性**
* 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数会覆盖之前注册的处理函数

##### 方法监听注册事件方式

* W3C 标准 推荐方式
* `addEventListener()` 它是一个方法
* IE9之前不支持此方法，可使用`attachEvent()`替代
* 特点：同一个元素同一个事件可以注册多个监听器
* 按注册顺序依次执行

### 1.2 addEventListener 事件监听方式

```javascript
eventTarget.addEventListener(type, listener[, useCapture])
```

此方法是将制定的监听器注册到`evernTarget`（目标对象）上，当该对象触发指定事件时，就会执行事件函数。

该方法接收三个参数：

* `type`：事件类型字符串，例如 click、mouseover，注意这里不要加`on`
* `listener`：事件处理函数，事件发生时，会调用该监听函数
* `useCapture`：可选参数，是一个布尔值，默认false，和DOM事件流有关

### 1.3 attachEvent（不提倡）

```javascript
eventTarget.attachEvent(eventNameWithOn, callback)
```

此方法是将制定的监听器注册到`evernTarget`（目标对象）上，当该对象触发指定事件时，指定的回调函数会执行

该方法接收两个参数：

* `eventNameWithOn`：事件类型字符串，比如：`onclick`、`onmouseover`
* `callback`：事件处理函数，当目标触发事件时回调函数被调用

### 1.4 注册事件兼容性解决方案

```javascript
function addEventListener(element, eventName, fn) {
    // 判断当前浏览器是否支持 addEventListener 方法
    if (element.addEventListener) {
        element.addEventListener(eventName, fn);
    } else if (event.attachEvent) {
        eventName = "on" + eventName;
        element.attachEvent(eventName, fn);
    } else {
        // 相当于 element.onlick = fn;
        element["on" + eventName] = fn;
    }
}
```

处理兼容性原则：首先照顾大部分浏览器，最后处理特殊浏览器

# 2. 删除事件

### 2.1 删除事件的方式

##### 1. 传统注册方式

```javascript
eventTarget.onclick = null;
```

##### 2. 方法监听注册方式

```javascript
// 1. addEventListener
eventTarget.removeEventListener(type, listener[, userCapture])
// 2. attachEvent
eveenTarget.detachEvent(eventNameWithOn,callback)
```

### 2.2 删除事件兼容性解决方案

```javascript
function removeEvent(element, eventName, fn) {
    // 检测是否支持 removeEventListener
    if (element.removeEventListener) {
        element.removeEventListener(eventName, fn);
    } else if (element.detachEvent) {
        element.detachEvent("on" + eventName, fn);
    } else {
        // 相当于 element.onclick = null;
        element["on" + eventName] = null;
    }
}
```

# 3. DOM事件流

事件流描述的是从页面中接收事件的顺序。事件发生时会在元素节点之间按照**特定的顺序**传播，这个传播过程即**DOM事件流**。

比如我们给div注册了点击事件：

![dom事件流](C:\Users\Administrator\Desktop\前端学习\5-WebAPI\resource\dom_event_stream.jpg)

DOM事件流分3个阶段：

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段

事件冒泡：IE最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到DOM最顶层节点的过程。

事件捕获：网景最早提出，由DOM最顶层节点开始，然后逐级向下传播到最具体的元素接收的过程

### 注意：

1.  JS 代码中只能执行捕获或者冒泡其中一个阶段
2. `onclick`和`attachEvent`只能到冒泡阶段
3. `addEventListener(type, listener[, useCapture])`里面的第三个参数如果是`true`，那么表示在事件捕获阶段调用事件处理程序，如果是`false`，表示在事件冒泡阶段调用事件处理程序
4. **实际开发中，我们更关心事件冒泡，很少使用事件捕获**
5. 有些事件是没有冒泡的，例如`onblur`、`onfocus`、`onmouseover`、`onmouseleave`
6. 事件冒泡有时会带来麻烦，有时又会帮助很巧妙的做一些事情

# 4. 事件对象

```javascript
var div = document.querySelector("div");
div.onclick = function(event) {};
```

* `event`就是一个事件对象，写在侦听函数的形参中
* 事件对象有了事件才会存在，它是系统创建的，不需要我们传递实参
* 事件对象是我们事件的一系列相关数据的集合，比如鼠标点击中就包含了鼠标坐标，如果是键盘事件，就包含了键盘事件信息，比如判断了用户按下了哪个键
* 这个事件对象我们可以自己命名，比如`event`、`evt`、`e`
* 有兼容性问题，IE9以下获取：`window.event`
* 兼容写法：`e = e || window.event`

### 4.1 事件常见的属性和方法

| 事件对象属性方法    | 说明                                              |
| ------------------- | ------------------------------------------------- |
| e.target            | 返回触发事件对象（标准）                          |
| e.srcElement        | 返回触发事件对象（非标准，IE9以下使用）           |
| e.type              | 返回事件的类型，例如`click`、`mouseover`不加on    |
| e.cancelBubble      | 该属性阻止冒泡（非标准，IE9以下使用）             |
| e.returnValue       | 该属性阻止默认事件（默认行为）非标准，IE9以下使用 |
| e.preventDafault()  | 该属性阻止默认事件（默认行为）标准                |
| e.stopPropagation() | 阻止冒泡（标准）                                  |

### 4.2 e.target 和 this 的区别

```javascript
ul.addEventListener("click", function(e) {
    // e.target指向点击的对象，如果点击li，那么e.target就会指向li
    console.log(e);
    // 我们给 ul 绑定事件，那么this指向ul
    console.log(this);
});
```

* `e.target`指向点击的元素
* `this`指向绑定事件的元素
* 和`this`有一个很相似的属性`e.currentTarget` IE9以下不支持

### 4.3 阻止默认行为

```javascript
// 2. 阻止默认行为   让链接不跳转，或者让提交按钮不提交
var a = document.querySelector("a");
a.addEventListener("click", function(e) {
    e.preventDefault(); // dom标准写法
});

// 3. 传统的注册方式
a.onclick = function(e) {
    // 普通浏览器
    // e.preventDefault();
    // 低版本浏览器
    e.returnValue; // 这是个属性
    // 我们也可以利用 return false
    return false; // 没有兼容性问题，不过这个方法后面的代码不会执行了，而且只限于传统的方式
};
```

* 高版本浏览器：`e.preventDefault()`
* IE9以下：`e.returnValue`这是个属性
* 高兼容性：`return false` 不过这个方法只能在传统注册事件中用

# 5. 阻止事件冒泡（重点）

### 5.1 阻止事件冒泡的两种方式

事件冒泡：开始时由最具体的元素接收，然后逐级向上传播到DOM最顶级节点。

事件冒泡本身的特性，让它有时候很麻烦，所以有时我们需要用到事件冒泡

##### 阻止事件冒泡

* **标准写法**：利用事件对象里面的`stopPropagation()`方法
* IE9以下：`e.cancelBubble = true`

### 5.2 阻止事件冒泡的兼容性解决方案

```javascript
if (e && e.stopPropagation) {
    e.stopPropagation();
} else {
    window.event.cancelBubble = true;
}
```

# 6. 事件委托（代理、委派）

事件冒泡本身的特性，会给我们带来坏处，也会带来**好处**。例如：

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
</ul>
```

之前我们给每个`<li>`绑定事件，如果循环后一个一个添加，很麻烦。而且DOM访问的次数越多，对于整个页面交互就绪的时间就越长。

### 事件委托

事件委托也称为事件代理，在jQuery里面称为事件委派

### 事件委托的原理

不要给每个子节点单独设置事件监听器，而是把事件监听器放到其父节点上，利用冒泡原理影响设置每个子节点。

上面的案例，我们给`ul`添加事件监听器，利用事件对象的`target`找到当前的`li`，因为点击`li`，会冒泡到`ul`上，`ul`有注册事件，就会触发事件监听器

 ### 事件委托的作用

我们只操作了一次DOM，提高了程序的性能

# 7. 特殊的鼠标事件

### 7.1 禁止鼠标右键菜单

`contextmenu`主要控制应该何时显示上下文菜单，主要用于取消默认的上下文菜单

```javascript
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});
```

### 7.2 禁止鼠标选中

`selectstart`开始选中

```javascript
document.addEventListener("selectstart", function(e) {
    e.preventDefault();
});
```

# 8. 鼠标事件对象

`event`对象代表事件的状态，跟事件相关的一系列信息的集合，现阶段我们主要是用鼠标事件对象`MouseEvent`和键盘事件对象`KeyboardEvent`

| 鼠标事件对象属性 | 说明                                    |
| ---------------- | --------------------------------------- |
| e.clientX        | 返回鼠标位于浏览器窗口可视区的X坐标     |
| e.clientY        | 返回鼠标位于浏览器窗口可视区的Y坐标     |
| e.pageX          | 返回鼠标位于文档页面的X坐标（IE9+支持） |
| e.pageY          | 返回鼠标位于文档页面的Y坐标（IE9+支持） |
| e.screenX        | 返回鼠标位于电脑屏幕的X坐标             |
| e.screenY        | 返回鼠标位于电脑屏幕的Y坐标             |

# 9. 键盘事件

### 9.1 常用键盘事件

| 键盘事件   | 触发条件                                                     |
| ---------- | ------------------------------------------------------------ |
| onkeyup    | 某个键盘按键被松开时触发                                     |
| onkeydown  | 某个键盘按键被按下时触发                                     |
| onkeypress | 某个键盘按键被按下时触发，但它不识别功能键，例如：ctrl、shift、箭头等 |

使用`addEventListener`时不需要加`on`，执行顺序：keydown-->keypress-->keyup

### 9.2 键盘事件对象

| 键盘事件属性 | 触发条件              |
| ------------ | --------------------- |
| e.keyCode    | 返回按键对应的ASCII码 |

事件`keyup`和`keydown`不区分大小写，也就是说无论是大写的`A`还是小写的`a`一律返回大写的`A`的`ASCII`

`keypress`区分字母大小写
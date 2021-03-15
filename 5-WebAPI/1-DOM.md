# 1 什么是DOM

DOM（Document Object Model）文档对象模型，是W3C组织推荐的处理可扩展标记语言（HTML或XML）的标准编程接口。W3C已经定义了一系列的DOM接口，通过这些DOM接口可以改变网页的内容、结构和样式。

DOM 将 HTML 文档表达为树结构

![DOM树](C:\Users\Administrator\Desktop\前端学习\5-WebAPI\resource\htmltree.gif)

* 文档：一个页面就是一个文档，在DOM中使用`document`表示
* 元素：页面中所有的标签都是元素，在DOM中使用`element`表示
* 节点：页面中所有的内容（标签、属性、文本、注释等）都是节点，DOM中使用`node`表示

* **DOM把以上内容都看作对象**

# 2. 获取元素

### 2.1 如何获取页面元素

DOM在实际开发中主要用于操作元素，获取元素有以下几种方式：

* 根据ID获取
* 根据标签名获取
* 通过H5新增方法获取
* 特殊元素获取

### 2.2 根据ID获取

使用 `getElementById()`方法可以获取带有ID属性的元素的对象

> 语法

```javascript
var element = document.getElementById(id);
```

> 参数

* `element`是一个Element对象，如果当前文档中不存在指定id的元素，则返回null
* 参数id是大小写敏感的字符串，代表了所要查找的元素的唯一ID

> 返回值

返回一个匹配到ID的 DOM Element 对象。若找不到，则返回 null

console.dir()可以打印返回的元素对象，更好的查看元素的属性和方法

###  2.3 根据标签名获取

使用`getElementsByTagName()`方法可以获取指定标签的**对象的集合**

> 语法

```javascript
var elements = document.getElementsByTagName(tag);
```

> 参数

参数是指定标签的字符串，例如'p'、'div'

> 返回值

返回元素的集合，以伪数组的方式存在，如果符合的元素只有一个，仍然是返回的集合

### 2.4 H5新增方法获取

以下方法不兼容IE9以下

```javascript
// 1. document.getElementsByClassName('类名');  根据类名返回元素集合
var boxs = document.getElementsByClassName("box");
console.log(boxs);
```

```javascript
// 2. document.querySelector('选择器'); 根据指定选择器返回第一个元素对象
// 如果是.那么是class
var first_box = document.querySelector(".box");
// 如果是#那么是id
var nav = document.querySelector("#nav");
// 如果什么都没有那么是标签
var li = document.querySelector("li");
```

```javascript
// 3. document.querySelectorAll('选择器'); 根据指定选择器返回
// 返回值是对象集合，伪数组
```

### 2.5 获取特殊元素（body，html）

> 获取 body 元素

```javascript
var bodyEle = document.body;
```

> 获取 HTML 元素

```javascript
var htmlEle = document.documentElement;
```

# 3. 事件基础

### 3.1 事件概述

JS使我们有能力创建动态页面，而事件是可以被JS侦测到的行为。简单理解：触发---响应机制

网页中的每个元素都可以产生某些可以触发JS的事件，例如我们可以给按钮添加事件

### 3.2 事件三要素

事件有三部分组成：

* 事件源（事件被触发的对象）
* 事件类型（鼠标点击、鼠标经过、鼠标悬停......）
* 事件处理程序（通过一个函数赋值的方式完成）

```html
<button id="btn">点击</button>
<script>
    // 事件有三部分组成：事件源（事件被触发的对象） 事件类型 事件处理程序
    // 1. 事件源（事件被触发的对象）
    var btn = document.getElementById("btn");
    // 2. 事件类型（鼠标点击、鼠标经过、鼠标悬停......）
    // 3. 事件处理程序（使用函数赋值）
    btn.onclick = function() {
        alert("哈哈哈哈");
    };
</script>
```

###  3.3 执行事件的步骤

1. 获取事件源
2. 注册事件（绑定事件）
3. 添加事件处理程序（采取函数赋值形式）

### 3.4 常见的鼠标事件

| 鼠标事件    | 触发条件     |
| ----------- | ------------ |
| onclick     | 鼠标单击左键 |
| onmouseover | 鼠标经过     |
| onmouseout  | 鼠标离开     |
| onfocus     | 获得鼠标焦点 |
| onblur      | 失去鼠标焦点 |
| onmousemove | 鼠标移动     |
| onmouseup   | 鼠标弹起     |
| onmousedown | 鼠标按下     |

# 4. 操作元素

JS的DOM操作可以改变网页内容、结构和样式，我们可以利用DOM操作元素改变元素里面的内容、属性等。注意以下都是属性

### 4.1 改变元素内容

```javascript
element.innerText
```

从起始位置到终止位置的内容，但它去除标签，同时空格和换行也会去掉

```javascript
element.innerHTML
```

起始位置到终止位置的全部内容，包括标签，保留空格和换行

**区别：**

* innerText 不识别 HTML 标签 非标准
* innerHTML 识别 HTML 标签 W3C标准
* 这两个属性是可读写的

### 4.2 常用元素的属性操作

```javascript
1. innerText、innerHTML 改变元素内容
2. src、href
3. id、alt、title
```

### 4.3 表单元素的属性操作

利用DOM可以操作如下表单元素的属性

`type`、`value`、`checked`、`selected`、`disabled`

### 4.4 样式属性操作

我们也可以通过DOM修改元素的大小、颜色、位置等样式

```javascript
1. element.style      行内样式操作
2. element.className  类名样式操作
```

**注意：**

1. JS里面的样式采用驼峰命名法：比如 `fontSize`  `backgroundColor`
2. JS修改style的样式操作，产生的是行内样式，CSS权重较高
3. className会直接更改元素的类名，覆盖原先的类名

更改颜色案例：

```javascript
var div = document.querySelector("div");
div.onclick = function() {
    // style里面的属性采用驼峰命名法
    this.style.backgroundColor = "blue";
};
```

### 4.5 排他思想

如果有同一组元素，我们需要某一个元素实现某种样式，需要用到循环的排他思想：

1. 所有元素全部清除样式
2. 给当前元素设置样式
3. 注意顺序不能乱，先清除所有，再单独添加
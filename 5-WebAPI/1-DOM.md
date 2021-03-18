# 1 什么是DOM

DOM（Document Object Model）文档对象模型，是W3C组织推荐的处理可扩展标记语言（HTML或XML）的标准编程接口。W3C已经定义了一系列的DOM接口，通过这些DOM接口可以改变网页的内容、结构和样式。

DOM 将 HTML 文档表达为树结构

![DOM树](/resource/htmltree.gif)

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

### 4.6 自定义属性的操作

##### 1. 获取属性值

`element.属性名`：获取属性值

`element.getAttribute('属性')`：获取属性值

**区别：**

`element.属性`：获取内置属性值（元素本身自带的属性）

`element.getAttribute('属性')`：主要获取自定义属性

##### 2. 设置属性值

`element.属性 = '值'`：设置内置属性值

`element.setAttribute('属性','值')`：可以用来设置自定义属性值

##### 3. 移除属性

`element.removeAttribute('属性')`

### 4.7 H5 自定义属性

自定义属性目的：是为了保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

自定义属性获取是通过`getAttribute('属性')`来获取

但是有一些自定义属性很容易引起歧义，不容易判断是内置属性还是自定义属性

H5给我们新增了自定义属性规则：

##### 1. 设置H5自定义属性

H5规定自定义属性`data-`开头作为属性名并且赋值

```html
<div data-index="1"></div>
```

或者使用JS设置

```javascript
element.setAttribute('data-index','1');
```

##### 2. 获取H5自定义属性

兼容性较好：`element.getAttribute('data-index')`这个方法在开发时常用

H5新增：`element.dataset.index`或者`element.dataset['index']` IE11才开始支持

# 5. 节点操作

### 5.1 获取元素通常使用两种方式：

##### 1. 利用DOM提供的方法获取元素

* `document.getElementById()`
* `document.getElementByTagName()`
* `document.querySelector`
* ......
* 逻辑不强，非常繁琐

##### 2.  利用节点层级关系获取元素

直接获取某一个元素里的子元素

### 5.2 节点概述

网页中所有的内容都是节点（标签、属性、文本、注释等），在DOM中，节点使用node来表示

HTML DOM树中所有的节点都可以通过JavaScript进行访问，所有的节点均可被修改、也可被创建和删除。

一般来说，节点至少拥有`nodeType`（节点类型）、`nodeName`（节点名称）和`nodeValue`（节点值）这三个基本属性。

* 元素节点 nodeType 为 1
* 属性节点 nodeType 为 2
* 文本节点 nodeType 为 3（文本节点包含文字、空格、换行等）

**我们在实际开发中，节点操作主要操作的是元素节点**

### 5.3 节点层级

利用DOM树可以把节点划分为不同的层级关系，常见的是父子兄层级关系。

##### 1. 父节点

```javascript
node.parentNode
```

返回最近的父节点，如果找不到返回null

##### 2. 子节点

```javascript
1. parentNode.childNodes（标准）
```

返回最近的所有子节点（包含元素节点、文本节点等等）的集合

**如果只想要获取里面的元素节点，则需要专门处理，所有不提倡使用childNodes**

```javascript
// 只获取里面的元素节点
var ul = document.querySelector("ul");
for (var i = 0; i < ul.childNodes.length; i++) {
    if (ul.childNodes[i]["nodeType"] == 1) {
        console.log(ul.childNodes[i]);
    }
}
```

```javascript
2. parentNode.children（非标准）（重要）
```

`parentNode.children`是一个只读属性，返回所有的子元素节点，它只返回元素节点，其余节点不返回（这个是重点部分）

虽然children是一个非标准，但是得到了各个浏览器的支持，因此我们可以放心使用

```javascript
3. parentNode.firstChild 和
   parentNode.lastChild
```

这两个属性可以获取第一个子节点和最后一个子节点（包括元素节点和文本节点）

 ```javascript
4. parentNode.firstElementChild 和
   parentNode.lastElementChild
 ```

这两个属性第一个子节点和最后一个子节点（只返回元素节点）

**↑这个有兼容问题，IE9以上才会支持**

所以实际开放中，有没有无视兼容的方案呢？

```javascript
// 1. 想要第一个子元素节点
parentNode.children[0]
// 2. 想要第二个子元素节点
parentNode.children[1]
// 3. 想要最后一个子元素
parentNode.children[parentNode.children - 1]
```

##### 3. 兄弟节点

```javascript
1. node.nextSibling
   node.previousSibling
```

`nextSiling` 返回当前元素的下一个兄弟节点，找不到返回null，包括所有节点

`previousSibling` 返回当前元素的上一个兄弟节点

```javascript
2. node.nextElementSlibing
   node.previousElementSlibing
```

这两个返回是的当前元素的上一个和下一个元素节点

**不过有兼容问题，IE9以上才支持**

**如何解决兼容问题？**

自己封装一个兼容函数：

```javascript
function getNextElement(element) {
    // 如果兼容，就调用兼容的方法
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling; //下一个兄弟节点
        while (next.nodeType !== 1) {
            //如果下一个不是元素节点就一直往下找
            next = next.nextSibling;
        }
        return next;
    }
}
```

### 5.4 创建节点

```javascript
document.createElement('tagName')
```

创建由`tagName`指定的HTML元素，我们称为动态创建元素节点

### 5.5 添加节点

我们创建过节点之后，**必须添加节点才能显示在页面中**

```javascript
1. node.appendChild(child)
```

将一个节点添加到指定父节点的里面，注意是放到所有子元素的后面

所以这个方法又叫做追加元素，类似于数组中的`push()`

```javascript
2. node.insertBefore(child, 指定元素)
```

将一个元素添加到指定元素的前面

### 5.6 删除元素

```javascript
node.removeChild(child)
```

### 5.7 复制节点

```javascript
node.cloneNode();
```

返回一个该节点的副本

**注意：**

* 如果方法参数是空或者false，则是浅拷贝，即只克隆节点本身，不克隆子节点
* 如果方法参数是true，则是深拷贝，节点本身和子节点都拷贝

### 5.8 三种动态创建元素的区别（重点）

* `document.write()`
* `element.innerHTML`
* `document.createElement()`

**区别：**

* `document.write()`是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面重绘（重新创建一个页面）
* `innerHTML`是将内容写入某个DOM节点，不会导致页面重绘
* `innerHTML`创建多个元素效率更高（不要拼接字符串，采取数组的方式拼接），结构相对比较复杂
* `createElement()`创建多个元素效率稍低一些，但是结构更加清晰

**总结：**不同浏览器下，innerHTML效率要比createElement高

如果使用innerHTML不使用数组的方式，那么效率会低很多，如果使用数组方式，效率很高，而createElement要比使用数组方式的innerHTML的效率稍低一些

# 6. DOM 重点核心

DOM（Document Object Model）文档对象模型，是W3C组织推荐的处理可扩展标记语言（HTML或XML）的标准编程接口。W3C已经定义了一系列的DOM接口，通过这些DOM接口可以改变网页的内容、结构和样式。

1. 对于JS，为了能够使JS操作HTML，JS有自己的dom接口
2. 对于HTML，dom使HTML形成一颗DOM树，包括文档、元素、节点
3. 我们获取的DOM元素是一个对象

### 6.1 创建

* document.write
* innerHTML
* createElement

### 6.2 增

* appendChild
* insertBefore

### 6.3 删

* removeChild

### 6.4 改

主要修改dom的元素属性，dom元素的内容、属性、表单的值等

1. 修改元素属性：src、href、title等
2. 修改普通元素内容：innerHTML、innerText
3. 修改表单元素：value、type、disabled等
4. 修改元素样式：style、className

### 6.5 查

主要获取查询dom的元素

1. DOM提供的API方法：getElementById、getElementByTagName  古老方法，不太推荐
2. H5提供的新方法：querySelector、querySelectorAll  推荐
3. 利用节点操作获取元素：父（parentNode）、子（children）、兄（previousElementSibling）、弟（nextElementSibling） 推荐

### 6.6 属性操作

主要针对于自定义属性

1. setAttribute：设置dom属性值
2. getAttribute：获取dom属性值
3. removeAttribute：移除属性

### 6.7 事件操作

给元素注册事件，采用事件源.事件类型 = 事件处理程序

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
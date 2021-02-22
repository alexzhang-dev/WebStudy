# 1. CSS3

### CSS3 现状

* 在CSS2的基础上新增（扩展）样式
* 移动端支持优于PC端
* 不断改进中
* 应用相对广泛
* IE9以下几乎不支持

# 2. CSS3 选择器

**类选择器、属性选择器、伪类选择器的权重为10**

### 2.1 属性选择器

| 选择符        | 简介                                      |
| :------------ | :---------------------------------------- |
| Eatt]        | 选择具有att属性的E元素                    |
| Eatt="val"]  | 选择具有att属性并且属性值等于val的E元素   |
| Eatt^="val"] | 匹配具有att属性，且值以val**开头**的E元素 |
| Eatt$="val"] | 匹配具有att属性，且值以val**结尾**的E元素 |
| Eatt*="val"] | 匹配具有att属性，且值**包含**val的E元素   |

### 2.2 结构伪类选择器

| 选择符           | 简介                          |
| :--------------- | :---------------------------- |
| E:first-child    | 匹配父元素中的第一个子元素E   |
| E:last-child     | 匹配父元素中的最后一个子元素E |
| E:nth-child(n)   | 匹配父元素中的第n个子元素E    |
| E:first-of-type  | 指定类型E的第一个             |
| E:last-of-type   | 指定类型E的最后一个           |
| E:nth-of-type(n) | 指定类型E的第n个              |

E:nth-child(n) 和E:nth-of-type(n)这里的n有两个特殊值：even和odd

even表示偶数，odd表示奇数

点击这里 ](code/2-CSS3/08-nth-child.html)查看详细的例子。

#### 2.2.1 nth-child(n)和nth-of-type(n)

* n可以是数字、关键字和公式
* n是数字就是选择第几个
* 常见的关键字是even(偶数)、odd(奇数)
* 常见的公式如下（如果n是公式，则从0开始计算）
* 如果公式超出了元素个数则会被忽略

公式示例：

| 公式 | 取值                             |
| :--- | :------------------------------- |
| 2n   | 偶数                             |
| 2n+1 | 奇数                             |
| 5n   | 5  10  15  ...                   |
| n+5  | 从第5个开始（包含第5个）直到最后 |
| -n+5 | 前5个（包含第5个）               |

### 2.3 伪元素选择器

| 选择符   | 简介                     |
| :------- | :----------------------- |
| ::before | 在元素内部的前面插入内容 |
| ::after  | 在元素内部的后面插入内容 |

在伪元素选择器中插入内容需要属性content:"值"

!image-20210219144641476](resource/image/伪类选择器.png)

**注意：**

* before 和 after 必须有 content 属性
* before 在内容的前面，after 在内容的后面
* before 和 after 创建一个元素，但是属于行内元素
* 因为在 dom 中看不到刚才创建的元素，所以我们称之为**伪元素**
* 伪元素和标签选择器一样，权重都是1

#### 2.3.1 引入第三方图标库的注意事项

以iconfont为例，我们在官网下载完之后会有一个demo.html

里面会提供图片的字符实体编码，例如：`&#xe957;`

我们在使用::before或::after的content里面要放十六进制的代码，而字符实体编码中x后面的字符为十六进制，例如`&#xe957;` 在伪元素中该这么写

```css
div::before{
	content:"\e957"
	font-family:"iconfont"
}
```

# 3. CSS3 2D转换

转换（transform）是 CSS3 中具有颠覆性的特征之一，可以实现元素的位移、旋转、缩放等效果。

转换（transform）可以简单理解为变形。

* 移动：translate
* 旋转：rotate
* 缩放：scale

### 3.1 二维坐标系

2D转换是改变标签在二维平面上的位置和形状的一种技术。二维坐标系分为X轴（水平）和Y轴（垂直）

### 3.2 2D 转换之移动 translate

2D移动是2D转换种的一种功能，可以改变元素在页面中的位置，类似于**定位**。

##### 语法：

| 语法                       | 简介                                   |
| :------------------------- | :------------------------------------- |
| transform: translate(x, y) | x代表在x轴移动位置，y代表在y轴移动位置 |
| transform: translateX(n);  | 表示在x轴移动                          |
| transform: translateY(n);  | 表示在y轴移动                          |

**但是translateX和translateY不能同时用。**

具体写法是这样的：

```css
div {
    transform: translate(100px, 100px);
    transform: translateX(200px);
    transform: translateY(200px);
}
```

**一定要记得在后面加上单位px！！！**

##### 重点：

* translate 定义了2D转换中的移动，沿着X轴和Y轴移动元素的位置
* translate 最大的优点：**不会影响其他元素的位置**
* translate 中的百分比单位是相对于自身元素的，例如：`translate(50%,50%)`
* 对行内标签没有效果

解释一下在translate中写百分比的效果，例如50%只是基于本身的宽高的50%进行的数值进行移动的。

### 3.3 2D转换之旋转 rotate

##### 语法：

```css
transform:rorate(度数)
```

##### 重点：

* rotate 里面跟度数，单位是 deg ，比如 rotate(45deg)
* 角度为正时，顺时针；角度为负时，逆时针
* 默认旋转的中心是元素的中心点

### 3.4 2D 转换中心点 transform-origin

我们可以设置元素转换的中心点

##### 语法：

```css
transform-origin: x y;
```

##### 重点：

* 注意后面的参数 x 和 y 要隔开
* x y 默认转换的中心点是元素的中心点（50% 50%）
* 还可以给 x y 设置像素或者方位名词（top bottom lef right center）

### 3.5 2D 转换之缩放 scale

只要给元素添加这个属性就可以控制元素的放大和缩小。

##### 语法：

```css
transform:scale(x,y)
```

##### 注意：

* 注意其中的 x 和 y 要用逗号隔开
* transform:scale(1,1)：宽和高都放大1倍，相当于没有放大
* transform:scale(2,2)：宽和高都放大2倍
* transform:scale(2)：只写一个参数，那么第二个参数就和第一个参数一样。
* transform:scale(0.5,0.5)：缩小
* scale 缩放最大的优势：可以设置转换中心点缩放，默认是元素中心点进行缩放的
* scale 缩放不影响其他元素

### 3.6 2D 转换综合写法

##### 注意：

* 同时使用多个转换，其格式为：`transform: translate() rotate() scale()...`
* 其顺序会影响转换的效果。（例如：先旋转会改变坐标轴方向）
* **当我们同时有位移和其他转换的时候，记得把位移放到最前**

# 4. CSS3 动画

动画（animation）是 CSS3 中具有颠覆性的特征之一。可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。
相比较过渡，动画可以实现更多变化、更多控制、连续自动播放等效果。

### 4.1 动画的基本使用

制作动画分为两步：

1. 先定义动画
2. 再使用（调用）动画

#### 4.1.1 用 keyframes 定义动画（类似定义类选择器）

```css
@keyframes 动画名称{
    0% {
        width: 100px;
    }
    100% {
        width: 200px;
    }
}
```

##### 动画序列：

* 0% 是动画的**开始**，100%是动画的**完成**。这样的规则就是动画序列。
* 在 **@keyframes** 中规定某项 CSS 样式，就能创建由当前样式逐渐变为新样式的动画。
* 动画是使元素从一种样式逐渐变为另一种样式的效果，可以改变任意多的样式任意多的**次数**。
* 用百分比来规定变化发生的时间，或用关键词“from”和“to”，等于 0% 和 100% 。

#### 4.1.2 元素使用动画

```css
div {
    /* 动画名称 */
    animation-name: move;
    /* 动画持续时间 */
    animation-duration: 1s;
}
```

* `animation-name` ：调用动画的名称
* `animation-duration`：动画的持续时间，单位是秒（s）或毫秒（ms）

### 4.2 动画常见的属性

| 属性                      | 描述                                                         |
| :------------------------ | :----------------------------------------------------------- |
| @keyframes                | 规定动画。                                                   |
| animation                 | 所有动画属性的简写属性，除了 animation-play-state 属性。     |
| animation-name            | 规定 @keyframes 动画的名称。                                 |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。             |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"。                          |
| animation-delay           | 规定动画何时开始。默认是 0。                                 |
| animation-iteration-count | 规定动画被播放的次数。默认是 1。infinite（无限循环）         |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"。alternate（逆向播放） |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是 "running"。paused（停止） |
| animation-fill-mode       | 规定对象动画结束后的状态。保持当前位置：forwards，回到起始状态：backwards。 |

### 4.3 动画简写属性

animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画结束的状态

**请严格按照这个顺序去写，否则效果会错乱**

```css
naimation:move 1s linear 2s infinite alternate
```

* 简写属性里面不包含 animation-play-state
* 暂停动画：animation-play-state:puased; 经常配合鼠标经过等一同使用
* 想要动画走回来而不是直接重置位置：animation-direction:alternate;
* 动画结束后，停在原地：animation-fill-mode:forwards;

### 4.4 速度曲线

animation-timing-function：规定动画的速度曲线，默认是“ease”

| 值          | 描述                                         |
| ----------- | -------------------------------------------- |
| linear      | 动画从头到尾的速度都是一样的，匀速           |
| ease        | 默认。动画从低速开始，然后加快，在结束时变慢 |
| ease-in     | 动画从低速开始                               |
| ease-out    | 动画以低速结束                               |
| ease-in-out | 动画以低速开始和结束                         |
| steps()     | 指定了间隔数量（步长）                       |


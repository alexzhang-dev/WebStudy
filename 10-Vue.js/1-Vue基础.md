# 目标：

* 能够说出 Vue 的基本用法
* 能够说出 Vue 的模板语法
* 能够说出 Vue 的常见特性
* 能够基于 Vue 实现案例效果

# 1. Vue 概述

**尤雨溪：Vue.js 的创建者**

* 2014年2月，Vue.js 正式发布
* 2015年10月27日，正式发布1.0.0
* 2016年4月27日，发布2.0预览版本

**Vue：渐进式 JavaScript 框架**

* 声明式渲染
* 组件系统
* 客户端路由
* 集中式状态管理
* 项目构建

官网：https://cn.vuejs.org/

# 2. Vue 基本使用

### 2.1 传统开发模式对比

```html
<!-- 原生JS -->
<div id='msg'></div>
<script>
    var msg = 'hello world!';
    document.getElementById('msg').innerHTML = msg;
</script>
```

```html
<script src="./lib/jquery-3.6.0.min.js"></script>
<div id="jquery"></div>
<script>
    var msg = 'hello world!';
    $("#jquery").html(msg);
</script>
```

### 2.2 Vue 开发

```html
<script src="./lib/vue.min.js"></script>
<div id="vue-app">{{ msg }}</div>
<script>
	new Vue({
        el: "#vue-app",
        data: {
            msg: "hello Vue!",
        },
    });
</script>
```

### 2.3 Vue 开发细节分析

#### 1. 实例参数分析

* `el`：元素的挂载位置（值可以是 CSS 选择器或者 DOM 元素）
* `data`：模型数据（值可以是一个对象）

#### 2. 插值表达式用法

* 将数据填充到 HTML 标签中
* 插值表达式支持基本的数据操作

#### 3. Vue 代码运行原理分析

* 从`Vue语法`-->`原生语法`（编译过程）

# 3. Vue 模板语法

### 3.1 模板语法概述

#### 1. 如何理解前端渲染？

把数据填充到 HTML 标签中

#### 2. 前端渲染的方式

* 原生 JS 拼接字符串
* 使用前端模板引擎（类似于之前的`art-template`）
* 使用 Vue 特有的模板语法

#### 3. 原生 JS 拼接字符串

基本上就是将数据以字符串的形式拼接到 HTML 标签中，代码风格大致类似于：

```js
const html = '<h1>你好，我的名字叫做' + name + ', 我今年' + age + '岁了</h1>'
```

可以看出来，这种方式有以下特点：

* 不易维护
* 极容易混乱

#### 4. 使用模板引擎

与拼接字符串相比，模板引擎的代码规范了很多，他拥有自己独有的一套语法规范。

```html
<!-- 以下为 art-template 模板引擎示例 -->
<script id='tpl' type='text/html'>
	你好，我叫{{ name }},我今年{{ age }}岁了
</script>
```

优点：代码可读性大大提高，方便后期维护

缺点：没有专门的事件处理机制

#### 5. Vue 模板语法概览

* 插值表达式
* 指令
* 事件绑定
* 属性绑定
* 样式绑定
* 分支循环结构

### 3.2 指令

#### 1. 什么是指令

* 指令的本质就是**自定义属性**
* 指令的格式：以`v-`开始，例如`v-cloak`（隐藏所有未编译的插值表达式`{{}}`）

官网：https://cn.vuejs.org/v2/api/

在官网中查看所有 Vue V2 的 指令

#### 2. 数据绑定指令

* `v-text`填充纯文本（相比插值表达式更加简洁）
* `v-html`填充HTML片段
  * 存在安全问题
  * 本网站内部数据可以使用，来自于第三方数据不可用
* `v-pre`填充原始信息
  * 显示原始信息，跳过编译过程，例如原样输出`{{ data }}`，不渲染数据

#### 3. 数据响应式

* 如何理解响应式
  * H5中的响应式（屏幕尺寸导致样式变化）
  * 数据的响应式（数据的变化导致页面的变化）
* 什么是数据绑定
  * 数据绑定：将数据填充到标签中
* `v-once`：只编译一次
  * 显示内容后将不再具有编译功能
  * 应用场景：如何显示的信息后续不需要再修改，那么可以使用这个指令
  * 优势：可以提高性能

### 3.3 双向数据绑定

#### 1. 什么是双向数据绑定

页面**元素的值**影响 Vue 中 **data 的值**，请看[例子](code/1-Vue基础/05-双向数据绑定.html)

#### 2. 双向数据绑定分析

`v-model`指令用法：

```html
<div id="vue-app">
    <!-- 一旦文本框的值改变，下面 data 中的msg的值也会改变 -->
    <input type="text" placeholder="请输入文字" v-model="msg" />
    <div v-text="msg"></div>
</div>
<script>
    const vueApp = new Vue({
        el: "#vue-app",
        data: {
            msg: "Hello",
         },
    });
</script>
```

#### 3. MVVM 设计思想

MVC 是后端的分层开发概念，MVVM 是前端视图层的概念

* M(model)
  * 数据层，Vue 中数据层都放在 data 里
* V(view)
  * Vue 中的 view ，即我们的 HTML 页面
* VM(view-model)
  * 将数据和视图层建立联系
  * 每一个 Vue 的实例都是 vm

<img src="resource/1-MVVM.png" align="left" />

### 3.4 事件绑定

#### 1. 给元素绑定事件

通过`v-on`来给某个元素绑定事件，可以直接简写为`@`

```html
<div id="app">
    <!-- 两种写法均可 -->
    <button v-on:click="num++">按钮1</button>
    <button @click="num--">按钮2</button>
    <div>{{num}}</div>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            num: 0,
        },
    });
</script>
```

#### 2. 事件函数

在元素绑定时只能操作一些简单的语法，想要复杂的功能，就需要触发函数。在`methods`中声明函数

```html
<div id="app">
    <button @click="handle">按钮</button>
    <div>{{num}}</div>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            num: 0,
        },
        methods: {
            handle: function() {
                // 不可以直接写成num，会被看作为参数
                // num++;
                this.num++;
                // 这里的this实际上就是 Vue 的实例 vm
                console.log(this === vm); // true
            },
        },
    });
</script>
```

* 直接绑定函数名称：`@click="handle"`
* 调用函数：`@click="handle()"`
* 以上两种方式均可
* 至于有什么区别，下面的传参可以解答

#### 3. 事件函数参数传递方式

如果绑定函数本身，那么事件对象就是函数的第一个参数

```html
<button @click="func">SayHi Btn</button>
<script>
	// code ...
    methods: {
        func: function(event){
            // 如果直接绑定函数本身
            // 那么事件对象就是函数的第一个参数
            console.log(event.target.innerHTML);
        }
    }
</script>
```

如果是事件绑定调用，那么事件对象`$event`必须是函数的最后一个参数

```html
<button @click="func('hi', $event)">SayHi Btn</button>
<script>
	// code ...
    methods: {
        func: function(p1, event){
            // 如果直接绑定函数本身
            // 那么事件对象就是函数的最后一个参数
            console.log(event.target.innerHTML);
        }
    }
</script>
```

`$event`是事件对象，固定写法

#### 4. 事件修饰符

`.stop`：阻止冒泡

```html
<a @click.stop = "handle">跳转</a>
```

`.prevent`：阻止默认行为

```html
<a @click.prevent = "handle">跳转</a>
```

更多的修饰符参考官方文档

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。（事件捕获）
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

#### 5. 按键修饰符

`.enter`：回车键

```html
<input type="text" @keyup.enter = "submit" />
```

`.delete`：删除键

```html
<input type="text" @keyup.delete = "deleteHandle" />
```

**自定义按键修饰符**


全局 `config.keyCodes` 对象添加
```js
Vue.config.keyCodes.f1 = 112
```

下面就可以直接使用


```html
<input type="text" @keyup.f1 = 'handle' />
<!-- 也可以直接使用键码 -->
<input type="text" @keyup.112 = 'handle' />
```

更多的修饰符参考官方文档

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 3.5 属性绑定

#### 1. Vue 如何动态处理属性？

使用`v-bind`修饰属性，动态处理属性值，可缩写为`:`

```html
<a v-bind:href="url">跳转</a>
<!-- 可缩写为 -->
<a :href="url">跳转</a>
```

#### 2. 指令`v-model`底层原理分析

```html
<input type="text" v-model='num' />
<!-- 等于下面 -->
<input type="text" v-bind:value="num" v-on:input="num=$event.target.value"
```

核心原理就是监控`input`输入事件，一旦文本框内容发生变化，那么将触发input事件，就将文本框的值赋给下面的num的值

* 使用`v-on`实现页面元素影响数据
* 使用`v-bind`实现数据影响页面元素

### 3.6 样式绑定

#### 1. 处理`class`

对象用法

```html
<div id="vue-app">
    <!-- 左边为类名，右边是操作的属性，如果为true，则显示active -->
    <div :class="{active: isActive}">123456</div>
    <button @click="handle">切换</button>
</div>
<script>
    const vm = new Vue({
        el: "#vue-app",
        data: {
            isActive: true,
        },
        methods: {
            handle: function() {
                // 控制 isActive 在 true/false 之间切换
                this.isActive = !this.isActive;
            },
        },
    });
</script>
```


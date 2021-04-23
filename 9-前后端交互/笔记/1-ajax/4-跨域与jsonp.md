# 目标

* 知道什么是同源策略和跨域
* 知道什么是JSONP
* 能够说出JSONP的实现原理
* 能够知道防抖和节流的概念

# 1. 了解同源策略和跨域

### 1.1 同源策略

##### 1. 什么是同源

如果两个页面的**协议**，**域名**和**端口**都相同，则两个页面具有相同的源。
例如，下表给出了相对于 http://www.a.com/index.html 页面的同源检测：

| **URL**                         | **是否同源** | **原因**                               |
| ------------------------------- | ------------ | -------------------------------------- |
| http://www.a.com/other.html     | 是           | 同源（协议、域名、端口相同）           |
| https://www.a.com/about.html    | 否           | 协议不同（http 与 https）              |
| http://blog.a.com/movie.html    | 否           | 域名不同（www.a.com 与 blog.a.com）    |
| http://www.a.com:7001/home.html | 否           | 端口不同（默认的 80 端口与 7001 端口） |
| http://www.a.com:80/main.html   | 是           | 同源（协议、域名、端口相同）           |

##### 2. 什么是同源策略

同源策略（英文全称 Same origin policy）是**浏览器**提供的一个**安全功能**。

MDN 官方给定的概念：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

通俗的理解：浏览器规定，A 网站的 JavaScript，不允许和非同源的网站 C 之间，进行资源的交互，例如：

* 无法读取非同源网页的`Cookie`、`LocalStorage` 和`IndexedDB`
* 无法接触非同源网页的`DOM`
* 无法向非同源地址发送`Ajax`请求

### 1.2 跨域

###### 1. 什么是跨域

同源指的是两个 URL 的协议、域名、端口一致，反之，则是跨域。

出现跨域的根本原因：**浏览器的同源策略不允许非同源的 URL 之间进行资源的交互**。

网页：http://www.test.com/index.html

接口：http://www.api.com/userlist

##### 2. 浏览器对跨域请求的拦截

<img src="../../resource/跨域.jpg" />

**注意**：浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到！

##### 3. 如何实现跨域数据请求

现如今，实现跨域数据请求，最主要的两种解决方案，分别是`JSONP`和`CORS`。

JSONP：出现的早，**兼容性好（兼容低版本IE）**。是前端程序员为了解决跨域问题，被迫想出来的一种**临时解决方案**。缺点是***只支持 GET 请求，不支持 POST 请求***。

CORS：出现的较晚，它是 W3C 标准，属于跨域 Ajax 请求的根本解决方案。***支持 GET 和 POST 请求***。缺点是**不兼容某些低版本的浏览器**。

# 2. JSONP

### 2.1 什么是JSONP

JSONP (JSON with Padding) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的**跨域数据访问**的问题。

### 2.2 JSONP的实现原理

由于浏览器**同源策略**的限制，网页中无法通过 Ajax 请求**非同源的接口数据**。但是 `<script>`标签不受浏览器同源策略的影响，可以通过 src 属性，请求非同源的 js 脚本。

> 因此，JSONP 的**实现原理**，就是通过`<script>`标签的 src 属性，请求跨域的数据接口，并通过函数调用的形式，接收跨域接口响应回来的数据。

### 2.3 自己实现一个简单的JSONP

定义一个 success 回调函数：

```html
<script>
    function success(data) {
        console.log('获取到了data数据：')
        console.log(data)
    }
</script>
```

通过`<script>`标签，请求接口数据：

```html
<script src="接口地址?callback=success&name=zs&age=20"></script>
```

### 2.4 JSONP的缺点

由于 JSONP 是通过`<script>`标签的 src 属性，来实现跨域数据获取的，所以，JSONP **只支持 GET 数据请求，不支持 POST 请求**。

注意：***JSONP 和 Ajax 之间没有任何关系***，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP **没有用到 XMLHttpRequest 这个对象**。

### 2.5 jQuery中的JSONP

jQuery 提供的 $.ajax() 函数，除了可以发起真正的 Ajax 数据请求之外，还能够发起 JSONP 数据请求，例如：

```js
$.ajax({
    url: 'JSONP接口地址',
    // 如果要使用 $.ajax() 发起 JSONP 请求，必须指定 datatype 为 jsonp
    dataType: 'jsonp',
    // 自定义的回调函数名称，默认值为jQueryxxx是jQuery随机生成的
    jsonpCallback: 'abc',
    success: function(res) {
        console.log(res)
    }
});
```

### 2.7 jQuery中JSONP的实现过程

jQuery 中的 JSONP，也是通过`<script>`标签的 src 属性实现跨域数据访问的，只不过，jQuery 采用的是动态创建和移除`<script>`标签的方式，来发起 JSONP 数据请求。

* 在发起 JSONP 请求的时候，动态向`<header>`中 append 一个`<script>`标签
* 在 JSONP 请求成功以后，动态从`<header>`中移除刚才 append 进去的`<script>`标签

# 3. 淘宝搜索案例

### 3.1 实现的效果

![image-20210422181835477](../../resource/淘宝搜索效果.png)

### 3.2 接口地址

https://suggest.taobao.com/sug?q=

### 3.3 输入框防抖

**问题**：发现在输入中文未输入完毕之前，就已经将值传递给后端了。需要等待输入完毕之后（停留一定时间）才会把值传递给后台。

##### 1. 什么是防抖

防抖策略（debounce）是当事件被触发后，**延迟n秒**后再**执行回调**，***如果在这n秒内事件又被触发，则重新计时***。

![防抖策略](../../resource/防抖策略.png)

##### 2. 防抖的应用场景

用户在输入框中连续输入一串字符时，可以通过防抖策略，只在输入完后，才执行查询的请求，这样可以有效减少请求次数，节约请求资源。

##### 3. 实现输入框的防抖

**核心原理**：创建一个计时器Timeout，如果触发了keyup事件，就清空定时器，重新调用debouseSearch函数，重新计时。如果500ms内计时器一直存在，那么就会调用Ajax请求。（这里说明了为什么使用Timeout，如果是Interval的话，就会500ms一次的循环请求。）

```js
var timer = null                    // 1. 防抖动的 timer

function debounceSearch(keywords) { // 2. 定义防抖的函数
    timer = setTimeout(function() {
        // 发起 JSONP 请求
        getSuggestList(keywords)
    }, 500)
}

$('#ipt').on('keyup', function() {  // 3. 在触发 keyup 事件时，立即清空 timer
    clearTimeout(timer)
    // ...省略其他代码
    debounceSearch(keywords)
})
```

### 3.4 缓存建议列表

**问题**：用户搜索了一个词过了一会有重新搜索了这个词，这个时候Ajax两次请求，却获取到了同样的数据。我们需要优化一下，让同样的搜索关键字选择本地数据。

##### 1. 定义全局缓存对象

```js
// 缓存对象
const cacheObj = {};
```

##### 2. 将搜索的内容保存到缓存对象中

```js
...... // 渲染页面代码
// 在渲染列表的时候，把关键字作为键，响应数据作为值储存在缓存对象中
cacheObj[search_kw] = resp.result;
```

##### 3. 优先使用缓存数据

```js
// 实现缓存
if (cacheObj[search_kw]) {
    return rendarSuggestList(search_kw, cacheObj[search_kw]);
}
// 没有缓存，再请求后端
clearTimeout(timer);
debounceSearch(search_kw);
```

### 3.3 代码

[案例 - 淘宝搜索](../../code/1-Ajax/案例 - 淘宝搜索)

# 4. 防抖和节流

### 4.1 防抖

查看 3.3 

### 4.2 什么是节流

节流策略（throttle），顾名思义，可以减少一段时间内事件的触发频率。

![节流策略](../../resource/节流策略.png)

### 4.3 节流的应用场景

* 鼠标连续不断的触发某事件（如点击），只在单位时间内触发一次。
* 懒加载时要监听计算滚动条的位置，但不必每次滚动都监听，可以降低计算的频率，而不必浪费CPU的资源

### 4.4 节流案例 - 鼠标跟随效果

##### 1. 渲染UI结构并美化样式

```html
<style>
    html,
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    #angel {
        position: absolute;
    }
</style>
<img src="./angel.gif" alt="" id="angel" />
```

##### 2. 不使用节流实现鼠标跟随效果

```js
$(() => {
    $(document).on("mousemove", function(e) {
        $("#angel")
            .css("left", e.pageX + "px")
            .css("top", e.pageY + "px");
    });
});
```

##### 3. 节流阀的概念

节流阀用于控制需要节流的代码是否需要执行，**如果处在于单位时间内，那么节流阀就设置为拒绝的值**，那么在单位时间内再判断就不会执行函数。**等待单位时间内结束后，再将节流阀设置为允许的值**，这样开始新的循环。

##### 4. 使用节流阀的鼠标跟随

```js
$(() => {
    // 节流阀
    let timer = null;
    $(document).on("mousemove", function(e) {
        if (timer) {
            return;
        }
        // 16毫秒内无法被再次触发
        timer = setTimeout(() => {
            $("#angel")
                .css("left", e.pageX + "px")
                .css("top", e.pageY + "px");
            timer = null;
        }, 16);
    });
});
```

### 4.5 防抖和节流的区别

* 防抖：如果事件被频繁触发，***防抖能保证只有最后一次触发生效***！前面N多次触发都不会生效。
* 节流：如果事件被频繁触发，节流能够***减少事件触发的频率***，因此，节流是有选择性的执行一部分事件。
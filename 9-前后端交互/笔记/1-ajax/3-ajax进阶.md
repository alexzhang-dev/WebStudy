# 目标

* 能够知道如何使用XMLHttpRequest发起Ajax请求
* 能够知道如何封装自己的Ajax函数
* 能够使用XMLHttpRequest Level2中提供的特性
* 能够知道jQuery中如何实现文件上传与loading效果
* 能够知道如何使用axios发起Ajax请求

# 1. XMLHttpRequest的基本使用

### 1.1 什么XMLHttpRequest

XMLHttpRequest（简称 xhr）是浏览器提供的 Javascript 对象，通过它，可以**请求服务器上的数据资源**。之前所学的 jQuery 中的 Ajax 函数，就是基于 xhr 对象封装出来的。

所以jQuery的`$.get()`、`$.post()`、`$.ajax()`函数底层其实还是`xhr`

### 1.2 使用xhr发起GET请求

**步骤**：

* 创建`xhr`对象
* 调用`xhr.open()`函数
* 调用`xhr.send()`函数
* 监听`xhr.onreadystatechange`事件

**示例**：

```js
// 1. 创建xhr对象
const xhr = new XMLHttpRequest();
// 2. 调用xhr.open()函数
xhr.open("GET", "GET地址");
// 3. 调用xhr.send()函数，发起Ajax请求
xhr.send();
// 4. 监听xhr.onreadystatechange事件
xhr.addEventListener("readystatechange", (resp) => {
    // 4.1 监听xhr的请求状态 readyState，与服务器响应状态 status
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 4.2 打印服务器响应的内容
        console.log(xhr.responseText);
    }
});
```

### 1.3 了解xhr对象中的readyState属性

XMLHttpRequest 对象的`readyState`属性，用来表示当前 Ajax 请求所处的状态。每个 Ajax请求**必然处于以下状态中的一个**：

| **值** | **状态**         | **描述**                                           |
| ------ | ---------------- | -------------------------------------------------- |
| 0      | UNSENT           | XMLHttpRequest 对象已被创建，但尚未调用open方法。  |
| 1      | OPENED           | open()方法已经被调用。                             |
| 2      | HEADERS_RECEIVED | send()方法已经被调用，响应头也已经被接收。         |
| 3      | LOADING          | 数据接收中，此时response属性中已经包含部分数据。   |
| 4      | DONE             | Ajax请求完成，这意味着数据传输已经彻底完成或失败。 |

### 1.4 使用xhr发送带参数的请求

使用 xhr 对象发起带参数的 GET 请求时，只需在调用 xhr.open 期间，**为 URL 地址指定参数即可**：

```js
xhr.open('GET', '地址?id=1&name=abc')
```

其中`?`后面的就是参数，这种在 URL 地址后面拼接的参数，叫做**查询字符串**。

### 1.5 查询字符串

##### 1. 什么是查询字符串

**定义**：查询字符串（URL参数）是指在URL的末尾加上用于向服务器发送信息的字符串（变量）。

**格式**：将英文的`?`放在URL的末尾，然后再加上参数`=`值 ，想加上多个参数的话，使用 `&`符号进行分隔。以这个形式，可以将想要发送给服务器的数据添加到 URL 中。

> * 不带参数的 URL 地址
>   http://www.baidu.com/
> * 带一个参数的 URL 地址
>   http://www.baidu.com/s?wd=abc
> * 带两个参数的 URL 地址
>   https://www.baidu.com/s?wd=abc&ie=UTF-8

##### 2. GET请求携带参数的本质

无论使用`$.ajax()`，还是使用`$.get()`，又或者直接使用`xhr对象`发起 GET 请求，当需要携带参数的时候，本质上，**都是直接将参数以查询字符串的形式**，追加到 URL 地址的后面，发送到服务器的。

```js
$.get('url', {name: 'zs', age: 20}, function() {})
// 等价于
$.get('url?name=zs&age=20', function() {})

$.ajax({ method: 'GET', url: 'url', data: {name: 'zs', age: 20}, success: function() {} })
// 等价于
$.ajax({ method: 'GET', url: 'url?name=zs&age=20', success: function() {} })
```

### 1.6 URL编码与解码

##### 1. 什么是URL编码

URL 地址中，只允许出现英文相关的**字母、标点符号、数字**，因此，在 URL 地址中不允许出现中文字符。

如果 URL 中需要包含中文这样的字符，则必须对中文字符进行**编码**（转义）。

URL编码的原则：使用安全的字符（没有特殊用途或者特殊意义的可打印字符）去表示那些不安全的字符。

URL编码原则的通俗理解：***使用英文字符去表示非英文字符。***

> https://www.baidu.com/s?wd=你好
>
> 经过URL编码后，变成了：
>
> https://www.baidu.com/s?wd=%E4%BD%A0%E5%A5%BD

##### 2. 如何对URL进行编码与解码

浏览器提供了 URL 编码与解码的 API，分别是：

* `encodeURI()`编码
* `decodeURI()`解码

##### 3. URL编码的注意事项

由于浏览器会自动对 URL 地址进行编码操作，因此，大多数情况下，程序员不需要关心 URL 地址的编码与解码操作。

更多关于 URL 编码的知识，请参考如下博客：https://blog.csdn.net/Lxd_0111/article/details/78028889

### 1.7 使用xhr发起post请求

**步骤**：

* 创建`xhr`对象
* 调用`xhr.open()`函数
* 设置`Content-Type`属性（**固定写法**）
* 调用`xhr.send()`函数，同时指定要发送的数据
* 监听`xhr.onreadystatechange`事件

**示例**：

```js
// 1. 创建 xhr 对象
let xhr = new XMLHttpRequest();
// 2. 调用 open()
xhr.open("POST", "POST地址");
// 3. 设置 Content-Type 属性（固定写法）
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 4. 调用 send()，同时将数据以查询字符串的形式，提交给服务器
xhr.send("user=alex&age=18");
// 5. 监听 onreadystatechange 事件
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
```

# 2. 数据交换格式

### 2.1 什么是数据交换格式

数据交换格式，就是**服务器端**与**客户端**之间进行***数据传输与交换的格式***。

前端领域，经常提及的两种数据交换格式分别是`XML`和`JSON`。其中XML用的非常少，所以，**我们重点要学习的数据交换格式就是JSON**。

### 2.2 XML

##### 1. 什么是XML

XML的英文全称是`EXtensible Markup Language`，即可扩展标记语言。因此，XML和 HTML类似，也是一种标记语言。

> ```html
> <!DOCTYPE html>
> <html>
>   <head>
>     <title>Document</title>
>   </head>
>   <body></body>
> </html>
> ```
>
> ↑**HTML**
>
> ```xml
> <note>
>   <to>ls</to>
>   <from>zs</from>
>   <heading>通知</heading>
>   <body>晚上开会</body>
> </note>
> ```
>
> ↑**XML**

##### 2. XML和HTML的区别

XML和HTML虽然都是标记语言，但是，它们两者之间没有任何的关系。

* HTML被设计用来描述网页上的内容，**是网页内容的载体**

* XML 被设计用来传输和存储数据，**是数据的载体**

##### 3. XML的缺点

* XML 格式臃肿，和数据无关的代码多，体积大，传输效率低
* 在Javascript中解析XML比较麻烦

### 2.3 JSON

##### 1. 什么是JSON

**概念**：JSON 的英文全称是`JavaScript Object Notation`，即“**JavaScript对象表示法**”。简单来讲，***JSON就是Javascript对象和数组的字符串表示法***，它使用文本表示一个 JS 对象或数组的信息，因此，JSON 的本质是**字符串**。

**作用**：JSON 是一种轻量级的文本数据交换格式，在作用上类似于 XML，专门用于存储和传输数据，<u>但是 JSON 比 XML 更小、更快、更易解析</u>。

**现状**：JSON 是在 2001 年开始被推广和使用的数据格式，到现今为止，JSON 已经成为了主流的数据交换格式。

##### 2. JSON的两种结构

JSON 就是用字符串来表示 Javascript 的**对象**和**数组**。所以，JSON 中包含对象和数组两种结构，通过这两种结构的相互嵌套，可以表示各种复杂的数据结构。

**对象结构**：对象结构在 JSON 中表示为`{ }`括起来的内容。数据结构为`{ key: value, key: value, … }`的键值对结构。其中，**key必须是使用英文的双引号包裹的字符串**，value 的数据类型可以是**<u>数字</u>**、**<u>字符串</u>**、<u>**布尔值**</u>、<u>**null**</u>、<u>**数组**</u>、<u>**对象**</u>6种类型。

在JSON结构中，所有的字符串需要用`""`包裹，不可以使用`''`

```json
{
    "name": "zs",
    "age": 20,
    "gender": "男",
    "address": null,
    "hobby": ["吃饭", "睡觉", "打豆豆"]
}
```

**数组结构**：数组结构在 JSON 中表示为`[ ]`括起来的内容。数据结构为`[ "java", "javascript", 30, true … ] `。数组中数据的类型可以是**<u>数字</u>**、**<u>字符串</u>**、**<u>布尔值</u>**、**<u>null</u>**、**<u>数组</u>**、**<u>对象</u>**6种类型。

```json
[
    1,
    "alex",
    true,
    null,
    ["鸡蛋", "苹果"],
    {
        name: "alex"
    }
]
```

##### 3. JSON语法注意事项

* 属性名必须使用**双引号包裹**
* 字符串类型的值必须使用**双引号包裹**
* JSON中**不允许使用单引号**表示字符串
* JSON中不能写注释
* JSON的最外层必须是对象或数组格式
* 不能使用***undefined或函数***作为JSON的值

**JSON 的作用**：在计算机与网络之间存储和传输数据。

**JSON 的本质**：用字符串来表示 Javascript 对象数据或数组数据

##### 4. JSON和JS对象的关系

JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。例如：

```js
//这是一个对象
let obj = {a: 'Hello', b: 'World'}

//这是一个 JSON 字符串，本质是一个字符串
let json = '{"a": "Hello", "b": "World"}' 
```

##### 5. JSON和JS对象的互转

要实现从 JSON 字符串转换为 JS 对象，使用`JSON.parse()`方法：

```js
let obj = JSON.parse('{"a": "Hello", "b": "World"}')
//结果是 {a: 'Hello', b: 'World'}
```

要实现从 JS 对象转换为 JSON 字符串，使用`JSON.stringify()`方法：

```javascript
let json = JSON.stringify({a: 'Hello', b: 'World'})
//结果是 '{"a": "Hello", "b": "World"}'
```

##### 6. 序列化和反序列化

把<span style="color:blue">数据对象</span>转化为<span style="color:red">字符串</span>的过程，叫做**序列化**。例如`JSON.stringify()`是JSON的序列化

把<span style="color:red">字符串</span>转化为<span style="color:blue">数据对象</span>的过程，叫做**反序列化**。例如`JSON.parse()`是JSON的反序列化

# 3. 封装自己的Ajax函数

### 3.1 效果

```html
<!-- 1. 导入自定义的ajax函数库 -->
<script src="js/myAjax.js"></script>

<script>
    // 2. 调用自定义的 ajax 函数，发起 Ajax 数据请求
    ajax({
        method: '请求类型',
        url: '请求地址',
        data: { /* 请求参数对象 */ },
        success: function(res) { // 成功的回调函数
            console.log(res)     // 打印数据
        }
    })
</script>
```

### 3.2 定义options参数选项

* `method`：请求的类型
* `url`：请求的 URL 地址
* `data`：请求携带的数据
* `success`：请求成功之后的回调函数

### 3.3 处理data参数

需要把 data 对象，转化为查询字符串的格式。

```js
/**
 *  @param data 需要传入的参数，是对象格式
 *  @returns 返回拼接好的字符串，例如 name=alex&age=18
 */
function resolveData(data) {
    const arr = [];
    for (const key in data) {
        arr.push(`${key}=${data[key]}`)
    }
    return arr.join("&");
}
```

### 3.4 ajax核心代码

```js
function ajax(options) {
    const xhr = new XMLHttpRequest();
    if (options.method.toUpperCase() === "GET") {
        // 如果是GET请求
        xhr.open(options.method, options.url + "?" + resolveData(options.data));
        xhr.send();
    } else {
        // 如果是POST请求，添加上请求头，send添加请求的参数
        xhr.open(options.method, options.url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(resolveData(options.data));
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 将返回的值序列化为JSON字符串返回，并执行success函数。
            const result = JSON.parse(this.responseText);
            options.success(result);
        }
    };
}
```

# 4. XMLHttpRequest Level2的新特性

### 4.1 认识xhr level2

##### 1. 旧版xhr的缺点

* 只支持文本数据的传输，无法用来读取和上传文件
* 传送和接收数据时，没有进度信息，只能提示有没有完成

##### 2. xhr Level2的新功能

* 可以设置HTTP请求的时限
* 可以使用FormData对象管理表单数据
* 可以上传文件
* 可以获得数据传输的进度信息

### 4.2 设置HTTP请求时限

有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了`timeout`属性，可以设置 HTTP 请求的时限：

```js
xhr.timeout = 3000
```

上面的语句，是将最长等待时间设置为`3000毫秒`。过了这个时限，就会自动停止HTTP请求。与之配套的还有`timeout事件`，用来指定回调函数

```js
xhr.ontimeout = function(){
    alert("请求超时")
}
```

### 4.3 FormData对象管理表单数据

Ajax 操作往往用来提交表单数据。为了方便表单处理，**HTML5** 新增了一个`FormData`对象，可以模拟表单操作：

```js
// 1. 新建 FormData 对象
let fd = new FormData()
// 2. 为 FormData 添加表单项
fd.append('uname', 'zs')
fd.append('upwd', '123456')
// 3. 创建 XHR 对象
let xhr = new XMLHttpRequest()
// 4. 指定请求类型与URL地址
xhr.open('POST', 'POST地址')
// 5. 直接提交 FormData 对象，这与提交网页表单的效果，完全一样
xhr.send(fd)
```

FormData对象也可以用来**获取网页表单的值**，示例代码如下：

```js
 // 获取表单元素
 let form = document.querySelector('#form1')
 // 监听表单元素的 submit 事件
 form.addEventListener('submit', function(e) {
    e.preventDefault()
     // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
     let fd = new FormData(form)
     let xhr = new XMLHttpRequest()
	 xhr.open('POST', 'POST地址')
     xhr.send(fd)
     xhr.onreadystatechange = function() {}
})
```

### 4.4 上传文件

新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件。

**实现步骤**：

* 定义UI结构
* 验证是否选择了文件
* 向FormData中追加文件
* 使用XHR发起上传文件的请求
* 监听onreadystatechange事件

##### 1. 定义UI结构

```html
<!-- 1. 文件选择框 -->
<input type="file" id="file1" />
<!-- 2. 上传按钮 -->
<button id="btnUpload">上传文件</button>
<br />
<!-- 3. 显示上传到服务器上的图片 -->
<img src="" alt="" id="img" width="800" />
```

##### 2. 验证是否选择了文件

```js
// 1. 获取上传文件的按钮
let btnUpload = document.querySelector('#btnUpload')
// 2. 为按钮添加 click 事件监听
btnUpload.addEventListener('click', function() {
    // 3. 获取到选择的文件列表
    let files = document.querySelector('#file1').files
    if (files.length <= 0) {
        return alert('请选择要上传的文件！')
    }
    // ...后续业务逻辑
})
```

##### 3. 向FormData中追加文件

```js
// 1. 创建 FormData 对象
let fd = new FormData()
// 2. 向 FormData 中追加文件
fd.append('avatar', files[0])
```

##### 4. 使用 xhr 发起上传文件的请求

```js
// 1. 创建 xhr 对象
let xhr = new XMLHttpRequest()
// 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
// 3. 发起请求
xhr.send(fd);
```

##### 5. 监听onreadystatechange事件

```js
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        if (data.status === 200) { // 上传文件成功
            // 将服务器返回的图片地址，设置为 <img> 标签的 src 属性
         	document.querySelector('#img').src = 'POST地址' + data.url
        } else { // 上传文件失败
            console.log(data.message)
        }
    }
}
```

### 4.5 显示文件上传进度

新版本的 XMLHttpRequest 对象中，可以通过监听`xhr.upload.onprogress`事件，来获取到文件的上传进度。语法格式如下：

```js
// 创建 XHR 对象
const xhr = new XMLHttpRequest()
// 监听 xhr.upload 的 onprogress 事件
xhr.upload.onprogress = function(e) {
    // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
    if (e.lengthComputable) {
        // e.loaded 已传输的字节
        // e.total  需传输的总字节
        const percentComplete = Math.ceil((e.loaded / e.total) * 100)
        }
}
```

### 4.6 基于bootstrap绘制上传进度条

##### 1. 导入需要的库

```html
<link rel="stylesheet" href="css/bootstrap.css" />
<script src="js/jquery.js"></script>
```

##### 2. 进入官方示例复制想要的进度条效果

```html
<div class="progress" style="max-width: 15em">
    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em">
        0%
    </div>
</div>
```

##### 3. 默认让进度条隐藏

```js
$(".progressMsg").hide();
$(".progress").hide();
```

##### 4. 在监听上传进度时出现

```js
xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
        let procent = Math.ceil((e.loaded / e.total) * 100);
        // 这里打开并显示
        $(".progressMsg").show();
        $(".progress").show().html(`
<div class="progress-bar" role="progressbar" aria-valuenow="${procent}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;width:${procent}%">
${procent}%
</div>
`);
    }
});
```

# 5. 使用jQuery的Ajax方法上传文件

##### 1. 上传文件

```js
$.ajax({
    method: 'POST',
    url: 'http://www.liulongbin.top:3006/api/upload/avatar',
    data: fd,
    // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
    contentType: false,
    // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
    processData: false,
    success: function(res) {
        console.log(res)
    }
})
```

##### 2. 实现进度条

Ajax 请求开始时，执行`ajaxStart`函数。可以在 ajaxStart 的 callback 中显示 loading 效果，示例代码如下：

```js
// 自 jQuery 版本 1.8 起，该方法只能被附加到文档 document
$(document).ajaxStart(function() {
    $('#loading').show()
})
```

**注意**： `$(document).ajaxStart()`函数会监听当前文档内***所有的 Ajax 请求***。

Ajax 请求结束时，执行`ajaxStop`函数。可以在 ajaxStop 的 callback 中隐藏 loading 效果，示例代码如下：

```js
// 自 jQuery 版本 1.8 起，该方法只能被附加到文档
$(document).ajaxStop(function() {
    $('#loading').hide()
})
```

# 6. axios

### 6.1 什么是axios

Axios 是专注于**网络数据请求**的库。
相比于原生的 XMLHttpRequest 对象，**axios 简单易用**。
相比于 jQuery，axios 更加**轻量化**，只专注于网络数据请求。

### 6.2 axios发起GET请求

axios 发起 get 请求的语法：

```js
axios.get('url', { params: { /*参数*/ } }).then(callback)
```

具体的请求示例如下：

```js
// 请求的 URL 地址
let url = 'GET地址'
// 请求的参数对象
let paramsObj = { name: 'zs', age: 20 }
// 调用 axios.get() 发起 GET 请求
axios.get(url, { params: paramsObj }).then(function(res) {
    // res.data 是服务器返回的数据
    let result = res.data
    console.log(res)
});
```

### 6.3 axios发起POST请求

axios 发起 post 请求的语法：

```js
axios.post('url', { /*参数*/ }).then(callback)
```

具体的请求示例如下：

```js
// 请求的 URL 地址
let url = 'POST地址'
// 要提交到服务器的数据
let dataObj = { location: '北京', address: '顺义' }
// 调用 axios.post() 发起 POST 请求
axios.post(url, dataObj).then(function(res) {
    // res.data 是服务器返回的数据
    let result = res.data
    console.log(result)
})
```

### 6.4 直接使用axios发起请求

axios 也提供了类似于 jQuery 中 $.ajax() 的函数，语法如下：

```js
 axios({
     method: '请求类型',
     url: '请求的URL地址',
     data: { /* POST数据 */ },
     params: { /* GET参数 */ }
 }) .then(callback)
```


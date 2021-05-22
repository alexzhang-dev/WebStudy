# 目标：

* 能够说出什么是前后端交互模式
* 能够说出 Promise 的相关概念和用法
* 能够使用 fetch 进行接口调用
* 能够使用 axios 进行接口调用
* 能够使用 async/await 方式调用接口
* 能够基于后台接口实现案例

# 1. 前后端交互模式

### 1.1 接口调用方式

* 原生 ajax
* 基于 jQuery 的 ajax
* fetch
* axios

### 1.2 URL 地址格式

#### 1. 传统形式的 URL

格式：`schema://host:port/path?query#fragment`

* `schema`：协议。例如http、https、ftp等
* `host`：域名或IP地址
* `port`：端口，http默认端口80
* `path`：路径。例如/a/b/c
* `query`：查询参数，例如 uname=zs&age=18
* `fragment`：锚点（也叫哈希Hash），用于定位页面的某个位置

#### 2. Restful 形式的 URL

这种URL**和HTTP请求方式**密切相关

* HTTP请求方式
  * `GET`查询
  * `POST`添加
  * `PUT`修改
  * `DELETE`删除
* 符合规则的 URL 地址
  * `http://www.hello.com/books` GET
  * `http://www.hello.com/books` POST
  * `http://www.hello.com/books/123` PUT
  * `http://www.hello.com/books/123` DELETE

# 2. Promise 用法

### 2.1 异步调用

* 异步效果分析
  * 定时任务
  * Ajax
  * 事件函数

* 多次异步调用的依赖分析

  * 多次异步调用的结果顺序不确定

  * 异步调用结果如果存在依赖需要嵌套

    ```js
    $.ajax({
        success: function(data){
            if(data.status == 200){
               	$.ajax({
                    success: function(data){
                        if(data.status == 200){
                           $.ajax({......})
                        }
                    }
                });
            }
        }
    });
    ```

    回调嵌套过多，又称为`回调地狱`

### 2.2 Promise 概述

Promise是异步编程的一种解决方案，从语法上讲，Promise是一个对象，从它可以获取异步操作的消息。

使用Promise主要有以下好处：

* 可以避免多层异步调用嵌套问题（回调地狱）
* Promise对象提供了简洁的API，使得控制异步操作更加容易

文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

### 2.3 Promise基本用法

* 实例化`Promise`对象，构造函数中传递参数，该函数中用于处理异步任务
* `resolve`和`reject`两个参数用于处理**成功**和**失败**两种情况，并通过`.then`获取**处理结果**

```js
var p = new Promise(function(resolve, reject){
    // 成功调用 resolve()
    // 失败调用 reject()
});
p.then(function(data){
    // 从 resolve 得到正常的结果
}, function(err){
    // 从 reject 得到错误信息
});
```

详细请看[代码示例](./code/3-Vue前后端交互/2-Promise的基本用法.html)

### 2.4 基于Promise处理Ajax请求

#### 1. 处理原生Ajax请求

```js
function queryData(url) {
    var p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 处理正常的情况
                resolve(xhr.responseText);
            } else {
                // 处理异常的情况
                reject("出错了");
            }
        };
        xhr.open("get", url);
        xhr.send(null);
    });
    return p;
}
queryData("http://127.0.0.1/api/get").then(
    (data) => {
        console.log(data);
    },
    (err) => {
        console.log(err);
    }
);
```

详细请看[代码示例](./code/3-Vue前后端交互/3-Promise处理原生Ajax.html)

#### 2. 发送多次ajax请求

```javascript
queryData('http://127.0.0.1/api/get').then((data) => {
    console.log(data);
    return queryData('http://127.0.0.1/api/get2');
}).then((data) => {
    console.log(data);
    return queryData('http://127.0.0.1/api/get3');
}).then((data) => {
    console.log(data);
});
```

详细请看[代码示例](./code/3-Vue前后端交互/4-发送多次Ajax请求处理.html)

### 2.5 then参数中的函数返回值

#### 1. 返回 Promise 实例对象

返回的该实例对象可以调用**下一个then**

#### 2. 返回普通值

返回的普通值会直接传递到下一个then，通过then参数中函数的参数接收该值

如果返回一个普通值，那么下一个then其实是系统默认的Promise对象执行的

详细请看[代码示例](./code/3-Vue前后端交互/5-then返回值的两种情况.html)

### 2.6 Promise常用的API

#### 1. 实例方法

* `.then()`：得到异步任务的正确结果
* `.catch()`：获取异常信息
* `.finally()`：成功与否都会执行

```js
queryData().then(function(data){
    // 成功情况
}).catch(function(err){
    // 异常情况
}).finally(function(){
    // 无论成功与否都会执行
});
```

详细请看[代码示例](./code/3-Vue前后端交互/6-Promise常见API之实例方法.html)

#### 2. 对象方法

* `Promise.all()`：并发处理多个异步任务，**所有任务**执行完成后才得到结果
* `Promise.race()`：并发处理多个异步任务，**只要一个任务**完成都会得到结果

```js
Promise.all([p1, p2, p3]).then((result) => {
    console.log(result)
});
Promise.race([p1, p2, p3]).then((result) => {
    console.log(result)
});
```

详细请看[代码示例](./code/3-Vue前后端交互/7-Promise常见API之对象方法.html)

# 3. 接口调用-fetch用法

### 3.1 fetch 概述

#### 1. 基本特性

* 更加简单的数据获取方式，功能更强大、更灵活，可以看做xhr的升级版
* 基于Promise实现
* 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

#### 2. 语法结构

```js
fetch(url).then(fn2)
          .then(fn3)
          .then(fn4)
          ......
          .catch(fn)
```

### 3.2 fetch的基本用法

```js
fetch(url).then(data => {
    // text()方法属于fetchAPI的一部分，返回Promise实例对象
    // 用于获取后台返回的数据
    return data.text();
}).then(data => {
    // 注意这里获取到的才是最终的数据
    console.log(data);
})
```

### 3.3 fetch请求参数

#### 1. 常用配置选项

* `method(String)`：HTTP请求方法，默认为GET(GET、POST、PUT、DELETE)
* `body(String)`：HTTP请求参数
* `headers(Object)`：HTTP的请求头，默认为{}空对象

```js
// 第2个参数用于配置fetch
fetch(url, {
    method: 'GET'
}).then(data => {
    return data.text();
}).then(data => {
    console.log(data);
});
```

#### 2. GET请求的参数传递

传统的，直接通过查询字符串就可以

```js
fetch("/abc?id=123")
    .then(data => {
        return data.text();
    })
    .then(data => {
        console.log(data);
    });
```

RESTful形式的，需要这样

```js
fetch("/abc/123", {
    method: 'GET'
}).then(data => {
    return data.text();
}).then(data => {
    console.log(data);
});
```

#### 3. DELETE请求的参数传递

```js
fetch("/abc/123", {
    method: 'DELETE'
}).then(data => {
    return data.text();
}).then(data => {
    console.log(data);
});
```

#### 4. POST请求的参数传递

```js
fetch("/add", {
    method: 'POST',
    body: 'uname=zs&pwd=123',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}).then(data => {
    return data.text();
}).then(data => {
    console.log(data);
});
```

发送请求时数据也可以设置为JSON格式

```js
fetch("/add", {
    method: "POST",
    body: JSON.stringify({
        uname: "lisi",
        pwd: "123",
    }),
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((data) => {
    return data.text();
})
    .then((data) => {
    console.log(data);
});
```

#### 5. PUT请求的参数传递

```js
fetch("/add/123", {
    method: "PUT",
    body: JSON.stringify({
        uname: "lisi",
        pwd: "123",
    }),
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((data) => {
    return data.text();
})
    .then((data) => {
    console.log(data);
});
```

### 3.4 fetch响应结果

#### 响应数据格式

* `text()`：将返回体处理为字符串类型
* `json()`：返回结果和`JSON.parse(responseText)`结果一样

```js
fetch(url)
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
    });
```

# 4. 接口调用-axios用法

### 4.1 axios的基本特性

axios（官网：https://github.com/axios/axios）是一个基于Promise用于浏览器和node.js的HTTP客户端。

它具有以下特性：

* 支持浏览器和node.js
* 支持Promise
* 能拦截请求和响应
* 自动转换JSON数据

### 4.2 axios的基本用法

```js
axios.get('/get').then(result => {
    // data属性名称是固定的，用于获取后台响应的数据
    console.log(result.data);
});
```

### 4.3 axios常用API

* `get()`：查询数据
* `post()`：添加数据
* `put()`：修改数据
* `delete()`：删除数据

### 4.4 axios参数传递

#### 1. GET传递参数

* 通过`URL`传递参数
* 通过`params`传递参数

```js
// url传递参数
axios.get("/get?id=1").then((result) => {
    console.log(result.data);
});
// resuful格式也是支持的
axios.get("/get/1").then((result) => {
    console.log(result.data);
});
// params传递参数
axios
    .get("/get", {
    params: {
        id: 1,
    },
})
    .then((result) => {
    console.log(result.data);
});
```

#### 2. DELETE传递参数

参数传递方式与GET类似

```js
axios.delete("/get?id=1").then((result) => {
    console.log(result.data);
});
// resuful格式也是支持的
axios.delete("/get/1").then((result) => {
    console.log(result.data);
});
// params传递参数
axios
    .post("/get", {
    params: {
        id: 1,
    },
})
    .then((result) => {
    console.log(result.data);
});
```

#### 3. POST传递参数

通过选项传递参数（默认传递的是JSON格式的数据）

```js
axios
    .post("http://127.0.0.1/api/axiosadd", {
    name: "zs",
    age: 18,
})
    .then((res) => {
    console.log(res.data);
});
```

通过`URLSearchParams`传递参数（传递的是application/x-www-form-urlencoded格式的数据）

```js
const params = new URLSearchParams();
params.append("name", "zs");
params.append("age", 18);
axios.post("http://127.0.0.1/api/axiosadd", params).then((res) => {
    console.log(res.data);
});
```

#### 4. PUT请求

和POST请求类似

```js
axios
    .put("http://127.0.0.1/api/axiosput/1", {
    name: "zs",
    age: 18,
})
    .then((res) => {
    console.log(res.data);
});
// 2种方法均可使用
const params2 = new URLSearchParams();
params2.append("name", "zs");
params2.append("age", 18);
axios.put("http://127.0.0.1/api/axiosput/1", params2).then((res) => {
    console.log(res.data);
});
```

### 4.5 axios响应结果

#### 响应结果的主要属性

* `data`：响应的数据
* `headers`：响应头信息
* `status`：响应状态码
* `statusText`：响应状态信息

### 4.6 axios全局配置

* `axios.defaults.timeout = 3000;`：超时时间
* `axios.defaults.baseURL = 'http://127.0.0.1/api'`：请求的基准URL地址
* `axios.defaults.headers['mytoken'] = 'sadkhasf2halsnflasf'`：默认请求头

### 4.7 axios拦截器

#### 1. 请求拦截器

在请求发出之前设置一些信息

<img src="./resource/10-axios请求拦截器.png" align="left" />

```js
// 添加一个请求拦截器
axios.interceptors.request.use(function(config){
    // 在请求发出之前进行一些信息设置
    return config;
}, function(err){
    // 处理响应的错误信息
});
```

#### 2. 响应拦截器

在获取数据之前对数据做一些加工处理

<img src="./resource/11-axios响应拦截器.png" align="left" />

```js
// 添加一个响应拦截器
axios.interceptors.response.use(function(res){
    // 在这里对返回的数据做一些处理
    return res;
}, function(err){
    // 处理响应的错误信息
});
```

# 5. 接口调用-async/await用法

### 5.1 async/await的基本用法

* `async`/`await`是ES7引入的新语法，可以更加方便的进行异步操作

* `async`关键字用于函数上（`async`函数的返回值**是Promise实例对象**）
* `await`关键词用于`async`函数中（await可以得到**异步的结果**）

```js
async function queryData(id) {
    const result = await axios.get('/data');
    return result;
}
queryData.then(result => {
    console.log(result)
})
```

### 5.2 async/await处理多个异步程序

#### 多个异步请求的场景

```js
axios.defaults.baseURL = "http://127.0.0.1/api";
// 多个异步任务
async function queryData() {
    const info = await axios.get("/async1");
    // 上一个异步任务的结果是下一个异步任务的参数
    // 此时await关键字就是等待上一个Promise任务执行完成后再执行
    const result = await axios.get("/async2?info=" + info.data);
    return result;
}
queryData().then((result) => {
    console.log(result.data);
});
```

# 6. 基于接口的案例

需要调用的接口：

* 图书列表数据加载**GET** `/books`
* 添加图书**POST**`/books`
* 验证图书名称是否存在**GET**`/books/book/:name`
* 编辑图书-根据ID查询图书信息**GET**`/books/:id`
* 编辑图书-提交图书信息**PUT**`/books/:id`
* 删除图书**DELETE**`/books/:id`


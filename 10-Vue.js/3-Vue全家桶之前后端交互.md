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


### 1. 如何引入该模块
```js
const utils = reqiure('alexzhang-test-utils');
```
### 2. 该模块有哪些作用
#### 格式化日期
```js
utils.dateFormat(dateStr);
```
参数：当前时间字符串
返回值：`YYYY-MM-DD HH:mm:ss`格式的字符串

#### 转义HTML字符
```js
utils.htmlEscape(str);
```
参数：需要转义的HTML字符串
返回值：转义好的HTML字符串

#### 反转义HTML字符串
```js
utils.htmlUnEscape(str);
```
参数：已转义的HTML字符串
返回值：还原的HTML字符串

#### 开源协议
ISC
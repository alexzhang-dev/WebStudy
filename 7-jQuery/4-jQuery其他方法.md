# 目标

* 能够说出jQuery对象的拷贝方法
* 能够说出jQuery多库共存的2种方法
* 能够使用jQuery插件

# 1. jQuery对象拷贝

如果想要把某个对象拷贝（合并）给另一个对象使用，此时可使用`$.extend()`方法

### 语法

```javascript
$.extend([deep], target, object1, [objectN]);
```

* `deep`：如果是true为深拷贝，默认为false，浅拷贝
* `target`：需要拷贝的目标对象
* `object1`：待拷贝到目标对象的第1个对象
* `objectN`：待拷贝到目标对象的第N个对象
* 浅拷贝，只拷贝`复杂数据类型的地址`，修改原来的复杂数据类型，也会修改拷贝到的复杂数据类型。

如果原对象本身有数据，则`原数据保留`，如果出现冲突，会`覆盖`

### 实例

```javascript
let targetObj = {};
let obj = {
    name: "alex",
    age: 18,
};
$.extend(targetObj, obj); // 把obj拷贝给targetObj
console.log(targetObj);
```

# 2. jQuery多库共存

### 问题概述：

jQuery使用`$`作为标识符，随着jQuery的流行，其他js库也会使用$作为标识符，这样一起使用会导致冲突。

### 客观需求：

需要一个解决方案，让jQuery和其他的js库不存在冲突，可以同时存在，这就叫做多库共存。

### jQuery解决方案

1. 把里面的`$`全部改成`jQuery`。比如`jQuery("div")`
2. jQuery变量规定新的名称：`$.noConflict()`。比如`const jquery = $.noConflict()`

# 3. jQuery插件

jQuery功能毕竟有限，想要更加复杂的效果，就需要借助jQuery插件来完成

**注意**：这些插件是依赖于jQuery实现的，所以必须在使用插件前先引入jQuery文件

### jQuery插件网站

jQuery插件库：http://www.jq22.com/

jQuery之家：http://www.htmleaf.com/

### jQuery插件实例

1. 瀑布流

2. 图片懒加载（图片延迟加载，可提高网页下载速度，降低服务器负载）当我们的页面滑动到可视区域时，再加载当前区域的图片。我们使用`EasyLazyLoad`，注意此时的JS文件引用和调用必须要放在所有DOM元素的后面。

3. 全屏滚动插件（FullPage.js）

   github：https://github.com/alvarotrigo/fullPage.js

   中文网站：http://www.dowebok.com/demo/2014/77/

4. bootstrap JS插件

   bootstrap框架也是基于jQuery开发的，因此里面的JS插件如果需要使用，必须先引入jQuery文件

5. 图片切换插件（cycle.js）

   官网：https://jquery.malsup.com/cycle/

# 4. 综合案例

toDoList

### 4.1 功能需求

* 文本框输入内容，按下回车，就可以生成待办事项
* 点击待办事项复选框，就可以将当前数据添加到已完成事项里面
* 点击已完成事项复选框，将当前数据添加到待办事项中
* 刷新页面不会丢失数据

### 4.2 使用的技术

* 本地储存，localStorage保证刷新页面不丢失数据
* 使用jQuery

### 4.3 代码

[文件夹](code/47-toDoList案例/)

[JS源代码](code/47-toDoList案例/js/index.js)


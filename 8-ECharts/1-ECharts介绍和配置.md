# 目标

* 能够说出数据可视化的目的
* 能够说出ECharts的基本使用步骤
* 能够独立使用ECharts完成数据可视化项目的开发

# 1. 什么是数据可视化

### 1.1 数据可视化

数据可视化主要目的：借助于图形化手段，清晰有效的传达与沟通信息。

数据可视化可以把数据从冰冷的数字转换为图形，揭示蕴含在数据中的规律

### 1.2 数据可视化应用场景

目前互联网公司通常有这么几大类的可视化需求：

* 通用报表
* 移动端图表
* 大屏可视化
* 图编辑&图分析
* 地理可视化

### 1.3 常见的数据可视化库

* `D3.js`目前Web端评价最高的JS可视化工具库（入手难）
* `ECharts.js`百度出品的开源JS数据可视化库
* `Highcharts.js`国外的前端可视化库，开源免费，目前很多公司使用
* `AntV`蚂蚁金服出品数据可视化解决方案
* 等等

# 2. 数据可视化项目概述

### 2.1 项目目的

##### 市场需求：

应对现在数据可视化的需求，越来越多企业需要很多场景（营销数据、生产数据、用户数据）下使用，可视化图表可以让数据更加直观，数据特点更加突出。

##### 学习要求：

承上：

* 复习之前的学习内容
* HTML5+CSS3布局
* JS/jQuery等技术

启下：

* 为学习服务器编程做铺垫
* 学习将服务器内容渲染到页面中

### 2.2 项目技术

* HTML5+CSS3
* CSS3动画、渐变
* jQuery库+原生JS
* flex布局+rem适配
* 图片边框 border-image
* ES6模板字符
* ECharts可视化库

# 3. ECharts简介

ECharts是一个使用JavaScript实现的开源可视化库，可以流畅的运行在PC端和移动端上，兼容当前绝大部分浏览器（IE8/9/10、Chrome、Firefox、Safari等），底层依赖于矢量图形库ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

* 开源免费，遵守Apache开源协议
* 涵盖各行业图表，满足各种需求
* 社区活跃度高

ECharts官网：https://echarts.apache.org/zh/index.html

# 4. ECharts的基本使用

### 4.1 ECharts使用五步曲

1. 下载并引入echarts.js文件 https://echarts.apache.org/zh/download.html

2. 准备一个具备大小的DOM容器，用于装图表

   ```html
   <div id="box" style="width:200px;height:200px"></div>
   ```

3. 初始化echarts实例对象

   ```javascript
   const myChart = echarts.init(document.getElementById("box"));
   ```

4. 指定配置项和数据（option）

   ```javascript
   const option = {
       title: {
           text: 'ECharts 入门示例'
       },
       tooltip: {},
       legend: {
           data:['销量']
       },
       xAxis: {
           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
       },
       yAxis: {},
       series: [{
           name: '销量',
           type: 'bar',
           data: [5, 20, 36, 10, 10, 20]
       }]
   };
   ```

5. 将配置项设置个echart实例对象

   ```javascript
   myChart.setOption(option);
   ```

### 4.2 选择不同的图表

官网->示例中可以看到各种图表，饼形图、柱形图、线形图等等，通过复制里面的`option`就可以修改不同的图表了。

### 4.3 相关配置讲解

* `title`：标题组件

* `tooltip`：提示框组件

* `legend`：图例组件

* `toolbox`：工具栏

* `grid`：直角坐标系内绘图网络

* `xAxis`：直角坐标系grid中的X轴

* `yAxis`：直角坐标系grid中的Y轴

* `series`：系列列表，每个系列通过type决定自己的图表类型（什么类型的图标）

  * `type`：类型（什么类型的图表）例如`bar`柱形图，`line`线形图

  * `name`：系列名称，用于`tooltip`的显示，`legend`的图例筛选变化

  * `stack`：数据堆叠。如果设置相同的值，则会造成`data`中的数据堆叠。

    * 例如：第2个值 = 第1个值 + 第2个值
    * 第3个值 = 第1个值 + 第2个值 + 第3个值
    * 以此类推......

    如果给`stack`不同的值或者去掉这个属性就不会发生数据堆叠

* `color`：调色盘颜色列表

先了解这9个配置的作用，其余配置还有具体细节我们直接查阅文档：文档菜单->配置项手册。学ECharts关键在于学会查阅文档，根据需求再修改配置。

option文档：https://echarts.apache.org/zh/option.html

[echarts的option简单讲解](resource/echartsOption.jpg)

具体还是需要查文档


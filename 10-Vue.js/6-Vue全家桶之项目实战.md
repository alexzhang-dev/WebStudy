# 目标

* 基于 Vue 初始化项目
* 基于 Vue 技术栈进行项目开发
* 基于 Vue 的第三方组件进行项目开发
* 前后端分离的开发模式

# 1. 项目概述

### 1.1 电商项目基本业务概述

根据不同的业务场景，电商系统一般提供了PC端、移动APP、移动Web、微信小程序等多种终端访问方式。多种终端访问同一份数据库。本实战项目将通过开发一套电商系统的PC后端管理项目来对于Vue实战有一个简略的了解。

<img src="./resource/17-vue实战1.png" align="left" />

### 1.2 电商后台管理系统的功能

电商后台管理系统用于管理用户账户、商品分类、商品信息、订单、数据统计等业务功能。

<img src="./resource/18-vue实战2.png" align="left" />

### 1.3 电商后台管理系统开发模式（前后端分离）

电商后台管理系统开发整体采用前后端分离的开发模式，其中前端项目采用基于 Vue 技术栈的 SPA 项目。

<img src="./resource/19-vue实战3.png" align="left" />

### 1.4 电商后台管理系统的技术选型

#### 1. 前端技术栈

* Vue
* Vue-Router
* Element-UI
* Axios
* Echarts

#### 2. 后端技术栈

* Node.js
* Express
* Jwt
* MySQL
* Sequelize

# 2. 项目初始化

### 2.1 前端项目初始化步骤

* 安装 Vue 脚手架
* 通过 Vue-CLI 初始化项目
* 配置 Vue 路由
* 配置 Element-UI 组件库
* 配置 axios 库
* 使用 Git 进行管理项目
* 将本地代码托管到 Github/Gitee

### 2.2 后台项目的环境配置

* 安装 MySQL 数据库
* 安装 Node.js 环境
* 配置项目相关信息
* 启动项目
* 测试接口是否正常工作

### 2.3 eslint格式化

#### 1. 不加分号与字符串单引号

如果使用的`prettier`插件，在项目根目录创建`.prettierrc`文件，里面写入

```json
{
  // 一次tab == 2个空格
  "tabWidth": 2,
  // 是否单引号
  "singleQuote": true,
  // 是否加;分号结尾
  "semi": false,
  // [] 和 {} 前后是否加空格
  "bracketSpacing": true
}
```

#### 2. 禁用函数名后面必须加空格

在项目根目录下`.eslintrc.js`中配置

```js
rules: {
    // 禁用函数名后面必须加空格
    'space-before-function-paren': 0
  }
```

在 VS Code 编辑器下的`settings.json`中添加

```json
"eslint.options": {
    "space-before-function-paren": 0
}
```

#### 3. Vue模块最后一行必须是空行

在 VS Code 编辑器中设置搜索`prettier`中的`End of Line`选择`crlf`

# 3. 登录/登出功能

### 3.1 登陆概述

#### 1. 登录业务流程

* 在登陆页面输入用户名和密码
* 调用后台接口进行验证
* 通过验证之后，根据后台的响应状态跳转到主页

#### 2. 登录业务的相关技术点

* http 是无状态的
* 通过 cookie 在客户端记录状态（如前端与服务器之间不存在跨域问题即可使用）
* 通过 session 在服务端记录状态（如前端与服务器之间不存在跨域问题即可使用）
* 通过 token 方式维持状态（如存在跨域问题推荐使用）

### 3.2 登录 - token 原理分析

<img src="./resource/20-vue实战4.png" align="left" />

### 3.3 登录功能实现

#### 1. 登录页面的布局

通过 Element-UI 组件实现布局

* el-form
* el-form-item
* el-input
* el-button
* 字体图标

<img src="./resource/21-vue实战5.png" align="left" />

#### 2. 创建 login 分支

`git checkout -b login`创建并切换至登录分支

`git branch`查看所有分支

#### 3. 具体功能

Element-UI表单项：https://element.eleme.cn/#/zh-CN/component/form

##### 1. 输入框加入icon：

Element-UI输入框：https://element.eleme.cn/#/zh-CN/component/input

Element-UI内置图标：https://element.eleme.cn/#/zh-CN/component/icon

```html
<!-- 1. 通过属性：prefix-icon 前添加，suffiex-icon后添加 -->
<el-input prefix-icon="el-input-icon"></el-input>
<!-- 2. 通过slot：slot="prefix"前添加 slot="suffix"后添加 -->
<el-input>
    <i slot="suffix" class="el-input-icon"></i>
</el-input>
```

##### 2. 表单验证：

在`data`中添加`rules`

```js
data () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在3-11位之间', trigger: 'blur' }
        ],
      }
    }
  },
```

在具体的表单项中添加`prop`

```html
<el-form-item prop="username">
    <el-input></el-input>
</el-form-item>
```

##### 3. 重置表单：

给Form添加一个`ref`，在重置按钮点击处理函数中使用

```js
// this：本组件
// $refs：组件的属性
// loginFormRef：自定义名称
// resetFields：Element-UI提供的重置表单验证和数据的函数
this.$refs.loginFormRef.resetFields()
```

##### 4. 表单预验证：

点击提交按钮，只有数据通过后才能发起Ajax请求

给Form添加一个`ref`，在提交按钮点击处理函数中使用

```js
// this：本组件
// $refs：组件的属性
// loginFormRef：自定义名称
// validate()：Element-UI提供的验证整体表单的函数
// 此函数接收一个回调函数，如果验证成功，那么回调函数的参数即为true，反之为false
this.$refs.loginFormRef.validate(valid => {
    console.log(valid)  // true/false
})
```

##### 5. axios的配置：

在`main.js`打包的入口文件中

```js
// 导入 axios
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:10007/api/private/v1/'

// 配置响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

// 挂载在原型上，那么每一个 Vue 的实例都可以使用$http也就是axios
Vue.prototype.$http = axios
```

就可以在`login.vue`登录组件使用到配置好的axios了，直接使用`this.$http`即可调用axios

##### 6. 配置弹框提示：

Element-UI弹框：https://element.eleme.cn/#/zh-CN/component/message

在`plugins/element.js`中注册组件

```js
import { Message } from 'element-ui'

// 需要将此组件挂载到全局
Vue.prototype.$message = Message
```

在组件中使用`this.$message()`即可，具体用法参考文档

```js
// 正确提示框
this.$message.success('正确信息')
// 错误提示
this.$message.error('错误信息')
```

##### 7. 登录成功后保存token：

项目除了登录之外的所有接口，都需要用到`token`验证，token应在当前网站打开时生效，所以保存在`sessionStorage`中，完成后通过编程时导航跳转到`/home`主页

```js
// 登录成功后将token保存在sessionStorage中
sessionStorage.setItem('token', res.data.token)
// 通过编程式导航跳转到主页
this.$router.push('/home')
```

##### 8. 路由守卫控制页面访问权限：

如果用户没有登录，直接通过URL访问主页链接，那么需要重新导航到登录页面。

在`router/index.js`配置路由守卫

```js
// 为路由对象添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
    // 如果用户访问的是登录页，直接放行
    if (to.path === '/login') return next()
    // 从 sessionStorage 获取token
    const token = sessionStorage.getItem('token')
    // 没有 token 强制跳转到登录页
    if (!token) return next('/login')
    next()
})
```

### 3.4 登出功能实现

#### 1. 实现原理

基于 token 的方式实现登出比较简单，只需要销毁本地的 token 即可。这样，后续的请求就不会携带 token，必须重新登录生成 token 后才能访问页面

```js
// 清空 token 
window.sessionStorage.clear()
// 配置退出提示框
this.$message.success('退出成功')
// 跳转到登录页
this.$router.push('/login')
```

#### 2. 弹框

点击注销之后点击确定才会真正执行注销，需要注册

```js
import { MessageBox } from 'element-ui'

// 全局挂在 confirm确认框
Vue.prototype.$confirm = MessageBox
```

在处理函数中

```js
this.$confirm('确定注销?注销后将重新登录', '提示框', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
})
    .then(() => {
        // 点击确定的处理逻辑
    })
    .catch(action => {
		// 点击取消和关闭的操作
    })
```

# 4. 主页布局

### 4.1 整体布局

#### 1. 创建结构

Element-UI提供的布局：https://element.eleme.cn/#/zh-CN/component/container

在`component/home.vue`中

```html
<el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">Aside</el-aside>
    <!-- 右侧主体 -->
    <el-container>
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- 主体 -->
        <el-main>Main</el-main>
    </el-container>
</el-container>
```

#### 2. 注册插件

创建完结构后需要将结构需要的部分注册到 Vue 中，在`plugins/element.js`中

```js
import { Container, Aside, Header, Main } from 'element-ui'

// 首页布局需要
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
```

### 4.2 头部区域

#### 1. 整体布局

使用`flex`布局，`justify-content: flex-end`让元素居右，`align-item: center`让元素垂直居中

#### 2. 头像模块

因为鼠标移动到头像模块有一个下拉效果，所以需要到

Element-UI下拉菜单：https://element.eleme.cn/#/zh-CN/component/dropdown

此为具体代码

```html
<el-dropdown>
    <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>每一项</el-dropdown-item>
        <el-dropdown-item disabled>不可用</el-dropdown-item>
        <el-dropdown-item divided>独立</el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>
```

并到`plugins/element.js`注册相关组件

`Dropdown`、`DropdownItem`、`DropdownMenu`

头像：`size`可以控制大小

https://element.eleme.cn/#/zh-CN/component/avatar

注册`Avatar`组件

#### 3. 处理每一个下拉菜单的点击

在`el-dropdown`下拉菜单的根元素中挂载` @command="handleDropdownItem"`command触发器，在每一个菜单子项加入`command="???"`，这里的???可以填随意值，这里填的值会被传递到父组件的`handleDropdownItem`的参数中

````js
handleDropdownItem: function(command) {
    if (command === 'logout') {
        this.logout()
    }
}
````

#### 4. 面包屑导航

https://element.eleme.cn/#/zh-CN/component/breadcrumb

注册`Breadcrumb`和`BreadcrumbItem`

#### 5. 面包屑导航数据

我们可以在每个组件中向头部组件传递值，这里提供一种笨思路

采用事件管理中心的方法来做，在`main.js`入口函数中挂载事件管理中心

```js
// 挂载事件管理中心
Vue.prototype.eventHub = new Vue()
```

在面包屑所在组件中，`created`钩子函数中定义一个事件

```js
this.eventHub.$on('getBreadCrumb', val => {
    this.breadCrumbList = val
})
```

在每一个单独页面组件中，`created`钩子函数中触发事件并传递值

```js
this.eventHub.$emit('getBreadCrumb', ['用户管理', '用户列表'])
```

传递的值将会挂载到面包屑所在组件`breadCrumbList`，页面将循环输出

```html
 <el-breadcrumb-item v-for="item in breadCrumbList" :key="item">
     {{item}}
</el-breadcrumb-item>
```

### 4.3 左侧菜单

#### 1. 整体布局

菜单分为二级，并且可以折叠

Element-UI导航菜单：https://element.eleme.cn/#/zh-CN/component/menu

```html
<!-- 在 el-menu 中可以指定颜色 -->
<el-menu
     background-color="#001529"
     text-color="#ccc"
     active-text-color="#fff"
    >
    <!-- el-submenu可以嵌套二级菜单 -->
    <el-submenu>
        <template slot="title">选项4</template>
        <el-menu-item>选项1</el-menu-item>
    </el-submenu>
    <!-- el-menu-item 为顶级菜单 -->
    <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
    </el-menu-item>
    <!-- disabled 为不可用 -->
    <el-menu-item disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
    </el-menu-item>
</el-menu>
```

在`plugins/element.js`中注册组件

```js
// import并使用这三个组件
// 菜单
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
```

#### 2. 通过接口获取菜单的数据

通过 axios 请求拦截器添加token，保证我们有获取数据的权限

在`main.js`入口文件中添加配置项

```js
axios.interceptors.request.use(
  config => {
    // 为请求头添加 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }
)
```

获取接口数据

```js
created() {
    // 挂在在生命周期钩子函数中，表明此组件一旦加载就开始触发函数
    // 获取请求数据
    this.getMenuList()
},
methods: {
    getMenuList: async function() {
      const res = await this.$http.get('menus')
      if (res.meta.status === 200) {
        this.menuList = res.data
      }
    }
}
```

#### 3. 渲染菜单视图

因为都有二级菜单，所以可以直接使用双层for循环来渲染

```html
<el-submenu
     :index="item.id + ''"
     :key="item.id"
     v-for="item in menuList"
    >
    <template slot="title">{{ item.authName }}</template>
    <el-menu-item
        :index="subItem.id + ''"
        :key="subItem.id"
        v-for="subItem in item.children"
    >{{ subItem.authName }}</el-menu-item>
</el-submenu>
```

#### 4. 侧边栏的折叠与展开

`el-menu`中的属性`collapse`可以控制是否折叠，通过一个按钮控制这个值是`true/false`即可控制侧边栏的折叠与展开

### 4.4 子路由

主页的右侧主体部分其实是多个子组件所组成的，因此我们需要定义一个子组件

假设我们定义了一个子组件`HomeWelcome`

```vue
<template>
  <h3>Welcome, {{ username }}</h3>
</template>
<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = sessionStorage.getItem('username')
  }
}
</script>
```

我们需要在`Home.vue`中定义路由占位

```html
<!-- 主体 -->
<el-main>
    <!-- 加入路由占位 -->
    <router-view></router-view>
</el-main>
```

在`router/index.js`中为`home`注册子路由规则

```js
{
    path: '/home',
    component: Home,
    redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                component: HomeWelcome
            }
        ]
}
```

### 4.4 改造左侧菜单的路由链接

https://element.eleme.cn/#/zh-CN/component/menu

Element-UI的导航组件中提供了一个属性`router`

* 默认为false

* 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
* 开启后，每一个菜单项的`index`的属性值，将作为路由的`path`

# 5. 用户管理

### 5.1 作为主页的子路由

创建一个`User.vue`子组件，在`router/index.js`中将user注册为`home`的子路由

```js
{
    path: '/home',
    component: Home,
    redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                component: HomeWelcome
            },
            {
                path: '/user',
                component: User
            },
        ]
}
```

### 5.2 保存左侧菜单的激活状态

在`Element-UI`的menus中有一项属性`default-active`，用于判断当前激活的菜单，值为当前菜单的`index`属性的值

思路大概是：

* 点击左侧菜单，将index的值储存在sessionStorage中
* home组件一旦发生更改，就去取sessionStorage中的index，来改变菜单的激活状态

#### 首页默认取消所有菜单的激活状态

我们还是用老方法，使用事件管理中心，首先在`Home.vue`中`created`钩子函数设定

```js
this.eventHub.$on('toHomeClearActivePath', () => {
    window.sessionStorage.removeItem('activeNavPath')
    this.defaultOpeneds = []
    this.activeNavPath = ''
})
```

其中`defaultOpeneds`用于控制菜单的收起，`activeNavPath`用于控制当前高亮的菜单项

我们要在`welcome`中设定，触发我们刚刚设定的事件

```js
// 在首页清空导航的activePath
this.eventHub.$emit('toHomeClearActivePath')
```

需要在`el-menu`中设定一个属性，这个属性就是用来控制展开与关闭的

```css
:default-openeds="defaultOpeneds"
```

### 5.3 内容区域的卡片视图

https://element.eleme.cn/#/zh-CN/component/card

在`components/user/Users.vue`中，设定

```html
<el-card>
    <div slot="header" class="clearfix">
        <span>卡片名称</span>
    </div>
</el-card>
```

在`plugins/element.js`中注册`Card`

#### 1. 卡片头部的搜索和新增

##### 搜索

https://element.eleme.cn/#/zh-CN/component/input

搜索我们选择使用 Element-UI 中输入框 -> 复合型输入框 -> 带搜索的输入框

```html
<!-- 将多余部分去掉 -->
<el-input placeholder="请输入用户名用于搜索">
    <el-button slot="append" icon="el-icon-search"></el-button>
</el-input>
```

由于我们在开发登录时已经注册了input，此时就不需要再注册了

下一步我们就需要将搜索框的长度限制，此时可以使用Element-UI的栅格系统来控制，栅格规定每一行有24个区块

https://element.eleme.cn/#/zh-CN/component/layout

```html
 <el-row :gutter="20">
     <el-col :span="6">
         <el-input placeholder="请输入用户名用于搜索">
             <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
     </el-col>
</el-row>
```

其中`el-row`中的`:gutter`表示每个`cl-col`之间的间距，每一个`el-col`中的`:span`就表示自己占多个个区块，在`plugins/element.js`中注册`Row`和`Col`

##### 新增

添加按钮重新写一个`el-col`

```html
<el-col :span="2">
    <el-button type="primary">添加用户</el-button>
</el-col>
```

#### 2. 获取用户列表数据

在`created`钩子函数中调用方法`this.getUserList()`

在`methods`中定义方法

```js
async getUserList() {
    const res = await this.$http.get('users', {
        params: this.queryInfo
    })
    // 进行判断，如果res!=200，那么就弹出error提示框
    if (res.meta.status !== 200) {
        this.$message.error('获取用户列表失败')
    }
    console.log(res.data)
    // 成功就将值储存
    this.userlist = res.data.userlist
    this.total = res.data.total
}
```

#### 3. 渲染用户数据

https://element.eleme.cn/#/zh-CN/component/table

使用 Element-UI 表格来渲染数据

```html
<el-table :data="userlist" stripe style="width: 100%" border>
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
</el-table>
```

其中`:data`是表格用到的数据，`stripe`是隔行变色，默认为false，`border`为添加边框线

`prop`是每一列用到的数据名，`label`是每一列的表头


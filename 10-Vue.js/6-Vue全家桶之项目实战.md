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

点击注销之后点击确定才会真正执行注销，需要注册`MessageBox`

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

#### 4. 处理 dropdown 的箭头

因为 element-ui 默认的下拉菜单的箭头是不会变化的，因此我们需要监听下拉菜单子项展开/关闭的状态，来修改箭头的图标

在`el-dropdown`中监听事件，该事件会向回调传入一个参数，status表示为子项是否展开/关闭

```html
<el-dropdown @visible-change="handleDropdownChange">
```

我们在`methods`中定义一个处理该事件的回调，通过官方提供的回调参数，用于更改图标

```js
handleDropdownChange(status) {
    // 展开或收起
    if (status) {
        this.headerAvatarArrow = 'el-icon-arrow-up'
    } else {
        this.headerAvatarArrow = 'el-icon-arrow-down'
    }
}
```

#### 5. 面包屑导航

https://element.eleme.cn/#/zh-CN/component/breadcrumb

注册`Breadcrumb`和`BreadcrumbItem`

#### 6. 面包屑导航数据

我们可以在每个组件中向头部组件传递值，这里提供一种笨思路

采用事件管理中心的方法来做，在`App.vue`根组件中`provide`事件管理中心

```js
import Vue from 'vue'
export default {
  // 向所有子组件提供事件管理中心
  provide() {
    return {
      eventHub: new Vue()
    }
  }
}
```

在需要传递数据的所在组件中，使用`inject`注入事件管理中心

```js
// 注入事件管理中心
inject: ['eventHub'],
```

在需要传递数据的地方定义方法，例如`Home.vue`的`created`钩子函数中定义一个事件

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

#### 4. 为表格添加索引列

在所有的列前加上，`type="index"`表示为索引项

```html
<el-table-column type="index" />
```

#### 5. 为状态列添加开关效果

在状态列中放置作用域插槽，`slot-scope`就可以获取到每一列的数据了

```html
<el-table-column label="状态">
    <template slot-scope="scope">
        {{ scope.row }}
    </template>
</el-table-column>
```

在插槽中添加按钮，数据来源于后台返的数据

```html
<template slot-scope="scope">
    <el-switch v-model="scope.row.mg_state"></el-switch>
</template>
```

在`plugins/element.js`注册`Switch`

#### 6. 在操作列添加操作按钮

这里我们可以选择为文字按钮，我个人认为美观一些

```html
<el-table-column label="操作">
    <template slot-scope="scope">
        <el-button 
           type="text" 
           @click="editUser(scope.row.id)" 
           size="small"
           >编辑</el-button>
        <el-button
           type="text"
           @click="deleteUser(scope.row.id)"
           size="small"
           >删除</el-button>
    </template>
</el-table-column>
```

#### 7. 实现分页效果

Element-UI已经提供了分页组件：https://element.eleme.cn/#/zh-CN/component/pagination

我们直接选择完整功能

```html
<el-pagination
     :page-sizes="[5, 8, 10, 50]"
     :page-size="5"
     :current-page="queryInfo.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
>
</el-pagination>
```

* `page-sizes`表示为可以选择**xx条/页**的列表
* `page-size`表示当前的**xx条/页**
* `current-page`表示当前处于的页码值
* `layout`表示功能
* `total`表示显示的总条数
* `background`表示分页带有背景色
* `size-change`监听**xx条/页**改变即可触发，该事件会向回调传一个参数，参数就是当前每一页显示的条数
* `current-change`监听当前页码值，该事件会向回调传入一个参数，参数就是页码值

#### 8. 修改用户状态

将用户状态的更改同步更新到数据库上，我们需要对mg_state此值进行监听

switch组件上提供了一个方法`change`，该方法用于switch的值改变时触发

```html
<el-switch
   v-model="scope.row.mg_state"
   change="handleStateChange(scope.row)"
></el-switch>
```

把该行的数据传递过去，用于修改数据库的状态

```js
async handleStateChange(userInfo) {
    // 发起请求，修改用户状态
    const res = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
    )
    // 判断并回应结果
    if (res.meta.status !== 200) {
        // 失败就打印失败信息，并且当前已经在页面修改的的状态取反
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error(`修改 ${userInfo.username} 的状态失败`)
    }
    this.$message.success(`修改 ${userInfo.username} 的状态成功`)
}
```

#### 9. 实现搜索功能

首先，我们将搜索文本框与查询数据中的查询参数双向绑定，在搜索按钮中绑定事件

```html
<el-input
    placeholder="请输入用户名用于搜索"
    v-model="queryInfo.query"
    clearable
    @clear="getUserList"
    >
    <el-button
        lot="append"
        icon="el-icon-search"
        @click="search"
        ></el-button>
</el-input>
```

在下面的处理函数中，先把页码恢复为1，之后再调用`this.getUserList()`就可以了

新需求：在搜索框中提供一个清空按钮，点击清空就可以重新获取所有内容

* `clearable`：提供一个清空按钮
* `@click`监听清空函数，调用getUserList()方法获取到所有的数据

### 5.4 用户添加功能

#### 1. 点击添加按钮弹出对话框

https://element.eleme.cn/#/zh-CN/component/dialog

我们选择嵌套表格的Diaglog

```html
<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="35%">
    <el-form>
        <el-form-item label="用户名">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
    </div>
</el-dialog>
```

* `title`：Dialog头部区域的内容
* `:visible`：为Dialog绑定了显示和隐藏的值，true为显示
* `width`：控制整个对话框的宽度
* 所以我们给取消按钮添加`@click="addDialogVisible = flase"`表示为隐藏

因此，我们需要给添加按钮加上`@click="addDialogVisible = true"`，让添加界面显示

#### 2. 渲染添加用户的表单

```html
<el-form
   label-width="80px"
   :model="addForm"
   :rules="addFormRules"
   ref="addFormRef"
   >
    <el-form-item label="用户名" required prop="username">
        <el-input autocomplete="off" v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" required prop="password">
        <el-input autocomplete="off" v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" required prop="email">
        <el-input autocomplete="off" v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机" required prop="mobile">
        <el-input autocomplete="off" v-model="addForm.mobile"></el-input>
    </el-form-item>
</el-form>
```

* `:model`表单绑定的对象
* `:rules`表单的校验规则
* `prop`每一项对应的校验规则

因此，我们需要创建一个`addForm`和`addFormRules`校验规则

```js
// 添加用户的表单数据
addForm: {
    username: '',
    password: '',
    email: '',
    mobile: '',
    // rid用于角色
    rid
},
// 添加用户表单的验证规则对象
addFormRules: {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        },
        {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        }
    ],
    mobile: [
        {
            required: true,
            message: '请输入手机',
            trigger: 'blur'
        }
    ]
}
```

邮箱和手机号的校验规则还是比较简单的，所以我们需要自定义校验规则

```js
data() {
    // 验证邮箱的校验规则
    const regEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
      if (!regEmail.test(value)) {
        // 验证失败使用callback(new Error('error info'))
        return callback(new Error('请输入正确格式的邮箱'))
      }
      // 成功直接调 callback() 就OK
      callback()
    }
    // 验证手机号的校验规则
    const regMobile = (rule, value, callback) => {
      const regEmail = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!regEmail.test(value)) {
        return callback(new Error('请输入正确格式的手机号'))
      }
      callback()
    }
    return {
        // 添加用户表单的验证规则对象
        addFormRules: {
            // other code ...
            email: [
                {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                },
                {
                    // validator：使用自定义的验证规则对象
                    validator: regEmail,
                    trigger: 'blur'
                }
            ],
            mobile: [
                {
                    required: true,
                    message: '请输入手机',
                    trigger: 'blur'
                },
                {
                    validator: regMobile,
                    trigger: 'blur'
                }
            ]
        }
    }
}
```

#### 3. 选择用户组

我们选择在加载这个页面的时候，从远程访问获取到所有的角色

```js
methods: {
    // 获取所有的角色[给添加时用]
    async getAllRoles() {
      // 先清空所有
      this.roles = []
      // 获取所有的roles，并遍历挂载
      const res = await this.$http('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户组失败')
      }
      // 默认选择普通用户
      const normalRoleObj = {
        id: -1,
        roleName: '普通用户'
      }
      this.roles.push(normalRoleObj)
      res.data.forEach(role => {
        const roleObj = {}
        roleObj.id = role.id
        roleObj.roleName = role.roleName
        this.roles.push(roleObj)
      })
    }
}
created() {
    // other code ...
    this.getAllRoles()
}
```

将这个数据渲染到添加页面上

```html
<el-form-item label="角色组" required>
    <el-select v-model="addForm.rid">
        <el-option
            :label="role.roleName"
            :value="role.id"
            v-for="role in roles"
            :key="role.id"
            ></el-option>
    </el-select>
</el-form-item>
```

记得注册`Select`和`Option`

#### 4. 添加表单的重置操作

我们在对话框Dialog关闭后重置表单就可以了

在`el-dialog`中有一个事件`close`，监听此事件，触发函数

```html
<el-dialog @close="addFormDialogClosed"></el-dialog>
```

```js
// 关闭添加页面重置表单
addFormDialogClosed() {
    this.$refs.addFormRef.resetFields()
}
```

#### 5. 添加用户前的表单预验证

在添加页面的确定按钮上，绑定一个点击事件

```html
<el-button type="primary" @click="addUser">确 定</el-button>
```

处理函数如下：

```js
// 添加用户
async addUser() {
    let flag = false
    // 表单预验证
    this.$refs.addFormRef.validate(valid => {
        if (!valid) {
            return null
        }
        flag = true
    })
    if (flag) {
        // 校验成功，将数据提交后台接口
        const res = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
            return this.$message.error(`添加用户失败：${res.meta.msg}`)
        }
        this.$message.success('添加用户成功')
        this.addDialogVisible = false
        // 添加完成重新获取用户列表
        this.getUserList()
    }
},
```

### 5.5 用户修改功能

#### 1. 修改界面布局

很简单，我们依然使用 Dialog 来作为弹出层，`disabled`给`el-input`可以让这个输入框禁用，通过对`editDialogVisible`的控制来达到对修改界面的显示和隐藏

```html
<el-dialog
     title="修改用户信息"
     :visible.sync="editDialogVisible"
     width="35%"
     @close="editFormDialogClosed"
     >
    <el-form
       label-width="80px"
       :model="editUser"
       :rules="addFormRules"
        ref="editFormRef"
        >
        <el-form-item label="用户名">
            <el-input
               disabled
               v-model="editUser.username"
               autocomplete="off"
               ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required prop="email">
            <el-input autocomplete="off" v-model="editUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required prop="mobile">
            <el-input autocomplete="off" v-model="editUser.mobile"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
    </div>
</el-dialog>
```

#### 2. 修改界面的数据

我们在修改按钮的点击事件中，不仅要对`editDialogVisible`进行修改，还需要通过ID来获取相应信息同时挂载在页面中

```js
async showEditDialog(id) {
    this.editDialogVisible = true
    // 通过 ID 获取信息
    const res = await this.$http.get(`users/${id}`)
    // 对响应状态做一个简单的判断
    if (res.meta.status !== 200) {
        return this.$message.error(`获取用户信息失败：${res.meta.msg}`)
    }
    this.editUser = res.data
},
```

#### 3. 关闭修改界面重置表单验证结果

在Dialog中监听`@close`

```js
// 关闭修改界面重置表单验证结果
editDialogClosed() {
    this.$refs.editFormRef.resetFields()
},
```

#### 4. 修改用户信息

```js
// 修改用户信息
async editUserMethod() {
    let flag = false
    // 先进行表单预验证
    this.$refs.editFormRef.validate(valid => {
        if (valid) {
            flag = true
        }
    })
    if (flag) {
        // 表单已经预验证完成，需要向后端发送数据了
        const res = await this.$http.put(
            `users/${this.editUser.id}`,
            this.editUser
        )
        if (res.meta.status !== 200) {
            return this.$message.error(`用户信息更新失败：${res.meta.msg}`)
        }
        // 更新成功，关闭页面，再次调用getUserList更新页面数据
        this.$message.success('用户信息更新成功')
        this.editDialogVisible = false
        this.getUserList()
    }
}
```

### 5.6 用户修改功能

#### 1. 点击删除弹出警示框

和注销一样，这里采用确认框

```js
deleteUser(id) {
    this.$confirm('确定删除该用户？该操作无法撤销', '提示框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(async () => {
        // 确定之后调用后台接口删除用户
        const res = await this.$http.delete(`users/${id}`)
        if (res.meta.status !== 200) {
            return this.$message.error(`删除用户失败：${res.meta.msg}`)
        }
        this.$message.success('删除用户成功')
        // 删除用户成功之后，跳转到第一页，防止出现问题
        this.queryInfo.pagenum = 1
        this.getUserList()
    })
        .catch(action => {
        // 点击取消和关闭的操作
    })
},
```

# 6. 权限管理

### 6.1 通过路由展示权限组件

创建一个`Rights.vue`，在`router/index.js`将其注册为`Home`的子路由

```js
{
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/rights',
        component: Rights
      }
    ]
  }
```

### 6.2 发送面包屑

在`created`钩子函数中，触发父组件所定义的事件管理中心的方法

```js
export default {
  // 注入事件管理中心
  inject: ['eventHub'],
  created() {
    // 向面包屑导航发送数据
    this.eventHub.$emit('getBreadCrumb', ['权限管理', '权限列表'])
  }
}
```

### 6.3 布局权限列表视图

我们使用表格来做

#### 1. 获取数据

在`created`钩子函数中获取数据

```js
async created() {
    // other code ...
    // 请求后端接口获取数据挂载页面
    const res = await this.$http.get('rights/list')
    if (res.meta.status !== 200) {
      return this.$message.error(`获取权限列表失败：${res.meta.msg}`)
    }
    this.rightsList = res.data
  }
```

#### 2. 完善页面视图

```html
<el-table :data="rightsList" style="width: 100%" border stripe>
    <el-table-column label="#" type="index" width="100"></el-table-column>
    <el-table-column
        prop="id"
        label="权限ID"
        sortable
        width="100"
        ></el-table-column>
    <el-table-column prop="authName" label="权限名称" sortable>
    </el-table-column>
    <el-table-column prop="path" label="路径" sortable> </el-table-column>
    <el-table-column prop="level" label="权限等级" sortable> </el-table-column>
</el-table>
```

#### 3. 增加索引列

```html
<el-table-column label="#" type="index" width="100"></el-table-column>
```

#### 4. 为每一列增加排序功能

在每一列增加`sortable`属性即可实现排序，但是`type="index"`的索引列无法实现这种功能

#### 5. 美化权限的等级

由于获取的原始数据权限等级`0`、`1`不太美观，我们可以将其美化为`权限一`、`权限二`等

使用Element-UI的组件tag：https://element.eleme.cn/#/zh-CN/component/tag

记得注册`Tag`

```html
<el-table-column prop="level" label="权限等级" sortable>
    <template slot-scope="scope">
        <el-tag v-if="scope.row.level == 0">一级权限</el-tag>
        <el-tag v-else-if="scope.row.level == 1" type="success">
            二级权限
        </el-tag>
        <el-tag v-else type="warning">三级权限</el-tag>
    </template>
</el-table-column>
```

### 6.4 权限管理业务分析

通过权限管理模块控制不同的角色可以进行哪些操作，具体可以通过角色的方式进行控制，即每个用户分配一个特定的角色，角色包括不同的功能权限

* 一个用户对应一个角色

* 一个角色对应不同的多个权限

  * 有的角色有增删改查的权限
  * 有的角色只有查的权限
  * 有的角色只有增的权限

  * ......

  


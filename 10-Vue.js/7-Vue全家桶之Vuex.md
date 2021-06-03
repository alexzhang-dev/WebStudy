# 目标

* 能够说出 Vuex 的基本使用步骤
* 能够说出 Vuex 的核心概念
* 能够基于 Vuex 实现业务功能

# 1. Vuex 概述

### 1.1 组件之间共享数据的方式

* 父向子传值：`v-bind`属性绑定
* 子向父传值：`v-on`事件绑定
* 兄弟组件之间共享数据`EventBus`
  * `$on`接收数据的组件
  * `$emit`发送数据的组件

### 1.2 Vuex 是什么

Vuex 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的数据共享

### 1.3 使用 Vuex 统一管理状态的好处

* 能够在 vuex 中集中管理共享的数据，易于开发与维护
* 能够高效的实现组件间的数据共享，提高开发效率
* 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

### 1.4 什么样的数据适合存储到 Vuex 中

一般情况下，只有组件之间共享的数据，才有必要存储在 Vuex 中。对于组件私有的数据，依旧存储在自身的 data 中即可。

# 2. vuex 的基本使用

### 2.1 使用步骤

#### 1. 安装 vuex 依赖包

```bash
npm install vuex --save
```

#### 2. 导入 vuex 包

```js
import Vuex from 'vuex'
Vue.use(Vuex)
```

#### 3. 创建 store 对象

```js
const store = new Vuex.Store({
    // state 中存放的是全局共享的数据
    state: {
        // 该数据可以全局共享
        count: 0
    }
})
```

#### 4. 将 store 对象挂载在 vue 实例中

```js
new Vue({
    el: '#app',
    render: h => h(app),
    router,
    // 将 store 挂载在 vue 实例中
    store
})
```

### 3. Vuex 的核心概念

### 3.1 核心概念概述

Vuex 中的主要核心概念如下：

* State
* Mutation
* Action
* Getter

### 3.2 State

State提供唯一的公共数据源，所有共享的数据都要统一放到 State 里面

```js
// 创建 store 数据源，提供唯一公共数据 State
const store = new Vuex.Store({
    state: {
        count: 0
    }
})
```

组件访问 State 中数据的第一种方式：

```js
this.$store.state.全局数据名称
```

组件访问 State 中数据的第二种方式：

```js
// 1. 从 vuex 中按需导入 mapState 函数
import { mapState } from 'vuex'
// 2. 通过刚才导入的 mapState 函数，将当前组件需要的全局数据
//    映射到当前组件的 computed 计算属性
// 组件中
computed: {
    ...mapState(['count'])
}
```

第二种方式可以做到响应式更新，所以推荐使用第二种方式

### 3.3 Mutation

Mutation 用于变更 Store 中的数据

* 只能通过 Mutation 来修改 Store 中的数据，不可以直接操作 Store 中的数据
* 通过这种方式虽然操作比较繁琐，但是这种方式可以集中监控所有数据的变化

```js
// 定义 Mutation
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            // 变更状态
            state.count++
        }
    }
})
```

```js
// 触发 Mutation
methods: {
    handle() {
        // 触发 mutation 的第一种方式
        this.$store.commit('add')
    }
}
```

#### 1. 在触发 Mutation 时传递参数

```js
// 定义 Mutation
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        addN(state, num) {
            // 变更状态
            state.count += num
        }
    }
})
```

```js
// 触发 Mutation
methods: {
    handle() {
        // 触发 mutation 的时候携带参数
        this.$store.commit('addN', 3)
    }
}
```

#### 2. 触发 Mutation 的第 2 种方式

`this.$store.commit()`这是第一种方式，下面时第二种方式

```js
// 1. 从 vuex 中按需导入 mapMutaions 函数
import { mapMutaions } from 'vuex'
// 2. 通过 mapMutaions 映射到当前组件的 methods 方法
methods: {
    ...mapMutaions(['add', 'addN'])
}
```


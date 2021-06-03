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

# 3. Vuex 的核心概念

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
* **注意**：Mutation中不能写任何异步的代码！

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

#### 1. 触发 Mutation 的第 1 种方式

```js
// 触发 Mutation
methods: {
    handle() {
        // 触发 mutation 的第一种方式
        this.$store.commit('add')
    }
}
```

#### 2. 在触发 Mutation 时传递参数

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

#### 3. 触发 Mutation 的第 2 种方式

`this.$store.commit()`这是第一种方式，下面是第二种方式，使用`mapMutations`

```js
// 1. 从 vuex 中按需导入 mapMutaions 函数
import { mapMutations } from 'vuex'
// 2. 通过 mapMutaions 映射到当前组件的 methods 方法
methods: {
    ...mapMutaions(['add', 'addN'])
}
```

### 3.3 Action

Action用于处理异步任务。

如果想要执行异步操作，那么必须要通过 Action，而不是直接在 Mutation 中放置任何异步操作的代码。但是再 Action 中执行其实还是使用 Mutation 的方式来变更数据的

```js
// 定义 Action
const store = new Vuex.Store({
    //...省略其他代码
    mutations: {
        add(state) {
            state.count++
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 1000)
        }
    }
})
```

#### 2. 触发 Action 的第 1 种方式

```js
// 触发 Action
methods: {
    handle() {
        // 触发 Action 的第一种方式
        this.$store.dispatch('addAsync')
    }
}
```

#### 3. 触发 Actions 携带参数

```js
// 定义带参数的 Action
const store = new Vuex.Store({
    //...省略其他代码
    mutations: {
        add(state, num) {
            state.count += num
        }
    },
    actions: {
        addNAsync(context, num) {
            setTimeout(() => {
                context.commit('addN', num)
            }, 1000)
        }
    }
})
```

```js
// 触发带参数的 Action
methods: {
    handle() {
        // 触发 Action 的第一种方式
        this.$store.dispatch('addNAsync', 4)
    }
}
```

#### 2. 触发 Action 的第 2 种方式

`this.$store.dispatch()`是第一种方式，下面是第二种方式：

```js
// 1. 导入 mapActions
import { mapActions } from 'vuex'
// 2. 使用 mapActions 映射为当前组件的方法
methods: {
    ...mapActions(['addAsync', 'addNAsync'])
}
```

### 3.4 Getter

Getter 用于对 store 中的数据进行加工处理并返回新的数据

* Getter 可以对 store 中已有的数据进行加工处理，类似于 Vue 中的`computed`计算属性
* Store 中的数据发生变化，Getter 中的数据也会同步发生变化
  * Getter 不会修改 Store 中的数据，只是包装处理

```js
// 定义 Getter
const store = new Vuex.Store({
    state: {
        count: 0
    },
    // ... 省略其他代码
    getter: {
        showNum: state => {
            return `当前最新的值是【${state.count}】`
        }
    }
})
```

#### 1. 触发 Getter 的第 1 种方式

```js
this.$store.getters.showNum
```

#### 2. 触发 Getter 的第 2 种方式

```js
// 导入 mapGetters
import { mapGetters } from 'vuex'
// 通过 mapGetter 来获取数据
computed: {
    ...mapGetters['showNum']
}
```

### 3.5 Module

> 由于使用了单一状态树，应用的所有状态会被集中在一个较大的对象上，当应用变得复杂时， store 对象就有可能变得相当臃肿

此时，可以将多个状态拆开，分为不同的模块

https://vuex.vuejs.org/zh/guide/modules.html

#### 1. 模块化的简单应用

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a   // -> moduleA 的状态
store.state.b   // -> moduleB 的状态
```

#### 1. 模块化的命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。多个模块下的`mutations`和`actions`中的函数在全局就可调用，这种就**可能出现冲突**，因此我们需要用到`namespace`命名空间

* 给每个模块添加属性`namespaced: true`
* 加上之后，想要调用某个模块必须使用前缀

```js
// store 中
const user = {
    // 添加命名空间属性
    namespaced: true,
    mutations: {
        showName() {
            console.log('name is alex')
        }
    }
}
export default new Vuex.Store({
    // 给 user 模块添加命名为 a
    a: user
})
```

#### 2. 调用带命名空间的模块

##### 1. 直接调用，带上模块的属性名路径

```js
this.$store.commit('a/showName')
```

##### 2. 辅助函数，带上模块的属性名路径

```vue
<template>
	<button @click="test"></button>
</template>
<script>
	methods: {
        ...mapMutations(['a/showName']),
        test(){
        	this['a/showName']()    
        }
    }
</script>
```

##### 3. `createNamespacedHelpers`创建基于某个命名空间辅助函数

```vue
<template>
    <!-- 这里可以直接触发 mutations 的函数了 -->
	<button @click="showName"></button>
</template>
<script>
	import { createNamespacedHelpers } from 'vuex'
    // 这里的 mapMutaions 只有 a 也就是 user 模块中的 mutations 里的函数
	const { mapMutations } = createNamespacedHelpers('a')
</script>
```

# 4. 基于 Vuex 的 TODOs 的案例

### 4.1 初始化项目

* 通过`vue ui`命令创建新项目
* 安装`ant-design-vue`
* 布局页面

### 4.2 动态加载列表

#### 1. 请求数据

```js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    data: [],
  },
  mutations: {
    initData(state, data) {
      state.data = data
    },
  },
  actions: {
    getTodoData(context) {
      // 1. 由于请求数据是异步操作，所以需要放在 actions 中
      axios.get('/data.json').then(data => {
        // 2. 由于 action 无法直接对 state 进行操作
        // 所以还是需要定义一个 mutation
        context.commit('initData', data.data)
      })
    },
  },
})

```

#### 2. 挂载数据

将`state`中的`data`映射为组件的一个计算属性 

```js
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['data']),
    },
}
```

### 4.3 文本框与 store 的双向同步

#### 1. 文本框同步 state

* 在`state`中定义一个`inputValue`
* 在组件中使用`mapState`引入`inputValue`
* 在文本框上`:value="inputValue"`

#### 2. 文本框改变 state

* 文本框监听`@change`事件，该事件处理函数会传入一个参数事件对象，通过`event.target.value`获取到最新的值
* 在`vuex`中的`mutations`中定义一个函数，用户更改`state`的`inputValue`
* 在`@change`的回调中触发这个`mutations`，并将新值传过去

```js
methods: {
    inputChange(event) {
        this.$store.commit('inputChange', event.target.value)
    }
}
```

### 4.4 添加事项

* 监听添加按钮的`@click`
* 在`mutations`中定义一个函数，用于将`state`中的`inputValue`push到`data`中

```js
// store 中
mutations: {
    addTodo(state) {
        const obj = {
            id: state.nextId,
            info: state.inputValue,
            done: false
        }
        state.data.unshift(obj)
        // 让 id 加 1
        state.nextId++
        // 添加完成，让 inputValue 为空
        state.newValue = ''
    }
}
```

```js
// 组件中：监听添加按钮的 @click 函数
addTodo() {
    if (this.inputValue.trim().length <= 0) {
        // 使用 antd 的提示框提示一下用户错误信息
        return this.$message.warning('文本框内容不可为空')
    }
    // 向列表中新增 item 项
    this.$store.commit('addTodo')
}
```

### 4.5 删除事项

* 监听删除按钮的`@click`将 id 传过去
* 在`mutations`中定义一个函数，查找 id 并删除

```js
// store 中
mutations: {
    removeTodo(state, id) {
      const index = state.data.findIndex(item => {
        return item.id === id
      })
      state.data.splice(index, 1)
    }
}
// 组件中
removeTodo(id) {
    this.$store.commit('removeTodo', id)
    this.$message.success('删除成功')
}
```

### 4.6  动态绑定复选框的状态

* 在 checkbox 上挂载属性`:checked="item.done"`将这个与 state 中的数据同步
* 在 checkbox 上监听`@change`事件，并触发`mutations`中的函数
* 在`mutations`中定义一个函数，用于通过 id 找到数据并将 done 转为 true/false

```js
// store 中
mutations: {
    changeTodoStatus(state, id) {
      const index = state.data.findIndex(item => {
        return item.id === id
      })
      state.data[index].done = !state.data[index].done
    }
}
// 组件中
changeTodoStatus(id) {
    this.$store.commit('changeTodoStatus', id)
    this.$message.success('修改状态成功')
}
```

### 4.7 统计未完成的任务条数

* 使用`getters`

```js
getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
        return state.data.filter(item => item.done === false).length
    }
}
// 组件中
computed: {
    ...mapGetters(['unDoneLength'])
}
```

### 4.8 清除已完成的任务

* 监听清除按钮的`@click`，触发`mutations`的函数

```js
// store 中
mutations: {
    clear(state) {
      state.data = state.data.filter(item => item.done === false)
    }
}
// 组件中
clear() {
    this.$store.commit('clear')
    this.$message.success('清除成功')
}
```

### 4.9 动态切换按钮的高亮效果

* 通过修改 a-button 的`type="primary"`或者`type="default"`

```html
<!-- 页面 -->
<a-button-group>
    <a-button
       :type="viewKey === 'all' ? 'primary' : 'default'"
       @click="changeList('all')"
     >
        全部
    </a-button>
    <a-button
       :type="viewKey === 'undone' ? 'primary' : 'default'"
       @click="changeList('undone')"
              >
        未完成
    </a-button>
    <a-button
       :type="viewKey === 'done' ? 'primary' : 'default'"
       @click="changeList('done')"
    >
        已完成
    </a-button>
</a-button-group>
```

```js
// 组件
changeList(key) {
    this.$store.commit('changeViewKey', key)
}
computed: {
    ...mapState(['viewKey']),
}
```

```js
// mutations
changeViewKey(state, newKey) {
    state.viewKey = newKey
}
```

### 4.10 实现列表的动态切换

* 通过判断`viewKey`的类型来对数据进行筛选

* 使用`getter`来判断

```js
// getter
getter: {
    // 根据不同的模式来得到不同的数据
    dymaicData(state) {
        let finalData = []
        switch (state.viewKey) {
            case 'all':
                finalData = state.data
                break
            case 'undone':
                finalData = state.data.filter(item => item.done === false)
                break
            case 'done':
                finalData = state.data.filter(item => item.done === true)
                break
        }
        return finalData
    } 
}
// 组件中使用 mapGetters 映射为一个计算属性
computed: {
    ...mapGetters(['dymaicData'])
}
```

```html
<!-- 将 list 的数据源修改为动态改变的就可以了 -->
<a-list :data-source="dymaicData" bordered></a-list>
```


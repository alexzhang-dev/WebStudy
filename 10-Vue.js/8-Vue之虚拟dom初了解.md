# 1. 虚拟 DOM

### 1.1 什么是虚拟 DOM

页面中的每个元素，都是一个 DOM 元素，所有的元素组成了一个 DOM 树

而虚拟的 DOM 只是由 Object 对象来模拟真实的 DOM，以下为`snabbdom`一个虚拟 DOM 结构：

```js
{
    children: undefined
    data: {
      props: { href: "http://www.baidu.com" }
    }
    elm: a
    key: undefined
    sel: "a"
    text: "123"
}
```

* `children`：子元素
* `data`：元素的属性
  * `props`：元素的内置属性
* `elm`：**真实 DOM**（重要）
* `key`：每个虚拟 DOM 的唯一标识
* `sel`：元素
* `text`：元素的内容

### 1.2 Vue 的虚拟 DOM

在 Vue.js 中，有一个十分重要的概念，那就是`Diff算法`，简单来说，Diff 算法用于最小单元的动态更新 DOM 视图。而 Diff 算法，就是对虚拟 DOM 进行比较。其中，Vue.js 的虚拟 DOM 借鉴了 snabbdom，所以下面我们就以snabbdom 作为例子来讲解。

# 2. 手写效果

### 2.1 什么是 h 函数

以下是一个`snabbdom`的小栗子：其中`h`函数用户生成虚拟 DOM 结构，`patch`函数用于将虚拟的 DOM 挂载到真实的 DOM 上

```js
import { init, propsModule, h } from 'snabbdom'

const patch = init([propsModule])

const container = document.getElementById('container')
// h 函数用于生成虚拟 DOM
const vnode = h('a', { props: { href: 'http://www.baidu.com' } }, '123')

// patch 函数将虚拟 DOM 挂载到真实的 DOM 上
patch(container, vnode)
```

### 2.2 手写一个 h 函数

从`snabbdom`的源码中，了解到`h`函数只是用于对参数进行一个简单的判断，再调用`vnode`函数来生成最终的虚拟 DOM 由此我们可以手写一个 h 函数

新建`h.js`

#### 1. 如果第三个参数是文本

```js
import vnode from './vnode.js'
// 假定我们的 h 函数必须要传入 3 个参数
// sel：虚拟 DOM 的标签元素
// data：虚拟 DOM 元素的属性
// children || text ：虚拟 DOM 元素的 children 子元素或内容
export default function (sel, data, c) {
  // 1. 对参数个数进行判断，如果不满足 3个 抛出异常
  if (arguments.length < 3) {
    throw new Error('参数个数必须是 3 个')
  }
  // 2. 满足了 3 个参数，此时第 3 个参数可以是 children：子元素 也可以是 text 文本
  //    所以需要做一个简单的判断
  if (typeof c === 'string') {
    // 此时 c 是文本，children就是undefined
    // 由于现在还处于虚拟 DOM 阶段，所以没有 elm 真实 DOM，所以是undefined
    let key = data.key
    return vnode(sel, data, undefined, c, undefined, key)
  }
}
```

需要用到的`vnode.js`

```js
export default function (sel, data, children, text, elm, key) {
  return {
    sel, // DOM 虚拟元素的标签
    data, // DOM 虚拟元素的属性
    children, // DOM 虚拟元素的子元素
    text, // DOM 虚拟元素的文本
    elm, // DOM 虚拟元素指向的真实 DOM
    key, // DOM 虚拟元素的唯一标识
  }
}
```

[查看效果](./resource/28.gif)

此时，我们已经可以做好了第一个小判断

#### 2. 如果第三个参数是数组

如果第三个参数是数组，那么就说明第三个参数是 children，这个时候就需要用到循环了

```js
if (typeof c === 'string') {
    // 此时 c 是文本，children就是undefined
    // 由于现在还处于虚拟 DOM 阶段，所以没有 elm 真实 DOM，所以是undefined
    let key = data.key
    return vnode(sel, data, undefined, c, undefined, key)
}
// 【新增代码！！！】
// 这个分支循环是如果第三个参数是children
const children = []
c.forEach(item => {
    children.push(item)
})
vnode(sel, data, children, undefined, undefined, key)
```

[查看效果](./resource/29.gif)

此时，我们已经实现了一个简单的`h`函数，来生成简单的虚拟 DOM 结构了

### 2.3  手写一个 patch 函数

在`2.2`中已经说到，`patch`函数用于对比新旧节点的差异，与将虚拟 DOM 挂载到真实 DOM 上，所以这里，我们也可以实现一个简单的 patch 函数

#### 1. 挂载真实 DOM

```js
// 【patch.js】
import createElm from './createElm.js'
// oldVnode：旧的 vNode 节点
export default function (oldVNode, VNode) {
  // 1. 如果新旧节点相同，那么就是 Diff 算法的核心开始对比
  if (oldVNode.sel === VNode.sel && oldVNode.key === VNode.key) {
      // Diff 核心算法
  }
  // 2. 如果 oldVNode 和 VNode 不是一个相同的节点
  //    即删除旧节点所有，重新创建新节点
  //    调用 createElm 方法，来创建一个真实的 DOM 元素
  oldVNode.appendChild(createElm(VNode))
}
```

```js
// 【createElm.js】
export default function createElm(vNode) {
  let dom = document.createElement(vNode.sel.toLowerCase())
  if (vNode.text) {
    dom.innerHTML = vNode.text
  }
  // 此时已经生成真实 DOM，所以需要设置 elm 属性
  vNode.elm = dom
  // 如果有 children，开始递归
  if (vNode.children && vNode.children.length > 0) {
    vNode.children.forEach(item => {
      let sdom = createElm(item)
      dom.appendChild(sdom)
    })
  }
  return dom
}
```

[查看效果](./resource/30.gif)

此时，我们已经创建出了一个简单的`patch`函数了

# 3. key

### 3.1 key 的作用

`key`作为虚拟 DOM 的唯一标识，在 Diff 算法中是十分重要的。在 Vue 的 v-for 指令中，强烈建议使用唯一标识作为`key`（有 ID 用 ID，没有 ID 用自身），不建议使用`index`作为 key，不仅会影响性能，有时还有会意想不到的 Bug

[key在虚拟 DOM 中的作用](./resource/31.gif)


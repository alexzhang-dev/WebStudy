import vnode from './vnode.js'
// 假定我们的 h 函数必须要传入 3 个参数
// sel：虚拟 DOM 的标签元素
// data：虚拟 DOM 元素的属性
// children || text ：虚拟 DOM 元素的 children 子元素或内容
export default function h(sel, data, c) {
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
  // 这个分支循环是如果第三个参数是children
  const children = []
  c.forEach(item => {
    children.push(item)
  })
  return vnode(sel, data, children, undefined, undefined, data.key)
}

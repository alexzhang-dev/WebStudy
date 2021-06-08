import createElm from './createElm.js'
// oldVnode：旧的 vNode 节点
export default function (oldVNode, VNode) {
  // 1. 如果新旧节点相同，那么就是 Diff 算法的核心开始对比
  if (oldVNode.sel === VNode.sel && oldVNode.key === VNode.key) {
  }
  // 2. 如果 oldVNode 和 VNode 不是一个相同的节点
  //    即删除旧节点所有，重新创建新节点
  //    调用 createElm 方法，来创建一个真实的 DOM 元素
  oldVNode.appendChild(createElm(VNode))
}

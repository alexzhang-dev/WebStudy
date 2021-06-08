export default function createElm(vNode) {
  let dom = document.createElement(vNode.sel.toLowerCase())
  if (vNode.text) {
    dom.innerHTML = vNode.text
  }
  // 此时已经生成真实 DOM，所以需要设置 elm 属性
  vNode.elm = dom
  // 如果有 children
  if (vNode.children && vNode.children.length > 0) {
    vNode.children.forEach(item => {
      let sdom = createElm(item)
      dom.appendChild(sdom)
    })
  }
  return dom
}

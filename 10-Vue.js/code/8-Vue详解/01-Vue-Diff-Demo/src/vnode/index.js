import { init, propsModule } from 'snabbdom'
import h from './h.js'
// import patch from './patch'

const patch = init([propsModule])

const container = document.getElementById('container')

const vnode = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
])
const vnode2 = h('ul', {}, [
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
])

patch(container, vnode)
document.querySelector('#btn').onclick = function () {
  patch(vnode, vnode2)
}

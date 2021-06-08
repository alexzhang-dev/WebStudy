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

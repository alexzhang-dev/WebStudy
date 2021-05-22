// 定义私有成员 a 和 b 和 show
let a = 1;
let b = 2;
// 外界访问不到成员c，是因为c没有暴露出去
let c = 3;

function show() {}
// 默认导出语法
export default {
    a,
    b,
    show,
}
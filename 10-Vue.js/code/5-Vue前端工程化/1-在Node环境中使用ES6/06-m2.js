// 有时候，我们只想单独执行某个模块中的代码，并不需要得到模块向外暴露的成员，可以直接导入执行模块代码
// 当前模块执行一个循环
for (let i = 0; i < 3; i++) {
    console.log(i);
}
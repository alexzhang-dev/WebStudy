const fs = require('fs');
const path = require('path');

// 1. 定义正则表达式
//    匹配CSS的正则表达式 \s匹配空白字符 \S匹配非空白字符 *匹配任意多次
const CSSreg = /<style>[\s\S]*<\/style>/;
//    匹配JS的正则表达式
const JSreg = /<script>[\s\S]*<\/script>/;

// 2. 写处理方法
//    处理CSS的方法
const resolveCSS = (html) => {
    // (1). 获取style里的内容
    const css = CSSreg.exec(html);
    // (2). 将<style></style>标签删除掉
    const resolvedCSS = css[0].replace("<style>", "").replace("</style>", "");
    // (3). 将处理好的CSS代码写入到文件当中
    fs.writeFile(path.join(__dirname, '../clock/index.css'), resolvedCSS, err => {
        if (err) {
            return console.log("CSS文件写入失败！");
        }
    });
};
//    处理JS的方法
const resolveJS = (html) => {
    // (1). 获取script里的内容
    const js = JSreg.exec(html);
    // (2). 将<script></script>标签删除掉
    const resolvedJS = js[0].replace("<script>", "").replace("</script>", "");
    // (3). 将处理好的JS代码写入到文件当中
    fs.writeFile(path.join(__dirname, '../clock/index.js'), resolvedJS, err => {
        if (err) {
            return console.log("JS文件写入失败！");
        }
    });
};
//    处理HTML的方法
const resolveHTML = (html) => {
    // (1). 获取js和css的内容
    const css = CSSreg.exec(html);
    const js = JSreg.exec(html);
    // (2). 将js和css内容改为外联式
    const resolvedHTML = html.replace(css[0], `<link rel='stylesheet' href='index.css' />`).replace(js[0], `<script src='index.js' /></script>`);
    // (3). 将处理好的HTML代码写入到文件当中
    fs.writeFile(path.join(__dirname, '../clock/index.html'), resolvedHTML, err => {
        if (err) {
            return console.log("HTML文件写入失败！");
        }
    });
};

// 3. 读取需要处理的HTML文件
fs.readFile(path.join(__dirname, './index.html'), 'utf-8', (err, dataStr) => {
    if (err) {
        return console.log("文件读取失败");
    }
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
});
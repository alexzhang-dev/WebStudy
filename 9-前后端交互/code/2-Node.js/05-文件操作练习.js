// 需求：将成绩.txt里面的内容转换为 姓名：成绩的格式
const fs = require('fs');
// 由于代码和文件的位置可能不固定，所以很有可能会出现路径错误
// __dirname:当前路径
fs.readFile(__dirname + '/files/成绩.txt', 'utf8', (err, msg) => {
    if (err) {
        return console.log("成绩.txt文件不存在，读取失败！");
    }
    const grades_arr = msg.split(" ")
    let str = "";
    grades_arr.forEach(item => {
        str += `${item.split('=')[0]}：${item.split('=')[1]}\r\n`;
    });
    fs.writeFile(__dirname + "/files/成绩-ok.txt", str, err => {
        if (err) {
            return console.log("成绩写入失败，以下为原因：" + err);
        }
        console.log("成绩转换成功，请查看成绩-ok.txt");
    });
})
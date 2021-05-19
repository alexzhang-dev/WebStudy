const fs = require('fs');
const path = require('path');
const jsonFile = require('../data/data.json');

// 生成图书唯一ID（自增）
let getMaxBookCode = () => {
    let arr = [];
    jsonFile.forEach((item) => {
        arr.push(item.id);
    });
    // 求最大值
    return arr.length == 0 ? 1 : Math.max.apply(null, arr) + 1;
};

// 把数据写入到文件中
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, "../data/data.json"), JSON.stringify(jsonFile, null, 4), err => {
        if (err) {
            res.json({
                status: 500,
                message: "写入错误"
            });
        }
        res.json({
            status: 200,
            message: "写入成功"
        });
    })
}

// 获取图书列表
exports.getBookList = (req, res) => {
    res.json({
        status: 200,
        message: "获取成功",
        data: jsonFile
    });
}

// 添加图书保存数据
exports.addBook = (req, res) => {
    let book = {
        id: getMaxBookCode(),
        code: req.body.code,
        name: req.body.name,
        addTime: +new Date()
    }
    jsonFile.push(book);
    writeDataToFile(res);
}

// 验证图书名称是否存在
exports.checkNameUsable = (req, res) => {
    let flag = jsonFile.some(item => {
        return item.name == req.params.name;
    });
    flag ? res.cc("存在！") : res.cc("可用！", 200);
}

// 根据ID查询图书信息
exports.getBookInfoById = (req, res) => {
    let bookInfo = jsonFile.filter((item) => {
        return item.id == req.params.id;
    })[0];
    if (bookInfo) {
        return res.json({
            status: 200,
            message: "获取成功",
            data: bookInfo
        });
    }
    res.cc("找不到用户信息");
};

// 更新图书信息
exports.updateBookInfo = (req, res) => {
    // 根据ID查询Index
    let index = jsonFile.findIndex(item => {
        return item.id == req.params.id;
    });
    if (index === -1) {
        return res.cc('找不到指定信息');
    }
    jsonFile[index].name = req.body.name;
    jsonFile[index].addTime = +new Date();
    // 再将修改后的信息覆盖源文件
    writeDataToFile(res);
};

// 删除图书
exports.deletBook = (req, res) => {
    let index = jsonFile.findIndex(item => {
        return item.id == req.params.id;
    });
    if (index === -1) {
        return res.cc('找不到指定信息');
    }
    jsonFile.splice(index, 1);
    // 将删除后的写入文件
    writeDataToFile(res);
};
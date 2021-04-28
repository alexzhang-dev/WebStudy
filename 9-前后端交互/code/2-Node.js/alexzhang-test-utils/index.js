// 这是包的入口文件
const dateFormat = require('./src/dateFormat');
const htmlEscape = require('./src/htmlEscape');
module.exports = {
    "dateFormat": dateFormat.dateFormat,
    "htmlEscape": htmlEscape.htmlEscape,
    "htmlUnEscape": htmlEscape.htmlUnEscape
}
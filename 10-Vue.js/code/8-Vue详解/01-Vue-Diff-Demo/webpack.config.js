const path = require('path')
// 页面预览
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlPlugin = new HtmlWebpackPlugin({
  // 指定模板文件
  template: path.join(__dirname, './static/index.html'),
  // 指定生成的文件名
  filename: 'index.html',
})
module.exports = {
  mode: 'development',
  // 入口路径
  entry: path.join(__dirname, './src/index.js'),
  // 打包路径
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [HtmlPlugin],
}

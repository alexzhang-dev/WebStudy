const path = require('path');

// 导入页面预览插件，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPlugin = new HtmlWebpackPlugin({
    // 指定要使用的模板文件
    template: './src/index.html',
    // 指定生成的文件名称，该文件存在于内存中
    filename: 'index.html',
    title: 'SPA'
});

// 导入 vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development', // mode 用来指定构建模式
    // 配置打包的入口和出口
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        // 打包输出的文件名
        filename: 'bundle.js'
    },
    // plugins数组是webpack在打包时用到的插件
    plugins: [HtmlPlugin, new VueLoaderPlugin()],
    module: {
        // 配置解析其他文件的 loader 
        rules: [{ // 配置 CSS loader
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, { // 配置 LESS loader
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, { // 配置 SASS loader
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            // 配置解析 图片 字体 和 url 的 loader
            test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
            use: 'url-loader?limit=16940',
            // 小于limit大小的图片会被转为base64格式(单位b)
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            // 配置解析 vue 的 loader
            test: /\.vue$/,
            use: 'vue-loader',
        }]
    }

}
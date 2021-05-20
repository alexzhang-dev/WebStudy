const path = require('path');

// 加载html-webpack-plugin预览插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置插件
const htmlPlugin = new HtmlWebpackPlugin({
    // template用到的页面模板
    template: './src/index.html',
    // filename生成的文件，存在内存中
    filename: 'index.html'
});

module.exports = {
    // 编译模式 development/production
    mode: 'development',
    // 手动指定打包的入口与出口
    // 入口
    entry: path.join(__dirname, './src/index.js'),
    // 出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    // 在暴露成员中添加插件
    plugins: [htmlPlugin],
    // 配置 loader
    module: {
        rules: [{
                // 指定的文件类型
                test: /\.css$/,
                // 指定的loader
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                // 配置 LESS loader
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                // 配置 SASS loader
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // 配置图片和字体文件的 URL
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: 'url-loader?limit=16940',
                // limit用来指定图片的大小，单位是字节(byte)，只有小于limit大小的图片，才会被转为base64图片
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                // exclude表示排除项
                exclude: /node_modules/,
            }
        ],
    }
}
### 1. 初始化项目文件
* 新建空白目录，并运行`npm init -y`命令，初始化包管理配置文件`package.json`
* 新建`src`源代码目录
* 新建`src`->`index.html`首页
* 初始化首页基本结构
* 运行`npm install jquery -S`命令，安装生产环境依赖`jQuery`
* 通过模块化的形式，实现列表隔行变色效果

### 2. 安装并运行 webpack
* 运行`npm i webpack webpack-cli -D`命令，安装开发环境依赖`webpack`与`webpack-cli`

* 在项目根目录创建 webpack 配置文件`webpack.config.js`

* 在 webpack 配置文件，初始化以下配置：

  ```js
  module.exports = {
      mode: 'development'; // mode 用来指定构建模式
  }
  ```

  * `mode`有2个值`development`与`production`
    * `development`：模式为开发环境，不会对转换的代码进行压缩混淆，速度较快
    * `production`：模式为生产环境，会对转换代码进行压缩混淆，速度较慢

*  在`package.json`中添加一条`dev`脚本

  ```json
  "scripts": {
      "dev": "webpack" // script 节点下的脚本，可以通过 npm run xxx指令执行
  }
  ```
* 运行`npm run dev`命令，就可以在`dist/main.js`看到已打包好的JS，直接引用即可



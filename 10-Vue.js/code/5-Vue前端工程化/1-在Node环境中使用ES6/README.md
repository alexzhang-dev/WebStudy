node.js使用babel体验ES6模块化规范

* `npm i --save-dev '@babel/core' '@babel/cli' '@babel/preset-env' '@babel/node'`
  * 安装开发环境包
  * `@babel/core`
  * `@babel/cli`
  * `@babel/preset-env`
  * `@bale/node`
* `npm i --save '@babel/polyfill'`
  * 安装生产环境包
  * `@babel/polyfill`

* 项目根目录创建文件`babel.config.js`，代码如下

  ```js
  const presets = [
      ["@babel/env", {
          targets: {
              edge: '17',
              firefox: '60',
              chrome: '67',
              safari: '11.1'
          }
      }]
  ]
  module.exports = { presets };
  ```

* 运行`npx babel-node index.js`执行代码
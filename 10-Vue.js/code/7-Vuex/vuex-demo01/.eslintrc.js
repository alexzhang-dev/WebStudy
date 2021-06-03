module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  rules: {
    // 禁用函数名后面必须加空格
    "space-before-function-paren": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

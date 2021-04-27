const path = require('path');
const fpath = 'a/b/c/d/index.js';

const ext = path.extname(fpath);
console.log(ext); // .js
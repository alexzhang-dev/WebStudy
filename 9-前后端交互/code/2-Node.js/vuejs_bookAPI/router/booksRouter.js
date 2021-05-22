const express = require('express');
const router = express.Router();
const handle = require('../router_handler/booksHandle');

// 图书列表加载
router.get('/books', handle.getBookList);

// 添加图书
router.post('/books', handle.addBook);

// 验证名称是否可用
router.get('/books/book/:name', handle.checkNameUsable);

// 根据ID查询信息
router.get('/books/:id', handle.getBookInfoById);

// 更新图书
router.put('/books/:id', handle.updateBookInfo);

// 删除图书
router.delete('/books/:id', handle.deletBook);

module.exports = router;
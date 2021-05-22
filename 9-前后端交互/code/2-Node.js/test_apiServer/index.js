const express = require('express');
const app = express();
const booksRouter = require('./router/booksRouter');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use('/api', booksRouter);

app.listen(80, () => {
    console.log('server is running ai http://127.0.0.1:80')
})
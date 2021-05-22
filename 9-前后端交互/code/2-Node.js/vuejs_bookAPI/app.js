const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/booksRouter');

app.use(cors());
app.use(express.urlencoded({
    extended: false,
}))
app.use(express.json());

app.use((req, res, next) => {
    res.cc = function(err, statusCode = 500) {
        res.send({
            status: statusCode,
            message: err instanceof Object ? err.data : err
        });
    };
    next();
});

app.use(router);

app.listen(80, () => {
    console.log("server is running at http://127.0.0.1");
});
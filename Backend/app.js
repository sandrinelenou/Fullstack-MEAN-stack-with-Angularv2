const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const router = express.Router();

const db = require('./database/db');

const postRouter = require('./routes/post');
const productRouter = require('./routes/product');
const videoRouter = require('./routes/video');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//CORS
app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origine, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS");
    next();
});

const PORT = process.env.PORT || 3000;


app.use("/api/post", postRouter);
app.use("/api/product", productRouter);
app.use("/api/video", videoRouter);

app.listen(PORT, (req, res,next) => {
    console.log('App is listening on port: ' + PORT);
});

module.exports = app;
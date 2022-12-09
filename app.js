"use strict";
const config = require("./config");
require("express-group-routes");
const fs = require("fs");
const morgan = require("morgan");
const accessLogStream = fs.createWriteStream(config.MORGAN_LOGS, {
    flags: "a",
});
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
};

app.use(cors());
app.use(allowCrossDomain);
app.set("view engine", "ejs");
require('./routes/index')(app);
app.use(function (req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('error', { url: req.url });
        return;
    }
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
    res.type('txt').send('Not found');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(config.NODE_API_PORT, () => {
    console.log( config.SERVICE_ALIAS + ": " + config.NODE_API_PORT);
});

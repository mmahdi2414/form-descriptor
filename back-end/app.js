require('dotenv').config();
// const path = require('path');
const express = require('express');
const body_parser = require('body-parser');
const log = require('./logger/logger');
// const reporter = require('./reporter/api');

const port = process.env.PORT || 8000;
const app = express();
const cors = require("cors");


app.use(body_parser.json());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
    });
var cnt = 0;
app.get('/' , (req , res) =>{
    cnt++;
    log('info' , `new ${req.method} request on ${req.originalUrl}`);
    return res.status(200).json({forms: [cnt , 2]})
});
// app.use(function(req, res) {
// 	    log('error' , `url: ${req.url} not found.`);
// 	    return res.status(404).json({message: `url: ${req.url} Not found.`});
//     }
// );



app.listen(port , function(){
    log('info',`app started at port ${port}`);
});
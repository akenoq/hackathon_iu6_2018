"use strict";

// подключаем фреймвок express
let express = require('express');
let app = express();

// по запросу корня сайта с отдаем index.html 
app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

// слушаем на заданном порте или другом свободном
let port = process.env.PORT || 5007;
app.listen(port);
console.log("Server works on port " + port);


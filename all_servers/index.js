"use strict";

// подключаем фреймвок express
let express = require('express');
let app = express();

// разрешаем междоменные запросы
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

/**
 * /static/...
 * отдает статические файлы
  */
app.get('/client', function(req, res) {
    res.sendfile("static/index.html");
});

app.get('/main.js', function(req, res) {
    res.sendfile("static/main.js");
});

app.get('/style.css', function(req, res) {
    res.sendfile("static/style.css");
});

/**
 * /api/...
 * отвечает на запросы
 */

// hello-GET, вывод сообщения в браузере 'hello'
app.get('/api/hello', function (req, res) {
    res.send('Hello Pi');
});

// GET-запрос
// с параметрамми 'a' и 'b' (?a=5&b=33 в url)
// http://localhost:5005/api/summa?a=5&b=33 => результат 'a + b = 58'
app.get('/api/summa', (req, res) => {
    const a = parseInt(req.query.a); // 3
    const b = parseInt(req.query.b); // 5
    const answer = a + b; // 8
    console.log('A: ' + a + '  B: ' + b + '  Answer: '  + answer); // A: 3  B: 5   Answer: 8
    res.status(200);
    res.end(JSON.stringify({"summa":answer})); // '8'
});

// получаем POST-запрос в формате JSON и овечаем в формате JSON {"nickname":"Bob","age":17}
app.post('/api/student', (req, res) => {
    let body = '';
    req.on('data', (data) => {
        body += data;
    }).on('end', () => {
        const dataObj = JSON.parse(body);
        console.log(dataObj);
        // формат: {name: Nick, age: 19}
        const name = dataObj.name;
        const age = dataObj.age;
	    res.status(200);
        res.end(JSON.stringify(dataObj));
    });
});

// неверный url запроса
app.get('/*', (request, response) => {
    response.end("incorrect request");
});

app.post('/*', (request, response) => {
    let body = "";
    request.on('data', (data) => {
        body += data;
    }).on('end', () => {
        response.end("incorrect request");
    });
});

// слушаем на порту 5005 или другом свободном
let port = process.env.PORT || 5005;
app.listen(port);
console.log("Server works on port " + port);

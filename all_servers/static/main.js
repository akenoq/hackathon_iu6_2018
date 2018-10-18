'use strict';

const baseUrl = 'http://127.0.0.1:5005';

function requestToHost(method, address, data, callback){
    const xhr = new XMLHttpRequest();
    xhr.open(method, baseUrl + address, true);
    xhr.withCredentials = false; //for cookies

    const body = JSON.stringify(data);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    if (method === 'GET') {
        xhr.send(null);
    } else {
        xhr.send(body);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };
}

window.onload = function () {
    let studentBtn = document.getElementById('studentBtn');
    let nameInput = document.getElementById('nameInput');
    let ageInput = document.getElementById('ageInput');
    let resultBox = document.getElementById('resultBox');

    let aInput = document.getElementById('aInput');
    let bInput = document.getElementById('bInput');
    let summaBtn = document.getElementById('summaBtn');

    summaBtn.onclick = function () {
        let a = aInput.value;
        let b = bInput.value;
        let reqStr = '?a=' + a + '&b=' +b;
        requestToHost('GET', '/api/summa/' + reqStr, null, function (err, res) {
            if (err) {
                resultBox.innerHTML = 'Error';
            } else {
                resultBox.innerHTML = 'Сумма = ' + res.summa;
            }
        })
    };

    studentBtn.onclick = function () {
        let name = nameInput.value;
        let age = ageInput.value;
        let reqObj = {
            name: name,
            age: age
        };
        requestToHost('POST', '/api/student' ,reqObj, function (err, res) {
            if (err) {
                resultBox.innerHTML = 'Error';
            } else {
                resultBox.innerHTML = 'Студент ' + res.name + ', возраст студента ' + res.age;
            }
        });
    };
};
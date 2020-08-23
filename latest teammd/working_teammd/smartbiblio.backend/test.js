var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//const data = "login=lionpeska&password=qwerty1234";
const data = JSON.stringify({login: 'Leone_Bikas', password: 'qwerty1234',email: 'demagox167@sweatmail.com'});

var xhr = new XMLHttpRequest();
console.log(data);

xhr.onreadystatechange =() =>{
    if (xhr.readyState === XMLHttpRequest.DONE) {
        renderResponse(xhr.response);
    }
}
http://localhost:4001/appi/app/search

//xhr.open('POST','http://localhost:4001/appi/app/autorization/local');
xhr.open('POST','http://localhost:4001/appi/app/registration');
xhr.setRequestHeader('Content-Type', 'application/json');
//xhr.setRequestHeader('apikey', 'abc');

xhr.onload = function() {
    if (xhr.status !== 201) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log("Error",xhr.status);
    } else { // если всё прошло гладко, выводим результат
        console.log("Everything is ok");
    }
};

xhr.send(data);



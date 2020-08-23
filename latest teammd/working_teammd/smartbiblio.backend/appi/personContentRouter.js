const express = require('express');
const personRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});

personRouter.get('/recomendations', (req, res, next) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5000/user-recommendation?user_id=${req.query.user_id}&count=${req.query.count}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log("Python error!");
            res.status(500).send("Python error!");
        }
        else {
            const books_id = JSON.parse(xhr.responseText);
            var resp = [];
            books_id.forEach(i => db.get("SELECT * FROM Books WHERE id=" + i, (err, row) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Database error");
                }
                else {
                    resp.push(row);
                }
                if (books_id.length === resp.length) {
                    res.status(200).send(resp);
                }
            }))
        }
    }
    xhr.send();
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/autorization.html');
    }
}

personRouter.get('/user', (req, res, next) => {
    const sqlBestRequest = `SELECT * FROM users WHERE login=$username`;
    if (!req.user) {
        res.status(404).send();
    }
    db.get(sqlBestRequest, { $username: req.user }, (err, row) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Internal error");
        }
        else {
            res.status(200).send(row);
        }
    })
})

module.exports = personRouter;

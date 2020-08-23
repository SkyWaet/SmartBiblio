const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const catalogItemRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});

catalogItemRouter.get('/properties',(req,res,next)=>{
    const sqlPropsRequest = `SELECT * FROM Books WHERE id=${req.query.book_id}`;
    db.all(sqlPropsRequest,(err,row)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("Internal error");
        }
        else {
            res.status(200).send(row);
        }
    })
});

catalogItemRouter.get('/recomendations',(req,res,next)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`http://localhost:5000/book-recommendation?user_id=${req.query.user_id}&count=${req.query.count}&book_id=${req.query.book_id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function()
    {
        if (xhr.status !== 200){
            console.log("Python error!");
            res.status(500).send("Python error!");
        }
        else{
            const books_id = JSON.parse(xhr.responseText);
            var resp = [];
            books_id.forEach(i => db.get("SELECT * FROM Books WHERE id="+i,(err,row)=>{
                    if(err){
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


module.exports = catalogItemRouter;

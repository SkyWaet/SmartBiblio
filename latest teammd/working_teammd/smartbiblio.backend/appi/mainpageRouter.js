const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const mainpageRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});


mainpageRouter.get('/bestsellers',(req,res,next)=>{
        const sqlBestRequest = "SELECT * FROM Books ORDER BY (summary_rating/amOfReviews) DESC LIMIT 4";
        db.all(sqlBestRequest,(err,row)=>{
            if(err){
                console.log(err.message);
                res.status(500).send("Internal error");
            }
            else {
                res.status(200).send(row);
            }
        })
});

mainpageRouter.get('/recomendations',(req,res,next)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`http://localhost:5000/user-recommendation?user_id=${req.query.user_id}&count=${req.query.count}`);
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

mainpageRouter.get('/newBooks',(req,res,next)=>{
    const sqlBestRequest = "SELECT * FROM Books WHERE isNew = 'true' LIMIT 4 ";
    //console.log("Wtf^2");
    db.all(sqlBestRequest,(err,row)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("Internal error");
        }
        else {
            //console.log("Wtf");
            res.status(200).send(row);
        }
    })
});

mainpageRouter.get('/stories', (req,res,next) => {
	const sqlGetStories = "SELECT * FROM Stories LIMIT 3";
	db.all(sqlGetStories, (err,row) => {
		if (err) {
			console.log(err.message);
			res.status(500).send("Internal error");
		}
		else {
			res.status(200).send(row);
		}
	})
});

module.exports = mainpageRouter;

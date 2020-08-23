const express = require('express');
const searchRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});
searchRouter.use(bodyParser.json({
    extended: true
}));

const checkParams = (req,res,next)=>{
    if(req.body.genre === 'Любой' || !req.body.genre){
        req.genre = '%';
    }
    else{
        req.genre = `%${req.body.genre}%`;
    }

    if(!req.body.author){
          req.author = '%';
        }
    else {
            req.author = `%${req.body.author}%`;
        }

     if(!req.body.bookTitle){
        req.bookTitle = '%';
     }
     else {
         req.bookTitle = `%${req.body.bookTitle}%`;
     }

    if(!req.body.minPrice){
        req.minPrice = 0;
    }
    else {
        req.minPrice = req.body.minPrice;
    }

    if(!req.body.maxPrice){
        req.maxPrice = 20000;
    }
    else {
        req.maxPrice = req.body.maxPrice;
    }

    if(!req.body.maxPages){
        req.maxPages = 5000;
    }
    else {
        req.maxPages = req.body.maxPages;
    }
    next();
}

searchRouter.post('/',checkParams,(req,res,next)=>{
   // let param = `%${req.genre}%`
    //if(param='%%%') {param='%'};
    /* AND id > '' */
    let sqlQuery = `SELECT * FROM Books WHERE genre LIKE '${req.genre}' AND author LIKE '${req.author}' AND title LIKE '${req.bookTitle}' LIMIT 20 OFFSET ${(req.body.page - 1) * 20}; `;
    db.all(sqlQuery,(err,row)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("DB internal error");
        }
        else {
          // console.log("Hello there " + row+" ....");
           res.status(201).send(row);
        }
    });
});

module.exports = searchRouter;

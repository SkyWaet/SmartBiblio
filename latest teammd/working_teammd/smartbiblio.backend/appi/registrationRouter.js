const express = require('express');
const registrationRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const hashes = require('./hashes.js');
const emailsProcessor = require('./mailSend.js');

const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});

//const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();
//registrationRouter.use(jsonParser);

registrationRouter.post('/local',hashes,emailsProcessor,(req,res,next)=>{
    const login = req.body.login;
    const sqlInsRequest = "INSERT INTO users(login,password,email) VALUES ($login,$password,$email)";
      db.run(sqlInsRequest,{$login: login, $password: req.hash,$email: req.email},(err)=>{
         if(err){
            console.log (err.message);
            res.status(400).send();
            }
         else{
             console.log('I am here!');
             res.status(201).redirect("/");
                }
      });
});

module.exports = registrationRouter;

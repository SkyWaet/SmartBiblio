const express = require('express');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(cookieParser());
app.use(cookieSession({keys: ['wtf', 'wth']}));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(session({
    secret: 'Lion is mouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: 'Authorization',
        SameSite: false,
        secure: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


const cors = require('cors');
app.use(cors());


// app.use(bodyParser.json());

const apiRouter = require('./appi/app.js');
app.use('/appi/app', apiRouter);

/*
app.get('/abc',(req,res,next)=>{
    console.log('Request got');
    res.status(200).send();
});*/


// This conditional is here for testing purposes:
if (!module.parent) {
    // Add your code to start the server listening at PORT below:
    app.listen(PORT, () => {
        console.log('listening on port ' + PORT);
    })
}

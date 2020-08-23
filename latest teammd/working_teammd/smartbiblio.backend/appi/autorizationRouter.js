const express = require('express');
const bcrypt = require('bcrypt');
const autorizationRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const hashes = require('./hashes.js');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;

const db = new sqlite3.Database('/home/pizdets/SERVER/bookstore.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the bookstore database.');
    }
});


function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next();
        else res.redirect('/autentification.html');
    })
};


let log, pass, hashedPass;

const getInfo = (req, res, next) => {
    const sqlSelect = `SELECT login,password FROM users WHERE login='${req.body.username}'`;
    db.get(sqlSelect, (err, row) => {
        if (err) {
            console.log(err.message);
            res.status(400).send();
        }
        else {
            req.db = row;
            log = row.login;
            pass = row.password;
            hashedPass = req.hash;
            next();
        }
    });
};


passport.use(
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (login, password, done) => {
        if (login !== log) return done(null, false, { message: 'Пользователь не найден!' })
        else if (bcrypt.compare(password, hashedPass, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(500).send();
            }
            else { return result };
        })) {
            console.log("Password");
            return done(null, false, { message: 'Неверный пароль!' });
        }
        console.log("Successful autorization");
        return done(null, login);
    })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new VKontakteStrategy({
    clientID: 7372362, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: "BB0nKQTjkf4Kb2ZfiZUm",
    callbackURL: "https://www.smartbiblio.store/appi/app/autorization/vkontakte/callback",
    scope: ['email', 'offline'],
    profileFields: ['email']
},
    function verify(accessToken, refreshToken, params, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            const uid = "vk" + profile.id;
            const name = profile.displayName;
            const photo = profile.photos[0].value;
            const email = params.email;
            const token = accessToken;

            db.get(`SELECT EXISTS(SELECT 1 FROM users WHERE (id="${uid}" OR email="${email}") AND is_vk=1);`, (err, row) => {
                if (err) {
                    console.log(err.message);
                    // res.status(500).send("Database error");
                    return done(null, false, { message: 'Database Error' });
                }
                else {
                    // Пользователь зарегистрирован, вход успешен
                    if (Object.values(row)[0] === 1) {
                        // res.status(200).redirect("/");
                        return done(null, uid);
                    } else {
                        // Неуспешный вход, и как следствие, регистрация
                        db.run(`INSERT INTO users (login,password,email,is_vk) VALUES ("${uid}","${token}","${email}",${1})`, (err, row) => {
                            if (err) {
                                console.log(err.message);
                                return done(null, false, { message: 'Database Error' });
                            }
                            else {
                                return done(null, uid);
                            }
                        })
                    }
                }
            })

            return done(null, uid);
        });
    }
));

autorizationRouter.get('/vkontakte/auth',
    passport.authenticate('vkontakte', {session: true}),
    function (req, res) {
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

autorizationRouter.get('/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/autorization.html', session: true }),
    function (req, res) {
        res.redirect('/person.html');
});

// autorizationRouter.get('/vkontakte/handle_user', (req, res, next) => {
//     const uid = req.query.uid;
//     const name = req.query.first_name + " " + req.query.last_name;
//     const photo = req.photo;

//     db.run(`INSERT INTO users (login,password,email,is_vk) VALUES (id${uid},)` + i, (err, row) => {
//         if (err) {
//             console.log(err.message);
//             res.status(500).send("Database error");
//         }
//         else {
//             res.status(200).redirect("/person.html");
//         }
//     })
// });
// autorizationRouter.use((req, res, next) => {
//     if (req.user) next()
//     else res.redirect('/');
// });

//,passport.authenticate('local')

autorizationRouter.post('/local', hashes, getInfo, passport.authenticate('local', {
    successRedirect: '/person.html',
    failureRedirect: '/autorization.html',
    successFlash: "Success",
    failureFlash: true
}),
    (req, res, next) => {
        console.log("Inside post request");
        res.status(200).send();
    });
module.exports = autorizationRouter;

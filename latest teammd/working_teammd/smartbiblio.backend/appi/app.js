const express = require('express');
const apiRouter = express.Router();
const mainpageRouter = require('./mainpageRouter.js');
const registrationRouter = require('./registrationRouter.js');
const autorizationRouter = require('./autorizationRouter.js');
const searchRouter = require('./searchRouter.js');
const catalogItemRouter = require('./catalogItemRouter.js');
const personContentRouter = require('./personContentRouter.js');

/*
const checkMinion = minion =>{
    if(( minion.name !== string)||( minion.title !== string)||(minion.salary!==number)) return false;
    else return true;
}*/

apiRouter.use('/mainpage',mainpageRouter);
apiRouter.use('/registration',registrationRouter);
apiRouter.use('/autorization',autorizationRouter);
apiRouter.use('/search',searchRouter);
apiRouter.use('/catalogitem',catalogItemRouter);
apiRouter.use('/personcontent',personContentRouter);

module.exports = apiRouter;

const bcrypt = require('bcrypt');

const hashPassword = (req,res,next)=>{
   //console.log(req.body);
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            console.log("Hash error");
        }
        else{
            req.hash = hash;
            next();
        }
    })
};
module.exports = hashPassword;

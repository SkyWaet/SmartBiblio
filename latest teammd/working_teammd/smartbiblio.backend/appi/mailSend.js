const nodemailer = require('nodemailer');

const emailsProcessor = (req,res,next)=>{

     const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(req.body.email.match(mailformat))
        {
            req.email = req.body.email;
            const transporter = nodemailer.createTransport({
                service: 'mail.ru',
                auth: {
                    user: 'gleb_slepenkov@mail.ru',
                    pass: 'gleb1019'
                }
            });

            const mailOptions = {
                from: 'gleb_slepenkov@mail.ru',
                to: req.email,
                subject: 'Email confirmation',
                text: `Check your email <a href = "https://www.google.com">Click here to validate email!</a>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            next();
        }
        else
        {
            res.status(400).send('Incorrect email');
        }


}

module.exports = emailsProcessor;
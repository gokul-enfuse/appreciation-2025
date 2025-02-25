const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const Hogan =require('hogan.js')
const fs = require('fs');
const { dirname } = require("path");


const template = fs.readFileSync('./views/email.hjs', 'utf-8')  
const compiledTemplate = Hogan.compile(template);

// send mail
router.post("/api/register",  (req, res) => {
    const { name } = req.body;
    const { recipientName } = req.body;
    const { email } = req.body;
    const { message } = req.body;
    const { hashtags } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "appreciation@enfuse-solutions.com",
                pass: "qwrvakinpxpheapz"
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email, 
            subject: "I Appreciate You!!",
            html: compiledTemplate.render({name,recipientName, message, hashtags}),
            attachments: [
                {filename: 'enfuse-logo.png',
                 path: './views/enfuse-logo.png',
                cid:"enfuse-logo"
                },
                {filename: 'appreciation-logo.jpg',
                 path: './views/appreciation-logo.jpg',
                cid:"appreciation-logo"
                }

            ]

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


module.exports = router;
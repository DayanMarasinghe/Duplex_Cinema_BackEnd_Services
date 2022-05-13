const express = require('express')
const router = express.Router()
const SystemAdmin = require('../model/systemadmin')
const Movie = require('../model/movie')
const MovieAdmin = require('../model/movieadmin')
const bcrypt = require("bcrypt") //password handler
const JWT = require('jsonwebtoken')
const passwordReset = require('../model/passwordReset')
const { check, validationResult } = require('express-validator')
//const passwordReset = require('../model/passwordReset')
const { v4: uuidv4 } = require("uuid") //unique string
const nodemailer = require("nodemailer")
require("dotenv").config(); //env variables

//nodemailer configs
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
})

/**
 * @router - create system admin login details
 */
router.post('/', async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const admin = new SystemAdmin({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hash
        })

        admin.save().then(user => {
            console.log(user);
        })

    })

})


router.post('/signIn', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty inputs"
        })
    } else {
        SystemAdmin.find({ email }).then(data => {
            if (data.length) {
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        res.json({
                            status: "SUCCESS",
                            message: "sign in successful",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "invalid password entered"
                        })
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error comparing password"
                    })
                })
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid login"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "Error ocuured while checking exixting user"
            })
        })
    }
})

//password reset
router.post('/requestPasswordReset', (req, res) => {
    //getting request from the user with the email
    const { email, redirectUrl } = req.body

    //first check whther email exist in the db
    SystemAdmin.find({ email }).then((data) => {
        if (data.length) {
            //user exists
            sendResetEmail(data[0], redirectUrl, res);
        } else {
            res.json({
                status: "FAILED",
                message: "Error ocuured while checking exixting user"
            })
        }
    }).catch(error => {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "User Already Exists"
        })
    })
})

//send password reset email
const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4 + _id;

    //clear all the existing reset records
    passwordReset.deleteMany({ userId: _id }).then(result => {
        //reset records deleted successfully
        //sending the email
        const mailOption = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "password reset",
            html: `<p>We heard that yoy lost your password.</p>Dont worry , use this link to set up a new password</p> <p><a href=${redirectUrl + "/" + _id + "/", resetString}>here<a/> to procees </p>`,
        };

        //hash the reset string
        const saltRounds = 10;
        bcrypt.hash(resetString, saltRounds).then(hashedResetString => {
            //set values in reset passowrd collection
            const newPasswordReset = new passwordReset({
                userId: _id,
                resetString: hashedResetString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });

            newPasswordReset.save().then(() => {
                transporter.sendMail(mailOption).then(() => {
                    res.json({
                        status: "SUCCESS",
                        message: "email sent"
                    })
                }).catch(error => {
                    console.log(error);
                    res.json({
                        status: "PENDING",
                        message: "password reset email failed"
                    })
                })
            }).catch(err => {
                res.json({
                    status: "FAILED",
                    message: "could not save reset password data"
                })
            })

        }).catch(error => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Error occured while hashing"
            })
        })

    }).catch(error => {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Clearing exisiting password records failed"
        })
    })
}

/**
 * @router - get all the movies showing currently
 */
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
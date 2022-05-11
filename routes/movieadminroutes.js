const express = require('express')
const router = express.Router()
const MovieAdmin = require('../model/movieadmin')
const bcrypt = require("bcrypt")
const JWT = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

//verify token
function verifyToken(req , res , next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1]
    //checking if there is a token or not
    if(token == null){
      return res.sendStatus(401)
    }else{
        JWT.verify(token, 'secretkey', (err, authData)=>{
        if(err){
          res.sendStatus(403)
        }else{
          req.MovieAdmin = authData
          next()
        }
      })
    }
    }

/**
 * @router - get all the movie admins in the system
 */
router.get('/viewMovieAdmins', async (req, res) => {
    try {
        const movieAdmins = await MovieAdmin.find()
        res.json(movieAdmins)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


/**
* @router - register movieadmin to the system
*/

router.post('/addMovieAdmin', [
    check("email", "Invalid Email").isEmail(),
    check("password", "password must be at least 6 characters long").isLength({ min: 6 }),

    ],
    async (req, res) => {
        bcrypt.hash(req.body.password, 10).then(hash => {
            const movieadmin = new MovieAdmin({
                full_name: req.body.full_name,
                gender: req.body.email,
                address: req.body.address,
                nic: req.body.nic,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                confirm_password: req.body.confirm_password

            });

            //validate user inputs
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            MovieAdmin.findOne({ email: req.body.email }).then((user) => {
                if (user) {
                    res.send({ message: "Email aready in use" })
                } else {
                    movieadmin.save().then((user) => {
                        console.log(user)
                        res.send({ message: "Registration Success" })
                    }).catch((err) => {
                        res.send({ message: "user details missing" })
                    })
                }
            }).catch()

        })

})

router.put("/updateMovieAdmin" , (req , res)=>{

    MovieAdmin.findByIdAndUpdate({id : req.body.id},
      {
      full_name : req.body.full_name,
      gender : req.body.gender,
      address : req.body.address,  
      username: req.body.Username,
      email: req.body.Email,
      
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  
  
  })

/**
 * @router - delete movieAdmin
 */
router.delete('/deleteAdmin/:adminName', async (req, res) => {
    let movieadmin
    try {
        movieadmin = await MovieAdmin.find({ full_name: req.params.adminName })
        if (movieadmin == "") {
            return res.status(404).json({ message: 'Cannot find movie' })
        } else {
            await MovieAdmin.findOneAndDelete({ full_name: req.params.adminName })
            res.json({ message: 'Movie Admin is Deleted' })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router
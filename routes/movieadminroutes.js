const express = require('express')
const router = express.Router()
const MovieAdmin = require('../model/movieadmin')


/**
 * @router - get all the movie admins in the system
 */
 router.get('/viewMovieAdmins', async (req, res) => {
    try{
        const movieAdmins = await MovieAdmin.find()
        res.json(movieAdmins)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

/**
* @router - register movieadmin to the system
*/

router.post('/addMovieAdmin', async (req, res) => {
    const movieadmin = new MovieAdmin({
        full_name: req.body.full_name,
        gender: req.body.email,
        address: req.body.address,
        nic: req.body.nic,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password

    });
    try {
        const adm = await movieadmin.save()
        res.json(adm)
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
})


 router.put('/updatemovieAdminByName/:id', async (req, res) => {
    let movieadmin
    try {
        movieadmin = await MovieAdmin.find({ id: req.params.id })
        if (moviead == "") {
            return res.status(404).json({ message: 'Cannot find admin' })
        } else {
            //do the update
            let updateField
            let newValue
            const filter = { id: req.params.id}
            //check the field to be updated
            if (req.body.full_name != null) {
                newValue = req.body.full_name
                updateField = full_name
            }
            if (req.body.gender != null) {
                res.movie.gender = req.body.gender
            }
            if (req.body.address != null) {
                res.movie.address = req.body.address
            }
            if (req.body.nic != null) {
                res.movie.nic = req.body.nic
            }
            if (req.body.username != null) {
                res.movie.username = req.body.username
            }
            if (req.body.email != null) {
                res.movie.email = req.body.email
            }
            if (req.body.password != null) {
                res.movie.password = req.body.password
            }
            if (req.body.confirm_password != null) {
                res.movie.confirm_password = req.body.confirm_password
            }

            const update = {}
            await MovieAdmin.findOneAndUpdate({})
        }
    } catch (err) {
        return res.status(500).json({ err})
    }

    try {
        const updatedAdmin = await res.movie.save()
        res.json(updatedAdmin)
    } catch (err) {
        res.status(400).json({ updatedAdmin })
    }
})

/**
 * @router - delete movieAdmin
 */
 router.delete('/deleteAdmin/:adminName', async (req, res) => {
    let movieadmin
    try {
        movieadmin = await MovieAdmin.find({ full_name: req.params.adminName})
        if(movieadmin == ""){
            return res.status(404).json({ message: 'Cannot find movie' })
        }else{
            await MovieAdmin.findOneAndDelete({ full_name: req.params.adminName})
            res.json({ message: 'Movie Admin is Deleted' })
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router
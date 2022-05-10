const express = require('express')
const router = express.Router()
const SystemAdmin = require('../model/systemadmin')
const Movie = require('../model/movie')
const MovieAdmin = require('../model/movieadmin')


/**
 * @router - create system admin login details
 */
router.post('/', async (req, res) => {
    const admin = new SystemAdmin({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    try {
        const adm = await admin.save()
        res.json(adm)

    } catch (err) {
        res.send('err')
    }
})


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
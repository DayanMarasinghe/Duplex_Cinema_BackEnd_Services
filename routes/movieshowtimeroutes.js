const express = require('express')
const movieshowtime = require('../model/movieshowtime')
const router = express.Router()
const MovieShowTime = require('../model/movieshowtime')

/**
 * @router - add movie showtime
 */
router.post('/' , async(req, res) =>{
    const movieshowtime = new MovieShowTime({
        moviename: req.body.moviename,
        theater: req.body.theater,
        date: req.body.date,
        showtime: req.body.showtime,
        ticketprice: req.body.ticketprice
    })

    try{
        const newMovieshowtime = await movieshowtime.save()
        res.status(201).json(newMovieshowtime)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

/**
 * @router - get all the movie showtimes using the movie name
 */
router.get('/:moviename', async(req, res) => {
    let movieshowtime
    try {
        movieshowtime = await MovieShowTime.find({moviename:req.params.moviename})
        if (movieshowtime == "") {
            return res.status(404).json({ message: 'Cannot find movie' })
        } else {
            res.json(movieshowtime)
        }
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})

/**
 * @router - get all the movieshow times
 */
router.get('/', async (req, res) => {
    try {
        const showtimes = await MovieShowTime.find()
        res.json(showtimes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
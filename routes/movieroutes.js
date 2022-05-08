const express = require('express')
const router = express.Router()
const Movie = require('../model/movie')

/**
 * @function getMovie - checks if the relevent movie exists in the DB
 * @params req, res, next
 */
async function getMovie(req, res, next){
    let movie

    try{
        movie = await Movie.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({message: 'Cannot find movie'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }

    res.movie = movie

    //if specific movie is found relevent endpoint will be called
    next() 
}

/**
 * @router - get all the movies
 */
router.get('/', async (req, res) => {
    try{
        const movies = await Movie.find()
        res.json(movies)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

/**
 * @router - get one movie using movie id
 */
router.get('/:id', getMovie, (req, res) =>{
    res.json(res.movie)
})

/**
 * @router - create movie
 */
router.post('/', async(req, res) => {
    const movie = new Movie({
        name: req.body.name,
        description: req.body.description,
        theme: req.body.theme,
        director: req.body.director,
        imdb: req.body.imdb
    })

    try{
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

/**
 * @router - update/patch one movie using movie id
 */
router.patch('/:id', getMovie, async(req, res) => {
    //check the relevent feild to be updated
    if(req.body.name != null){
        res.movie.name = req.body.name
    }
    if (req.body.description != null) {
        res.movie.description = req.body.description
    }
    if (req.body.theme != null) {
        res.movie.theme = req.body.theme
    }
    if (req.body.director != null) {
        res.movie.director = req.body.director
    }
    if (req.body.imdb != null) {
        res.movie.imdb = req.body.imdb
    }

    try{
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch(err) {
        res.status(400).json({updatedMovie})
    }
})

/**
 * @router - delete one movie
 */
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove()
        res.json({message: 'Deleted movie'})
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})

/**
 * @router - update movie
 * @err - with the unchangable ID in mongoDB
 */
router.put('/:id', getMovie, async(req, res) => {
    const updated = new Movie({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        theme: req.body.theme,
        director: req.body.director,
        imdb: req.body.imdb
    })

    let movie

    try {
        movie = await Movie.findById(req.params.id)
        if (movie == null) {
            return res.status(404).json({ message: 'Cannot find movie' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.movie = movie

    try{
        const updatedMovie = await Movie.updateOne(movie, updated)
        res.json(updatedMovie)
    } catch(err){
        res.status(400).json({ message:err.message })
    }
})

//movie by name endpoints
/**
 * @router - get one movie using movie name
 */
router.get('/getonemovie/:moviename', async(req, res) => {
    let movie
    try {
        movie = await Movie.find({name:req.params.moviename})
        if (movie == "") {
            return res.status(404).json({ message: 'Cannot find movie' })
        }else{
            res.json(movie)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
})

/**
 * @router - update one movie using movie name 
 * PS - this has some issues
 */
router.put('/updatemoviebyname/:moviename', async (req, res) => {
    //check if the movie exists
    let movie
    try {
        movie = await Movie.find({ name: req.params.moviename })
        if (movie == "") {
            return res.status(404).json({ message: 'Cannot find movie' })
        } else {
            //do the update
            let updateField
            let newValue
            const filter = { name: req.params.moviename}
            //check the field to be updated
            if (req.body.name != null) {
                newValue = req.body.name
                updateField = name
            }
            if (req.body.description != null) {
                res.movie.description = req.body.description
            }
            if (req.body.theme != null) {
                res.movie.theme = req.body.theme
            }
            if (req.body.director != null) {
                res.movie.director = req.body.director
            }
            if (req.body.imdb != null) {
                res.movie.imdb = req.body.imdb
            }

            const update = {}
            await Movie.findOneAndUpdate({})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    //check the relevent feild to be updated
    

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({ updatedMovie })
    }
})

/**
 * @router - delete one movie
 */
router.delete('/deletemoviebyname/:moviename', async (req, res) => {
    let movie
    try {
        movie = await Movie.find({ name: req.params.moviename})
        if(movie == ""){
            return res.status(404).json({ message: 'Cannot find movie' })
        }else{
            await Movie.findOneAndDelete({ name: req.params.moviename})
            res.json({ message: 'Deleted movie' })
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
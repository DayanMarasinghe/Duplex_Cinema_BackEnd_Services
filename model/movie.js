const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    theme:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    imdb:{
        type: String,
        required: true
    }
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // }


})

module.exports = mongoose.model('Movie', movieSchema)
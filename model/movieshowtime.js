const mongoose = require('mongoose')

const movieshowtimeSchema = new mongoose.Schema({
    moviename:{
        type: String,
    },
    theater:{
        type:String,
    },
    date:{
        type: String,
    },
    showtime:{
        type:String
    }

})

module.exports = mongoose.model('MovieShowtime', movieshowtimeSchema)
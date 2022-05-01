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
    },
    bookedSeats:{
        type:Object
    }

})

module.exports = mongoose.model('MovieShowtime', movieshowtimeSchema)
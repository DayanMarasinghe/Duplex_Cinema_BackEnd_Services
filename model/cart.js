const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    moviename:{
        type: String,
        required: true
    },
    theatre:{
        type: String,
        required: true
    },
    seat:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cart', cartSchema)
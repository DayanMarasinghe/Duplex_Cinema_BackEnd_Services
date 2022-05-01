const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
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
    tiime:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cart', cartSchema)
const mongoose = require('mongoose')

const movieadminSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confirm_password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('MovieAdmin', movieadminSchema)
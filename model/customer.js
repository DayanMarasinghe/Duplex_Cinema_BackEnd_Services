const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    cart:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('Customer', customerSchema)
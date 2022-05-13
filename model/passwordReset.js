const mongoose = require('mongoose')

const passwordResetSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },

    resetString : {
        type : String,
        required: true
    },

    createdAt:{
        type: Date,
        required: true
    },
    
    expiresAt:{
        type:Date,
        required: true
    },

})

module.exports = mongoose.model('PasswordReset', passwordResetSchema)
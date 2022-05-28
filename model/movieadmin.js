const mongoose = require('mongoose')
const bcrypt = require("bcrypt") 

const movieadminSchema = new mongoose.Schema({
    full_name: {
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

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

})

movieadminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  movieadminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model('MovieAdmin', movieadminSchema)
const express = require('express')
const router = express.Router()
const Customer = require('../model/customer')

//sample for testing server
router.get('/', (req, res) => {
    res.send('I am working fine bitches')
})

module.exports = router
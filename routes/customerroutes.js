const express = require('express')
const router = express.Router()
const Customer = require('../model/customer')

router.post('/',async(req,res) => {
    const customer = new Customer({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        cart: req.body.cart
    })

    try{
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router
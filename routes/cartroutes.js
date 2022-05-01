const express = require('express')
const router = express.Router()
const Customer = require('../model/cart')

router.post('/',async(req,res) => {
    const cart = new Cart({
        moviename: req.body.moviename,
        theatre: req.body.theatre,
        seat: req.body.seat,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    })

    try{
        const newCart = await cart.save()
        res.status(201).json(newCart)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router
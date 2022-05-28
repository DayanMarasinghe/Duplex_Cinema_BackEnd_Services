const express = require('express')
const router = express.Router()
const Cart = require('../model/cart')


router.post('/',async(req,res) => {
    const cart = new Cart({
        userID: req.body.userID,
        moviename: req.body.moviename,
        theatre: req.body.theatre,
        seat: req.body.seat,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        payment: "Pending"
    })    

    try{
        const newCart = await cart.save()
        res.status(201).json(newCart)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.get('/getcart/:user', async(req, res) => {
    let cart
    try {
        cart = await Cart.find({userID:req.params.user,payment:"Pending"})
        if (cart == "") {
            return res.status(404).json({ message: 'Empty Cart' })
        }else{
            res.json(cart)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
})

router.delete('/deleteitem/:id', async (req, res) => {
    let cart
    try {
        cart = await Cart.find({ _id: req.params.id})
        if(cart == ""){
            return res.status(404).json({ message: 'Cart empty' })
        }else{
            await Cart.findByIdAndDelete({ _id: req.params.id})
            res.json({ message: 'Removed item' })
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router
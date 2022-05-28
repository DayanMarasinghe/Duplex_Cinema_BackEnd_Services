const express = require('express')
const router = express.Router()
const Customer = require('../model/customer')

router.post('/',async(req,res) => {
    const customer = new Customer({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
    })

    try{
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post('/login',async(req,res) => {
    let cuspw = req.body.password

    try {
         Customer.find({username:req.body.username}).then(data => {
            if(data.length){
                const dbpw = data[0].password;
                const id = data[0]._id;
                if(dbpw === cuspw){
                    res.status(200).json(id)
                }else{
                    res.status(400).json({message: 'invalid'})
                }
            }
    })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


module.exports = router
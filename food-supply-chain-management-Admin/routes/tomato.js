const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const Tomato = require("../models/Tomato")
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/tomato', (req, res) =>
    Tomato.find({})
        .then((data)=>{
            console.log(data);
            return res.json(data);
        })
);

router.get("/add-data",ensureAuthenticated,(req,res)=>{
    return res.render("add-tomato",{user:req.user});
})


router.post('/add-data',ensureAuthenticated,(req,res)=>{
    const { price, date } = req.body;
    Tomato.create({price:price,date:date})
        .then((data)=>{
            console.log(data);
            return res.redirect("/dashboard")
        })
})



module.exports = router;

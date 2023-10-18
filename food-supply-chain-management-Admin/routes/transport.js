const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const Transport = require("../models/Transport")
const TraPorter = require("../models/Transporter")


router.get("/transport",ensureAuthenticated , (req,res)=>{
    try{
        Transport.find({}).populate('transporterId', 'name contact').populate('bookedByUserId', '_id email')
            .then((data)=>{
                return res.render("transportation",{user:req.user,transports:data})
            })
    }
    catch(err){
        console.log(err);
    }
})







module.exports = router;
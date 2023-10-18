const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Tomato = require('../models/Tomato');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{

  Tomato.find({})
    .then((data)=>{
      console.log(data);
      return res.render('dashboard', {user: req.user, data:data})
    })
    .catch((err)=>{
      console.log(err);
    })
  }
);






module.exports = router;

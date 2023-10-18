const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');



exports.postLogin = (req,res,next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
}

exports.postRegister = (req,res,next) => {

    const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          loggedIn: res.locals.loggedIn
        });
      } 
      else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                passport.authenticate('local', {
                  successRedirect: '/dashboard',
                  failureRedirect: '/users/login',
                  failureFlash: true
                })(req, res, next);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
}

exports.getEditProfile = (req,res)=>{
  const _id = req.user.id;
  User.find({_id})
    .then((data)=>{
      return res.render("profile",{data:data[0],user:req.user})
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  exports.postEditProfile = async (req, res) => {
    const updatedData = req.body;
    const userId = req.user._id;
    try{
      const data = await User.findByIdAndUpdate(userId, updatedData, { new: true })
      res.redirect('/users/getEditProfile');
    }
    catch(error){
      console.log(error);
    }
  };


  
exports.getLogout = (req,res) => {
    req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
}
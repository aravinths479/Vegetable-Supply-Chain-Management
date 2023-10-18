const express = require('express');
const router = express.Router();

const userController = require("../controller/userController")


const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', userController.postRegister);

// Login
router.post('/login', userController.postLogin);

router.get('/getEditProfile',ensureAuthenticated,userController.getEditProfile)


router.post('/postEditProfile',ensureAuthenticated,userController.postEditProfile)

// Logout
router.get('/logout', userController.getLogout);

module.exports = router;

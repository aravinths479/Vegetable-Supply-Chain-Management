const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Buy = require("../models/Buy"); 
const Sell = require("../models/Sell"); 
const Trade = require("../models/Trade")

router.get("/myRequests", ensureAuthenticated, async (req, res) => {
  try {
    const buyData = await Trade.find({trade:"Buy", userId: req.user._id });
    const sellData = await Trade.find({trade:"Sell", userId: req.user._id });

    return res.render("myRequests", { user: req.user, buyData, sellData }); 
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

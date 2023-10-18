const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const Trade = require("../models/Trade"); // Assuming you have a 'Trade' model

router.get("/getTrade", (req, res) => {
  res.render("trade", { user: req.user });
});

router.post("/buy", ensureAuthenticated, async (req, res) => {
  try {
    const { quantity, location } = req.body;

    // Create a new Buy Trade document
    const newTrade = new Trade({
      userId: req.user._id,
      name: req.user.name,
      quantity,
      location,
      trade: 'Buy', // Specify the trade type as 'Buy'
    });

    // Save the Buy Trade document to the database
    await newTrade.save();

    // Redirect the user to the trade page after buying
    return res.redirect("/trade/getTrade");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/sell", ensureAuthenticated, async (req, res) => {
  try {
    const { quantity, location, pricePerKg } = req.body;

    // Create a new Sell Trade document
    const newTrade = new Trade({
      userId: req.user._id,
      name: req.user.name,
      quantity,
      location,
      pricePerKg,
      trade: 'Sell', // Specify the trade type as 'Sell'
    });

    // Save the Sell Trade document to the database
    await newTrade.save();

    // Redirect the user to the trade page after selling
    return res.redirect("/trade/getTrade");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

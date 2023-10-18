const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Sell = require('../models/Sell');
const Buy = require('../models/Buy');
const Trade = require("../models/Trade")
const User = require('../models/User'); // Import the User model

// Distribution Algorithm
async function distributeTomatoes(sellers, buyers) {
  const allocations = [];

  // Fetch user information for sellers and buyers
  const sellerUsers = await User.find({ _id: { $in: sellers.map((seller) => seller.userId) } });
  const buyerUsers = await User.find({ _id: { $in: buyers.map((buyer) => buyer.userId) } });

  buyers.forEach((buyer) => {
    sellers.forEach((seller) => {
      if (seller.quantity > 0 && seller.location !== buyer.location) {
        const allocatedTomatoes = Math.min(seller.quantity, buyer.quantity);
        if (allocatedTomatoes > 0) {
          const sellerUser = sellerUsers.find((user) => user._id.equals(seller.userId));
          const buyerUser = buyerUsers.find((user) => user._id.equals(buyer.userId));

          allocations.push({
            sellerUserId: seller.userId,
            sellerName: seller.name,
            sellerEmail: sellerUser.email,
            sellerLocation : seller.location,

            buyerUserId: buyer.userId,
            buyerName: buyer.name,
            buyerEmail: buyerUser.email,
            buyerLocation : buyer.location,
            
            allocatedTomatoes,
          });

          // Update quantity for the seller and reduce quantity for the buyer
          seller.quantity -= allocatedTomatoes;
          buyer.quantity -= allocatedTomatoes;
        }
      }
    });
  });

  console.log(allocations);
  return allocations;
}

router.get('/distribute', ensureAuthenticated, async (req, res) => {
  try {
    // Get the start and end of today
    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Set time to the beginning of the day (midnight)
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1); // Set time to the beginning of the next day (midnight)

    // const sellers = await Sell.find({timestamp: {
    //   $gte: today, // Greater than or equal to the start of today
    //   $lt: tomorrow, // Less than the start of tomorrow
    // },});
    // const buyers = await Buy.find({timestamp: {
    //   $gte: today, // Greater than or equal to the start of today
    //   $lt: tomorrow, // Less than the start of tomorrow
    // },});
    const sellers = await Trade.find({trade:"Sell"});
    const buyers = await Trade.find({trade:"Buy"});

    // Run the distribution algorithm
    // console.log(sellers+buyers);
    const tomatoAllocations = await distributeTomatoes(sellers, buyers);

    return res.render('distribution', { user: req.user, tomatoAllocations });
    
  } 
  catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});




module.exports = router;

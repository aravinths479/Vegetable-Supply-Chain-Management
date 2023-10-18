const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const Sell = require("../models/Sell");
const Buy = require("../models/Buy");
const Trade = require("../models/Trade");
const User = require("../models/User"); // Import the User model

// Distribution Algorithm
// async function distributeTomatoes(sellers, buyers) {
//   const allocations = [];

//   // Fetch user information for sellers and buyers
//   const sellerUsers = await User.find({ _id: { $in: sellers.map((seller) => seller.userId) } });
//   const buyerUsers = await User.find({ _id: { $in: buyers.map((buyer) => buyer.userId) } });

//   buyers.forEach((buyer) => {
//     sellers.forEach((seller) => {
//       if (seller.quantity > 0 && seller.location !== buyer.location) {
//         const allocatedTomatoes = Math.min(seller.quantity, buyer.quantity);
//         if (allocatedTomatoes > 0) {
//           const sellerUser = sellerUsers.find((user) => user._id.equals(seller.userId));
//           const buyerUser = buyerUsers.find((user) => user._id.equals(buyer.userId));

//           allocations.push({
//             sellerUserId: seller.userId,
//             sellerName: seller.name,
//             sellerEmail: sellerUser.email,
//             sellerLocation : seller.location,

//             buyerUserId: buyer.userId,
//             buyerName: buyer.name,
//             buyerEmail: buyerUser.email,
//             buyerLocation : buyer.location,

//             allocatedTomatoes,
//           });

//           // Update quantity for the seller and reduce quantity for the buyer
//           seller.quantity -= allocatedTomatoes;
//           buyer.quantity -= allocatedTomatoes;
//         }
//       }
//     });
//   });

//   console.log(allocations);
//   return allocations;
// }
async function distributeTomatoes(sellers, buyers) {
  const allocations = [];

  // Sort sellers and buyers based on their preferences, e.g., by location or quantity
  sellers.sort((a, b) => a.location.localeCompare(b.location)); // Sort by location
  buyers.sort((a, b) => b.quantity - a.quantity); // Sort by quantity in descending order

  while (buyers.length > 0 && sellers.length > 0) {
    const buyer = buyers[0];
    const seller = sellers[0];

    if (seller.quantity > 0 && seller.location !== buyer.location) {
      const allocatedTomatoes = Math.min(seller.quantity, buyer.quantity);

      if (allocatedTomatoes > 0) {
        allocations.push({
          sellerUserId: seller.userId,
          sellerName: seller.name,
          //sellerEmail: sellerUser.email,
          sellerLocation: seller.location,

          buyerUserId: buyer.userId,
          buyerName: buyer.name,
          //buyerEmail: buyerUser.email,
          buyerLocation: buyer.location,

          allocatedTomatoes,
        });

        // Update quantity for the seller and reduce quantity for the buyer
        seller.quantity -= allocatedTomatoes;
        buyer.quantity -= allocatedTomatoes;
      }
    }

    // Remove the seller from the list if their quantity is exhausted
    if (seller.quantity === 0) {
      sellers.shift();
    }

    // Remove the buyer from the list if their quantity is exhausted
    if (buyer.quantity === 0) {
      buyers.shift();
    }
  }

  console.log(allocations);
  return allocations;
}

router.get("/distribute", ensureAuthenticated, async (req, res) => {
  try {
    // Get the start and end of today

    const sellers = await Trade.find({ trade: "Sell" });
    const buyers = await Trade.find({ trade: "Buy" });

    const tomatoAllocations = await distributeTomatoes(sellers, buyers);
    // console.log(tomatoAllocations);
    const sell = tomatoAllocations.filter((allocation) =>
      allocation.sellerUserId.equals(req.user._id)
    );
    const buy = tomatoAllocations.filter((allocation) =>
      allocation.buyerUserId.equals(req.user._id)
    );
    console.log(sell);
    console.log(buy);

    return res.render("myDistributions", { user: req.user, buy, sell });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/user/:id", ensureAuthenticated, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  await User.find({_id})
    .then((data)=>{
      console.log(data);
      return res.render("userInfo",{data:data[0],user:req.user})
    })
});

module.exports = router;

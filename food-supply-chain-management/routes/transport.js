const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth'); 

const Transport = require('../models/Transport');
const Transporter = require('../models/Transporter');
const User = require('../models/User');



// get transporter details

router.get("/getTransport/:id", ensureAuthenticated, async (req,res)=>{
  try{
      const _id = req.params.id;
      const transporterData = await Transporter.find({_id})
      console.log(transporterData);
      return res.render("transporterDetails",{user:req.user, transporterData})
  }
  catch(error){
    console.log(error);
  }
})

// Route to display a form for booking transport
router.get('/book', ensureAuthenticated, async (req, res) => {
  try {
    const transporters = await Transporter.find({});
    // You may want to fetch available transporters to display in the form

    return res.render('transportForm', {
      user: req.user,
      transporters,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

// Route to handle the submission of a transport booking form
router.post('/book', ensureAuthenticated, async (req, res) => {
  try {
    const {
      sourceLocation,
      destinationLocation,
      tomatoQuantity,
      transporterId,
      departureTime,
      arrivalTime,
      notes,
    } = req.body;

    // Create a new transport booking
    const transport = new Transport({
      sourceLocation,
      destinationLocation,
      tomatoQuantity,
      transporterId,
      bookedByUserId: req.user._id, // Set the user who booked the transport
      departureTime,
      arrivalTime,
      notes,
    });

    // Save the transport booking to the database
    await transport.save();
    req.flash("success_msg","Transport Booked Sucessfully")
    return res.redirect('/transport/book'); // Redirect to a list of bookings or other appropriate page
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

// Route to view all transport bookings
router.get('/bookings', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch all transport bookings and populate related data (e.g., transporter and user)
    const bookings = await Transport.find({})
      .populate('transporterId', 'name contact')
      .populate('bookedByUserId', 'name email');

    return res.render('transport/bookings', {
      user: req.user,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;

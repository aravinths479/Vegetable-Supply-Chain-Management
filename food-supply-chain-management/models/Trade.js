const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the buyer
    required: true,
  },
  name: String,
  quantity: {
    type: Number,
    required: true,
  },
  trade : {
    type: String,
    enum: ['Buy','Sell'],
    default: 'Buy',
  },
  pricePerKg: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Record the date and time of the buying activity
  },
});

module.exports = mongoose.model('Trade', buySchema);
        
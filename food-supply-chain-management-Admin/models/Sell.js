const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the seller
    required: true,
  },
  name: String,
  quantity: {
    type: Number,
    required: true,
  },
  pricePerKg: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Record the date and time of the selling activity
  },
});

module.exports = mongoose.model('Sell', sellSchema);

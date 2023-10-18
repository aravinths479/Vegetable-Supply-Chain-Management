const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Buyer', 'Seller', 'Both'], // A user can be a Buyer, Seller, or Both
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  contact:{
    type:Number,
    required:false
  }
  // Add other user-related fields as needed
});

module.exports = mongoose.model('User', userSchema);

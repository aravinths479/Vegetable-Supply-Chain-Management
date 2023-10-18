const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  vehicleInfo: {
    vehicleType: String,
    registrationNumber: String,
  },

});

module.exports = mongoose.model('Transporter', transporterSchema);

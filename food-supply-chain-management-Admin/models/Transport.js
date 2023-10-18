const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  sourceLocation: {
    type: String,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  tomatoQuantity: {
    type: Number,
    required: true,
  },
  transporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transporter', // Reference to the Transporter model
    required: true,
  },
  bookedByUserId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Transit', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  estimatedArrivalTime: {
    type: Date, // If you want to provide an estimated arrival time
  },
  actualDepartureTime: {
    type: Date, // When the transport actually departs
  },
  notes: {
    type: String, // Additional notes or comments
  },
  // Add other relevant fields for the transport record
});

module.exports = mongoose.model('Transport', transportSchema);

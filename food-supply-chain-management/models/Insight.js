// insight.js
const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title:String,
  content: String,
  image: String, // Add a field to store the image file path
});

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;

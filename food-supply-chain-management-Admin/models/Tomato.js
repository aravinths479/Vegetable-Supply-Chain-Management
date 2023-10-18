const mongoose = require("mongoose")

const TomatoSchema = new mongoose.Schema({
    price : {
        required : true,
        type : Number
    },
    date : {
        required : true,
        type : Date
    }
});

TomatoSchema.index({ date: 1 });

module.exports = mongoose.model('Tomato', TomatoSchema);
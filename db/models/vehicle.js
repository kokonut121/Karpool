const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    color: String,
    lpNum: String,
    numSeats: Number,
    owner: [{
        type: mongoose.Schema.Types.Object,
        ref: 'User'
    }],
});

module.exports = { vehicleSchema };
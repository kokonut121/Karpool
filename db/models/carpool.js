const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
    driver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    vehicle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    passengers: Array,
    date: {
        day: Number,
        month: Number,
        year: Number
    },
    description: String,
    start: String,
    end: String,
});

module.exports = { carpoolSchema };
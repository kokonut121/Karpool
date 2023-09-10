const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
    driver: [{
        type: mongoose.Schema.Types.Object,
        ref: 'User'
    }],
    vehicle: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Vehicle'
    }],
    passengers: {
        type: Array,
        default: []
    },
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
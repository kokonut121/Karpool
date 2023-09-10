const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    yob: Number,
    credit: {
        type: Number,
        default: 3
    },
    password: String,
    pfp: Object,
    location: String,
    bio: String,
    vehicle: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Vehicle'
    }]
});

module.exports = { userSchema };
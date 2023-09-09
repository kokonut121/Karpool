const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    yob: Number,
    credit: Number,
    password: String,
    pfp: Object,
    city: String,
    state: String,
    bio: String,
    vehicle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
});

module.exports = { userSchema };
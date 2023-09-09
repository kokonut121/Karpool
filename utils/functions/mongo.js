const mongoose = require('mongoose');
const InitiateMongoServer = require('../../db/db');

const { userSchema } = require('../../db/models/user');
const { vehicleSchema } = require('../../db/models/vehicle');

InitiateMongoServer();
const db = mongoose.connection;
const PORT = 3000;
const User = db.model('User', userSchema, 'users');
const Vehicle = db.model('Vehicle', vehicleSchema, 'vehicles');

module.exports = { 
    db: db,
    PORT: PORT,
    User,
    Vehicle
 };
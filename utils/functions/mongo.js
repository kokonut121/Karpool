const mongoose = require('mongoose');
const InitiateMongoServer = require('../../db/db');

const { userSchema } = require('../../db/models/user');
const { vehicleSchema } = require('../../db/models/vehicle');
const { carpoolSchema } = require('../../db/models/carpool');

InitiateMongoServer();
const db = mongoose.connection;
const PORT = 3000;
const User = db.model('User', userSchema, 'users');
const Vehicle = db.model('Vehicle', vehicleSchema, 'vehicles');
const Carpool = db.model('Carpool', carpoolSchema, 'carpools');

module.exports = { 
    db: db,
    PORT: PORT,
    User,
    Vehicle,
    Carpool
 };
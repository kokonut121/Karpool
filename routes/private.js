const mongoose = require('mongoose');
const locations = ['Seattle', 'Tacoma', 'Bellevue', 'Kent', 'Everett'];

module.exports = (app, mongo) => {
    app.all(/^(\/private).*$/, (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    })

    app.get('/private/homepage', async (req, res) => {
        const carpools = await mongo.db.collection('carpools').find().toArray();
        res.render('../views/private/homepage.ejs', {
            user: req.user,
            carpools: carpools
        });
    });

    app.get('/private/registerVehicle', (req, res) => {
        res.render('../views/private/registerVehicle.ejs');
    });

    app.get('/private/findCarpool/:destination', async (req, res) => {
        const carpools = await mongo.db.collection('carpools').find({ $and: [{ end: req.params.destination }, { start: req.user.location }] }).toArray();
        res.render('../views/private/findCarpool.ejs', {
            destination: req.params.destination,
            carpools: carpools
        })
    });

    app.get('/private/allCarpools', async (req, res) => {
        const carpools = await mongo.db.collection('carpools').find().toArray();
        res.render('../views/private/allCarpools.ejs', {
            carpools: carpools,
            locations: locations,
        })
    });

    app.get('/private/createCarpool', (req, res) => {
        res.render('../views/private/createCarpool.ejs', {
            locations: locations
        });
    });

    app.post('/private/create', (req, res) => {
        if (!req.user.vehicle) {
            res.redirect('/private/homepage');
            return;
        }

        const newCarpool = new mongo.Carpool({
            start: req.body.start,
            end: req.body.end,
            date: {
                day: req.body.day,
                month: req.body.month,
                year: req.body.year
            },
            description: req.body.description,
            driver: req.user,
            vehicle: req.user.vehicle
        });

        newCarpool.save().then((carpool) => {
            console.log(carpool);
        });
        res.redirect('/private/homepage');
    });

    app.get('/private/joinCarpool/:id', async (req, res) => {
        const carpool = await mongo.db.collection('carpools').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!carpool || carpool.vehicle[0].numSeats - carpool.passengers.length <= 0) {
            res.redirect('/private/allCarpools');
        } else {
            carpool.passengers.push(req.user.name);
            mongo.db.collection('carpools').updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, {
                $set: {
                    passengers: carpool.passengers
                }
            });
            console.log(carpool);
            console.log('passenger added!');
            res.redirect('/private/homepage');
        }
    });

    app.post('/private/vehicleRegistration', (req, res, next) => {
        req.body.make = req.body.make.toUpperCase();
        req.body.model = req.body.model.toUpperCase();
        req.body.color = req.body.color.toUpperCase();
        req.body.lpNum = req.body.lpNum.toUpperCase();
        let hasProblem = false;

        if (req.body.make.length < 1) {
            //error flash
            hasProblem = true;
        }
        if (req.body.model.length < 1) {
            hasProblem = true;
        }
        if (req.body.color.length < 1) {
            hasProblem = true;
        }
        if (req.body.lpNum.length < 1) {
            hasProblem = true;
        }

        if (hasProblem) {
            res.redirect('/private/registerVehicle');
            return;
        }

        const newVehicle = new mongo.Vehicle({
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            lpNum: req.body.lpNum,
            numSeats: req.body.numSeats,
            owner: req.user
        });
        
        mongo.db.collection('vehicles').findOne({ lpNum: req.body.lpNum }).then((vehicle) => {
            if (vehicle) {
                console.log('used');
                res.redirect('/private/registerVehicle');
                return;
            } else {
                console.log('new vehicle');
                mongo.db.collection('users').updateOne({ _id: req.user._id },
                    { $set:{
                        vehicle: newVehicle
                    }});
                newVehicle.save().then((vehicle) => {
                    console.log(vehicle);
                });
            }
            res.redirect('/private/homepage');
        });
    });
}
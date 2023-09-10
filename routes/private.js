const mongoose = require('mongoose');

module.exports = (app, mongo) => {
    app.all(/^(\/private).*$/, (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    })

    app.get('/private/homepage', async (req, res) => {
        res.render('../views/private/homepage.ejs', {
            user: req.user
        });
    });

    app.get('/private/registerVehicle', (req, res) => {
        res.render('../views/private/registerVehicle.ejs');
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
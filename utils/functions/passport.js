const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./mongo.js');

module.exports = (app, mongo) => {
    passport.use(
        new LocalStrategy(
            (req, username, password, cb) => {
                username = username.toLowerCase();
                mongo.User.find({$and: [{ username: username }, { password: password }]})
                    .then((user) => {
                        if (!user[0]) {
                            return cb(null, false);
                        } else {
                            return cb(null, user[0]);
                        }
                    })
                    .catch((err) => {
                        cb(err);
                    })
            }
        )
    )
}
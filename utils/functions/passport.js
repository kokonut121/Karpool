const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./mongo.js');

module.exports = (app, mongo) => {
    passport.use(
        new LocalStrategy(
            (req, username, password, cb) => {
                username = username.toLowerCase();
                mongo.User.find({ username: username })
            }
        )
    )
}
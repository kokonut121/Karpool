const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./mongo.js');
const bodyParser = require('body-parser');

module.exports = (app, mongo) => {
    passport.use('local',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'username',
                passwordField: 'password',
            },
            (req, username, password, done) => {
                username = username.toLowerCase();
                mongo.User.find({$and: [{ username: username }, { password: password }]})
                    .then((user) => {
                        if (!user[0]) {
                            return done(null, false);
                        } else {
                            return done(null, user[0]);
                        }
                    })
                    .catch((err) => {
                        done(err);
                    })
            }
        )
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
        const user = await mongo.User.findById(id);
        done(null, user);
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());
};
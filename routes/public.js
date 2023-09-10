const passport = require('passport');
const locations = ['Seattle', 'Tacoma', 'Bellevue', 'Kent', 'Everett'];
const bodyParser = require('body-parser');

module.exports = (app, mongo) => {
    app.get('/', async (req, res) => {
        /*if (req.isAuthenticated()) {
            res.redirect('/homepage');
        } else {
            res.render('../views/public/homepage.ejs', {
                pageName: 'Karpool'
            });
        }*/

        res.render('../views/public/homepage.ejs', {
            pageName: 'Karpool'
        });
    });

    app.get('/signin', (req, res) => {
        res.render('../views/public/signin.ejs', {
            pageName: 'Sign In'
        });
    });

    app.get('/signup', (req, res) => {
        res.render('../views/public/signup.ejs', {
            pageName: 'Sign Up',
            locations: locations
        });
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/signin',
            successRedirect: '/homepage'
        }),
        (req, res, next) => {
            console.log('hi');
        }
    );

    app.post('/register', bodyParser.urlencoded(), (req, res, next) => {
        req.body.username = req.body.username.toLowerCase();
        req.body.email = req.body.email.toLowerCase();
        let hasProblem = false;

        if (req.body.username.length < 1) {
            //make an error flash
            hasProblem = true;
        }
        if (req.body.password.length < 1) {
            hasProblem = true;
        }
        if (req.body.password != req.body.passwordConfirmation) {
            hasProblem = true;
        }

        if (hasProblem) {
            res.redirect('signup');
            return;
        }

        const newUser = new mongo.User({
            username: req.body.username,
            email: req.body.username,
            password: req.body.password,
            name: req.body.name,
            yob: req.body.yob,
            location: req.body.location,
            bio: req.body.bio
        });

        mongo.db.collection('users').findOne({
            $and: [{ username: req.body.username }, { email: req.body.email }]
        }).then((user) => {
            if (user) {
                console.log('used');
                res.redirect('/signup');
                return;
            } else {
                console.log('new user!');
                newUser.save().then((user) => {
                    console.log(user);
                });
            }
            res.redirect('/signin');
        });
    });
};

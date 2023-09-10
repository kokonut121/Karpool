const passport = require('passport');
const locations = ['Seattle', 'Tacoma', 'Bellevue', 'Kent', 'Everett'];

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

    app.post('/register', (req, res) => {
        
    });
};

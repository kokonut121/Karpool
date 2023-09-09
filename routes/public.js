const passport = require('passport');

module.exports = (app, mongo) => {
    app.get('/', async (req, res) => {
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
            pageName: 'Sign Up'
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
    )
};

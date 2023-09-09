
module.exports = (app, mongo) => {
    app.get('/', async (req, res) => {
        res.render('../views/public/homepage.ejs');
    });

    app.get('/signin', (req, res) => {
        res.render('../views/public/signin.ejs');
    });

    app.get('/signup', (req, res) => {
        res.render('../views/public/signup.ejs');
    });
};

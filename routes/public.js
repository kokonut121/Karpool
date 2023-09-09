
module.exports = (app, mongo) => {
    app.get('/', async (req, res) => {
        res.render('../views/public/hompage.ejs');
    });

    app.get('/signin', (req, res) => {
        res.render('../views/public/signin.ejs');
    });
}

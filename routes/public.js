
module.exports = (app, mongo) => {
    app.get('/', async (req, res) => {
        res.render('../views/public/hompage.ejs');
    })
}

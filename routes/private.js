const mongoose = require('mongoose');

module.exports = (app, mongo) => {
    app.get('/homepage', async (req, res) => {
        res.render('../views/private/homepage.ejs', {
            user: req.user
        });
    });
}
// MODULE IMPORTS
const express = require('express');
const http = require('http');
const https = require('https');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash-messages');

// START EXPRESS SERVER
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'devsecret';

const mongo = require('./utils/functions/mongo.js');

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

require('./utils/functions/passport.js')(app, mongo);

app.use(flash());

require("./routes/public.js")(app, mongo);
require("./routes/private.js")(app, mongo);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.log('yes');
    return next(err);
  }
  console.error(err.stack);
  res.redirect('/');
});

http.createServer(app).listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});

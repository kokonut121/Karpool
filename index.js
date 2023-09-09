// MODULE IMPORTS
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const flash = require('express-flash-messages');
const session = require('express-session');
const http = require('http');
const https = require('https');
const enforce = require('express-sslify');

// START EXPRESS SERVER
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'devsecret';



// WILDCARD FOR ALL OTHER ROUTES
app.get('*', (req, res) => {
  req.flash(
    'errorFlash',
    "Error 404: File Not Found. That page doesn't exist."
  );
  res.redirect('/');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.log('yes');
    return next(err);
  }
  console.error(err.stack);
  req.flash(
    'errorFlash',
    'Error 500: Internal Server Error. Something broke on our end, sorry about that.'
  );
  res.redirect('/');
});

// START http AND https SERVERS
http.createServer(app).listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});

// MODULE IMPORTS
const express = require('express');
const http = require('http');
const https = require('https');

// START EXPRESS SERVER
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'devsecret';

const mongo = require('./utils/functions/mongo.js');

require("./routes/public.js")(app, mongo);

// WILDCARD FOR ALL OTHER ROUTES
app.get('*', (req, res) => {
  /*req.flash(
    'errorFlash',
    "Error 404: File Not Found. That page doesn't exist."
  );*/
  res.redirect('/');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.log('yes');
    return next(err);
  }
  console.error(err.stack);
  /*req.flash(
    'errorFlash',
    'Error 500: Internal Server Error. Something broke on our end, sorry about that.'
  );*/
  res.redirect('/');
});

// START http AND https SERVERS
http.createServer(app).listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});

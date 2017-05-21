var express = require('express');
var fs = require('fs'), path = require('path'), bodyParser = require('body-parser');
var passport = require('passport'), Strategy = require('passport-http-bearer').Strategy, https = require('https');
var db = require('./db');
var rfs = require('rotating-file-stream'), accessLogger = require('morgan'), winston = require('winston');

passport.use(new Strategy(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
}));

var app = express();

// ## configure
app.Auth = passport.authenticate('bearer', { session: false });
app.baseUrl = 'https://localhost:3443';
 // log access
var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // ensure log directory exists
var accessLogStream = rfs('access.log', { // create a rotating write stream
  size:     '10M', // rotate every 10 MB written
  compress: 'gzip', // compress rotated files
  path: logDirectory
});
accessLogger.token('remote-user', (req) => {
  return req.user.username; // ignore basic HTTP auth user replace with token owner
});
app.accessLogger = accessLogger;
app.use(accessLogger('combined', {stream: accessLogStream})); // morgan likes to log to a file
 // log errors
var errorLogger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info', //  error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
            filename: './log/error.log',
            handleExceptions: true,
            json: false,
            maxsize: 10485760, //10MB
            zippedArchive: true,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'info', //  error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
module.exports = errorLogger;
module.exports.stream = {
    write: function(message, encoding){
        errorLogger.info(message);
    }
};
app.errorLogger = errorLogger;

// route
require('./routes')(app,express);

// ## routes
app.get('/user', app.Auth,
  function(req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
});

// ## listen 
https.createServer({ key: fs.readFileSync('./https/key.pem'), cert: fs.readFileSync('./https/cert.pem') }, app)
    .listen(3443, function () {
        errorLogger.info('Secure Server listening on port 3443');
});

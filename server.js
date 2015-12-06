// setup
// import all dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/mongodb.js');

// configuration
mongoose.connect(configDB.url); // connect to database
require('./config/passport.js')(passport);

// setup express applications
app.use(express.static('public')); // set static files directory
app.use(morgan('dev')); // log to console
app.use(cookieParser()); // read cookies 
app.use(bodyParser.urlencoded({ extended : false })); // get infomations from html form
app.use(bodyParser.json());

app.set('views', './views'); // set template files directory
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret : 'keyboard monkey', resave : true, saveUninitialized: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // flash message stored in session

// routes
require('./routes.js')(app, passport); // load routes and pass in app and passport

// running server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
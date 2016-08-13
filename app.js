var express = require('express'),
    expressValidator = require('express-validator'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    app = express(),
    router = express.Router();      

var User = require("./models/User"),
    Ticket = require("./models/Ticket");

// DATABASE RELATED
mongoose.connect('mongodb://localhost/tickets');
// mongoose.connect('mongodb://rma:rma@ds145245.mlab.com:45245/redmart');


// -- Application Configuration -----------------------------------------------
app.set('name', 'Redmart Ticket Tracing');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/templates', express.static(__dirname + '/templates'));

// ROUTES ---------------------------------------------------------------------

var routes = require('./routes/index');
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

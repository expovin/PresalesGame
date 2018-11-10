var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var presalesRoute = require('./routes/presales');
var opportunitiesRoute = require('./routes/opportunities');
var companiesRoute = require('./routes/company');
var marketRoute = require('./routes/market');
var gameRoute = require('./routes/game');
var qix = require('./routes/QIX');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//

let staticRoot = path.resolve(__dirname, '..', 'dist');

app.use(express.static(staticRoot));

app.get('/*', function(req, res, next) {
  if (req.originalUrl.indexOf("/api/") !== -1) {
      return next();
  } else {
      res.sendFile(path.join(staticRoot, 'index.html'));
      
  }
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'gameID,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users', usersRouter);
app.use('/api/presales', presalesRoute);
app.use('/api/opportunities', opportunitiesRoute);
app.use('/api/companies', companiesRoute);
app.use('/api/market', marketRoute);
app.use('/api/game', gameRoute);
app.use('/api/qix', qix);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

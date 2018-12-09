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
var adminRoute = require('./routes/admin');
var gameRoute = require('./routes/game');
var qixRoute = require('./routes/QIX');

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
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://127.0.0.1:4200', 'http://localhost:3000', 'http://localhost:4200',
                        'http://itmil-ves:3000', 'http://itmil-ves:4200', 'http://itmil-ves, http://localhost'];

  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'gameID,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/presales', presalesRoute);
app.use('/api/v1/opportunities', opportunitiesRoute);
app.use('/api/v1/companies', companiesRoute);
app.use('/api/v1/market', marketRoute);
app.use('/api/v1/game', gameRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/qix', qixRoute);

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

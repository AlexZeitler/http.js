var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;;

passport.use(new BasicStrategy({}, function (username, password, done) {
  // Accepts any username and password, as long as both match each other.
  return done(null, username === password);
}));

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res, next) {
  res.render('index');
});

app.get('/text', function (req, res, next) {
  res.send('http.js');
});

app.get('/json', function (req, res, next) {
  res.send({
    name: 'http.js'
  });
});

app.post('/json', function (req, res, next) {
  res.send({
    name: 'http.js',
    data: req.body
  });
});

app.get('/text/auth', passport.authenticate('basic', { session: false }), function (req, res, next) {
  res.send('http.js with HTTP Basic authentication');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
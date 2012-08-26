var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    DigestStrategy = require('passport-http').DigestStrategy;

passport.use(new BasicStrategy({}, function (username, password, done) {
  return done(null, username === password);
}));

passport.use(new DigestStrategy({
  qop: 'auth'
}, function (username, done) {
  var password = username;
  return done(null, username, password);
}, function (params, done) {
  return done(null, true);
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
  app.use(express.static(path.join(__dirname, '..')));
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

app.get('/jsonp', function (req, res, next) {
  res.send((req.query['callback'] || req.query['jsonp']) + '(\'http.js\');');
});

app.get('/auth/basic', passport.authenticate('basic', { session: false }), function (req, res, next) {
  res.send('http.js with HTTP Basic authentication');
});

app.get('/auth/digest', passport.authenticate('digest', { session: false }), function (req, res, next) {
  res.send('http.js with HTTP Digest authentication');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
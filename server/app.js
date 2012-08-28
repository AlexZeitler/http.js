var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    routes = require('./routes'),
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

app.get('/basicUsage/text', routes.basicUsage.text);
app.get('/basicUsage/json', routes.basicUsage.json);
app.post('/basicUsage/text', routes.basicUsage.text);
app.post('/basicUsage/json', routes.basicUsage.json);
app.put('/basicUsage/text', routes.basicUsage.text);
app.put('/basicUsage/json', routes.basicUsage.json);
app.delete('/basicUsage/text', routes.basicUsage.text);
app.delete('/basicUsage/json', routes.basicUsage.json);

app.post('/sendingData/json', routes.sendingData.postJson);

app.get('/discoveringAllowedVerbs', routes.discoveringSupportedVerbs.get);

app.get('/usingJsonp/text', routes.usingJsonp.text);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
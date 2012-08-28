module.exports = {
  basicUsage: {
    json: function (req, res, next) {
      res.send({
        name: 'http.js'
      });
    },

    text: function (req, res, next) {
      res.send('http.js');
    }
  },

  sendingData: {
    postJson: function (req, res, next) {
      res.send({
        name: 'http.js',
        data: req.body
      });
    }
  },

  discoveringSupportedVerbs: {
    get: function (req, res, next) {
      res.send('http.js');
    }
  },

  usingJsonp: {
    text: function (req, res, next) {
      res.send((req.query['callback'] || req.query['jsonp']) + '(\'http.js\');');
    }
  }
};
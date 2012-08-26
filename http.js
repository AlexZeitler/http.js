(function (root) {
  var getXhr = function (callback) {
    if (window.XMLHttpRequest) {
      return callback(null, new XMLHttpRequest());
    } else if (window.ActiveXObject) {
      try {
        return callback(null, new ActiveXObject("Msxml2.XMLHTTP"));
      } catch (e) {
        return callback(null, new ActiveXObject("Microsoft.XMLHTTP"));
      }
    }
    return callback(new Error());
  };

  var encode = function (data) {
    if(typeof data === 'string') {
      return data;
    }

    var result = [];
    for(var dataItem in data) {
      if(data.hasOwnProperty(dataItem)) {
        result.push(encodeURIComponent(dataItem) + '=' + encodeURIComponent(data[dataItem]));
      }
    }

    return result.join('&')
  };

  var ajax = function (method, url, options, callback) {
    if(typeof options === 'function') {
      callback = options;
      options = {};
    }

    options.cache = options.cache || false;
    options.data = options.data || {};
    options.headers = options.headers || {};
    options.headers['accept'] = options.headers['accept'] || '*/*';
    options.headers['content-type'] = options.headers['content-type'] || 'application/x-www-form-urlencoded;charset=UTF-8';

    getXhr(function (err, xhr) {
      if(err) return callback(err);

      var payload = encode(options.data);
      if(method === 'GET') {
        var queryString = [];
        if(payload) {
          queryString.push(payload);
          payload = null;
        }

        if(!options.cache) {
          queryString.push('_=' + (new Date()).getTime());
        }

        queryString = '?' + queryString.join('&');
        url += queryString !== '?' ? queryString : '';
      }

      if(method === 'GET')

      if(ajax.auth) {
        xhr.withCredentials = true;
        xhr.open(method, url, true, ajax.auth.username, ajax.auth.password);        
      } else {
        xhr.open(method, url, true);
      }

      for(var header in options.headers) {
        if(options.headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }

      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
          var data = xhr.responseText || '';

          callback(xhr.status, {
            text: function () {
              return data;
            },

            json: function () {
              return JSON.parse(data);
            }
          })
        }
      };

      xhr.send(payload);
    });
  };

  var http = {
    get: function (url, options, callback) {
      return ajax('GET', url, options, callback);
    },

    post: function (url, options, callback) {
      return ajax('POST', url, options, callback);      
    },
    
    put: function (url, options, callback) {
      return ajax('PUT', url, options, callback);      
    },
    
    delete: function (url, options, callback) {
      return ajax('DELETE', url, options, callback);      
    },

    auth: function (username, password) {
      ajax.auth = {
        username: username,
        password: password
      };
    }
  };

  root.http = http;
})(this);
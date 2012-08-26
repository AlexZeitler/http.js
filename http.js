(function (root) {
  var getXhr = function (callback) {
    if (window.XMLHttpRequest) {
      return callback(null, new XMLHttpRequest());
    } else if (window.ActiveXObject) {
      try {
        return callback(null, ActiveXObject("Msxml2.XMLHTTP"));
      } catch (e) {
        return callback(null, ActiveXObject("Microsoft.XMLHTTP"));
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
  }

  var ajax = function (method, url, data, headers, callback) {
    if(typeof data === 'function') {
      callback = data;
      data = {};
      headers = {};
    } else if(typeof headers === 'function') {
      callback = headers;
      headers = {};
    }

    getXhr(function (err, xhr) {
      if(err) return callback(err);

      var payload = encode(data);
      if(method === 'GET' && payload) {
        url += '?' + payload;
        payload = null;
      }

      xhr.open(method, url);

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      for(var header in headers) {
        if(headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, headers[header]);
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
    get: function (url, data, headers, callback) {
      return ajax('GET', url, data, headers, callback);
    },

    post: function (url, data, headers, callback) {
      return ajax('POST', url, data, headers, callback);      
    },
    
    put: function (url, data, headers, callback) {
      return ajax('PUT', url, data, headers, callback);      
    },
    
    delete: function (url, data, headers, callback) {
      return ajax('DELETE', url, data, headers, callback);      
    }
  };

  root.http = http;
})(this);
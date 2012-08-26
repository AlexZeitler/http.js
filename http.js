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

  var ajax = function (method, url, headers, callback) {
    if(typeof headers === 'function') {
      callback = headers;
      headers = null;
    }

    getXhr(function (err, xhr) {
      if(err) return callback(err);
      xhr.open(method, url);

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
      
      xhr.send(null);
    });
  };

  var http = {
    get: function (url, headers, callback) {
      return ajax('GET', url, headers, callback);
    },

    post: function (url, headers, callback) {
      return ajax('POST', url, headers, callback);      
    },
    
    put: function (url, headers, callback) {
      return ajax('PUT', url, headers, callback);      
    },
    
    delete: function (url, headers, callback) {
      return ajax('DELETE', url, headers, callback);      
    }
  };

  root.http = http;
})(this);
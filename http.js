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

  var ajax = function (method, url, callback) {
    getXhr(function (err, xhr) {
      if(err) return callback(err);
      xhr.open(method, url);
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
    get: function (url, callback) {
      return ajax('GET', url, callback);
    },

    post: function (url, callback) {
      return ajax('POST', url, callback);      
    },
    
    put: function (url, callback) {
      return ajax('PUT', url, callback);      
    },
    
    delete: function (url, callback) {
      return ajax('DELETE', url, callback);      
    }
  };

  root.http = http;
})(this);
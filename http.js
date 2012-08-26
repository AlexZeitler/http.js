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

  var http = {
    get: function (url, callback) {
      getXhr(function (err, xhr) {
        if(err) return callback(err);
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
          if(xhr.readyState === 4) {
            callback(xhr.status, xhr.responseText || '')
          }
        };
        xhr.send(null);
      });
    }
  };

  root.http = http;
})(this);
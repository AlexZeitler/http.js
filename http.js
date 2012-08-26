(function (root) {
  var getXhr = function (callback) {
    if (window.XMLHttpRequest) {
      callback(null, new XMLHttpRequest());
    } else if (window.ActiveXObject) {
      try {
        callback(null, ActiveXObject("Msxml2.XMLHTTP"));
      } catch (e) {
        callback(null, ActiveXObject("Microsoft.XMLHTTP"));
      }
    }
    callback(new Error());
  };

  var http = {
    get: function (url, callback) {
      getXhr(function (err, xhr) {
        if(err) callback(err);
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
          if(xhr.readyState === 4) {
            callback(null, xhr.status, xhr.responseText || '')
          }
        };
        xhr.send(null);
      });
    }
  };

  root.http = http;
})(this);
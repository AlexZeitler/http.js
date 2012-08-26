// The functions utf8 and base64 are based upon http://www.webtoolkit.info/javascript-base64.html.

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
  };

  var utf8 = function (text) {
    text = text.replace(/\r\n/g, '\n');
    var result = '';

    for(var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);

      if(c < 128) {
          result += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
          result += String.fromCharCode((c >> 6) | 192);
          result += String.fromCharCode((c & 63) | 128);
      } else {
          result += String.fromCharCode((c >> 12) | 224);
          result += String.fromCharCode(((c >> 6) & 63) | 128);
          result += String.fromCharCode((c & 63) | 128);
      }
    }

    return result;
  };

  var base64 = function (input) {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    input = utf8(input);
    var output = '',
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if(isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if(isNaN(chr3)) {
        enc4 = 64;
      }

      output +=
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while(i < input.length);

    return output;
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

      if(ajax.auth) {
        xhr.setRequestHeader('Authorization', 'Basic ' + base64(ajax.auth.username + ':' + ajax.auth.password));
      }

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
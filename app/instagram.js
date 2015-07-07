var request = require('request');
var Q       = require('q');
var ig      = require('../config/instagram');

// Kind of sly, but makes interacting with the Instagram API
// a little more effecient. In Node, variables can be shared
// across requests. We only need 1 API access token from
// Instagram, so we can use the same one since the user is
// to specify their user ID.
var _accessToken = '297048867.0a344b6.e7c0bb354e5b4699a43f11f854832985';

// ----------------------------------------------------------
// Public Methods
// ----------------------------------------------------------


var instagram = {

  getAccessToken: function() {
    return _getAccessToken();
  },

  getRecentByUserId: function(userId) {
    var deferred = Q.defer();

    _getAccessToken().then(function(accessToken) {
      request('https://api.instagram.com/v1/users/' + userId + '/media/recent?access_token=' + accessToken,
      function(err, httpResponse, body) {
        if (err) return deferred.reject(err);

        console.log(JSON.stringify(httpResponse).headers);

        try {
          var response = JSON.parse(body);
          console.log(response);

          deferred.resolve(response);
        } catch (e) {
          console.error('JSON parse error');
          deferred.reject(e);
        }
      });
    }, function(err) { return deferred.reject(err) });

    return deferred.promise;
  }


}

// ----------------------------------------------------------
// Private Methods
// ----------------------------------------------------------

var _getAccessToken = function() {
  var deferred = Q.defer();

  if (_accessToken) {
    deferred.resolve(_accessToken);
    return deferred.promise;
  }

  request.post({
    url: ig.site_url,
    form: {
      client_id: ig.client_id,
      client_secret: ig.client_secret,
      username: ig.username,
      password: ig.password,
      grant_type: 'password'
    },
  }, function(err, httpResponse, body) {
    if (err) return deferred.reject(err);

    var response = JSON.parse(body);
    console.log(response);

    if (response.code) {
      return deferred.reject(response);
    }

    _accessToken = response.access_token;
    deferred.resolve(response.access_token);
  });

  return deferred.promise;
};

// ----------------------------------------------------------

module.exports = instagram;
var request = require('request');
var Q       = require('q');
var ig      = require('../config/instagram');

// Kind of sly, but makes interacting with the Instagram API
// a little more effecient. In Node, variables can be shared
// across requests. We only need 1 API access token from
// Instagram, so we can use the same one since the user is
// to specify their user ID.
var accessToken = null;

module.exports = {
  getAccessToken: function() {
    var deferred = Q.defer();

    if (accessToken) {
      deferred.resolve(accessToken);
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

      deferred.resolve(response.access_token);
    });

    return deferred.promise;
  }
}
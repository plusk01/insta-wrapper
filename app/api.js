var express     = require('express');
var router      = express.Router();

var instagram   = require('./instagram');

router.get('/users/:userId/media/recent', function(req, res) {
    var userId = req.params.userId;
    
    // instagram.getAccessToken().then(function(accessToken) {
    //     res.send(accessToken);
    // }, function(err) {
    //     res.send(err);
    // });

    instagram.getRecentByUserId(userId).then(function(response) {
        res.send(response);
    }, function(err) { res.send(err) });
});

module.exports = router;
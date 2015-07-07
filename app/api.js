var express     = require('express');
var router      = express.Router();

var instagram   = require('./instagram');

router.get('/users/:user_id/media/recent', function(req, res) {
    
    instagram.getAccessToken().then(function(accessToken) {
        res.send(accessToken);
    });
});

module.exports = router;
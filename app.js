/******************************************************************************
 *                         Instagram API Wrapper 
 ******************************************************************************
 * insta-wrapper provides an API that is authenticated using xAuth to allow
 * easy client-side integration with the Instagram API. This wrapper limits
 * requests to non-destructive requests (view feeds, popular, comments, etc).
 *
 *
 * Parker Lusk
 * 6 July 2015
**/

// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------
var express   = require('express');
var bodyParser  = require('body-parser');

var api    = require('./app/api');

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

global.__base = __dirname + '/';  // so child modules can access root

var app       = express();
var port      = process.env.PORT || 8080;   // If no env var set, DEV mode

app.use(bodyParser.json());   // automagically parses application/json and
                              // exposes it to req.body


// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

app.use('/api/v1', api);

// ----------------------------------------------------------------------------
// Listen (start app: `node app.js`)
// ----------------------------------------------------------------------------

var server = app.listen(port, function() {
  var host = server.address().address;
  
  console.log('insta-wrapper listening at http://%s:%s', host, port);
});

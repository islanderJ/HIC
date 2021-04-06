var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();


var options = {
  // use the server key
  key: fs.readFileSync('./keys/server-key.pem'),
 
  // use the server cert
  cert: fs.readFileSync('./keys/server-crt.pem'),

};

app.get('/v1/hello', function (req, res) {
  res.status(200).send('world');
});

var listener = https.createServer(options, app).listen(9000, function () {
  console.log('Express HTTPS server listening on port ' + listener.address().port);
});
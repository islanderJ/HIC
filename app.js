var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();

app.use(express.json())

var options = {
  // use the server key
  key: fs.readFileSync('./keys/server-key.pem'),

  // use the server cert
  cert: fs.readFileSync('./keys/server-crt.pem'),

  requestCert: true,
  rejectUnauthorized: false,

  ca: [ fs.readFileSync('./keys/cacert.pem') ] //Client Cert

};

app.use(function (req, res, next) {

  if (!req.client.authorized) {
    return res.status(401).send('User is not authorized');
  }

  next();
});

app.get('/v1/hello', function (req, res) {

  var cert = req.socket.getPeerCertificate();
  if (cert.subject.OU === "Hello") {
    res.status(200).send('world');

  }else{
    res.status(400).send({error:"invalid OU value"});
  }

});

app.post('/v2/hello', function (req, res) {

  if (!req.is('application/json')) {

    return res.status(400).send('Please use json format with headers.')

  } else {

    var format = req.body['format']

    if (format === undefined) {

      return res.status(400).send('Format is undefined.')

    } else {

      switch (format) {
        case "json":
          data = { data: 'world' }
          header = 'application/json'
          status = 200
          break;
        case "xml":
          data = "<data>world</data>"
          header = 'text/xml'
          status = 200
          break;
        default:
          data = "Format not valid. Please use xml or json (Case Sensitive)."
          header = "text/html"
          status = 400
      }

      res.header('Content-Type', header).status(status).send(data)

    }
  }

});

var listener = https.createServer(options, app).listen(9000, function () {
  console.log('Express HTTPS server listening on port ' + listener.address().port);
});

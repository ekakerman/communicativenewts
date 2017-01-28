var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8888;

app.use(express.static('client'));

app.listen(port, function() {
  console.log('Express-SERVER listening at port: ' + port);
});

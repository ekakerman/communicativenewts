var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var mongoose = require('mongoose');
var app = express();

app.use(express.static('client'));
app.use(bodyParser.json());

mongoose.connect('mongodb://greenfield:greenfield@ds137749.mlab.com:37749/metis_database');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('mongoDB connection is open');
});

var port = process.env.PORT || 8888;
=======

var app = express();
var port = process.env.PORT || 8888;

app.use(express.static('client'));
>>>>>>> Add server

app.listen(port, function() {
  console.log('Express-SERVER listening at port: ' + port);
});

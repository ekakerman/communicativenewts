var mongoose = require('mongoose');
var User = require('./userModel.js');


module.exports = {

  signup: function(req, res) {
    mongoose.model('users', function(err, user) {

      if (err) { res.send(err); }
      console.log(req.body, 'newUser was ADDED to the database');

      var newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        start_time: req.body.start,
        end_time: req.body.time,
        id_token: req.body.id_token
      });

      newUser.save();
    });
  },

  signin: function(req, res) {
    mongoose.model('users', function(err, user) {


    //singin will obviously need to be here.
    });
  },

  update: function(req, res) {
    mongoose.model('users', function(err, user) {

      if (err) { res.send(err); }
      console.log(req.body, 'UPDATED a user on the database');

      //need to update here.
    });
  }

}

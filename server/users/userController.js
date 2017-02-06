var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
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

  //currently unused - for expanding to back-end authentication
  authorize: function() {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(CLIENT_ID, '', '');
    client.verifyIdToken(token, CLIENT_ID, function(e, login) {
      var payload = login.getPayload();
      var userid = payload['sub'];
    });
  }

}

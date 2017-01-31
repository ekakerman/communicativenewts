var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  start_time: Date,
  end_time: Date,
  id_token: String
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
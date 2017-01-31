var mongoose = require('mongoose');
var Task = require('./taskModel.js');
var User = require('../users/userModel.js');


module.exports = {

  newTask: function(req, res) {
    mongoose.model('tasks', function(err, user) {

      if (err) { res.send(err); }
      console.log(req.body, 'NEWTASK was added to the db');

      var newTask = new Task({
        task: req.body.task,
        date_due: req.body.due_date,
        time_due: req.body.time_due,
        duration: req.body.duration,
        priority: req.body.priority,
        completed: req.body.completed,

        // how can we access the proper user Id here?
        // id_users: [{type: Schema.Types.ObjectId, ref: 'User'}];
      });

      newTask.save();
    })
  },

  changeTask: function(req, res) {
    mongoose.model('tasks', function(err, user) {

      if (err) { res.send(err); }
      console.log(req.body, 'TASK was updated/changed on the db');

      //need to find a way to change/update a task here.
    });
  },

  deleteTask: function(req, res) {
    mongoose.model('tasks', function (err, user) {
      if (err) { res.send(err); }

      Task.find({task: req.body.task}).remove(function(err) {
        if (err) { return handleError(err); }
        console.log(req.body.tasks, 'DELETED a TASK on the db');
      });
    });
  }

}
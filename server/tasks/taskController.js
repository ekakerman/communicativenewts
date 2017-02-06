var mongoose = require('mongoose');
var Task = require('./taskModel.js');
var User = require('../users/userModel.js');


module.exports = {

  //currently unused - tasks saved only in google calendar, not in database
  newTask: function(req, res) {
    mongoose.model('tasks', function(err, user) {

      if (err) { res.send(err); }

      var newTask = new Task({
        task: req.body.task,
        start: req.body.start,
        end: req.body.end,
        duration: req.body.duration,
        priority: req.body.priority,
        completed: req.body.completed,
        user_id: req.body.user
      });

      newTask.save();
    })
  },

  //currently unused
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
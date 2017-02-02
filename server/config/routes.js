var taskController = require('../tasks/taskController.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {
  app.post('api/users/signin', userController.signin);
  app.post('api/users/signup', userController.signup);
  app.post('api/users/update', userController.update);

  app.get('api/tasks', taskController.newTask);
  app.post('api/tasks', taskController.changeTask);
  app.post('api/tasks/:delete', taskController.deleteTask);

}

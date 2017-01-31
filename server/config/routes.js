var taskController = require('../tasks/taskController.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {
  app.post('api/users/signin', userController);
  app.post('api/users/signup', userController);
  app.post('api/users/update', userController);

  api.get('/api/tasks', taskController.newTask);
  api.post('api/tasks', taskController.changeTask);
  api.post('api/tasks/:delete', taskController.deleteTask);

}

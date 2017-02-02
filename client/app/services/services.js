console.log('Services.js Loaded.');

angular.module('app.services', [])

.factory('Tasks', function ($http) {

  // Events array to be set and retrieved with helpers below
  var events = [];

  // Helper to access events array
  var getTasks = function() {
    return events;
  };

  // Helper to set events array
  var setTasks = function(eventsList) {
    events = eventsList;
  };

  // Request saved tasks from database
  var populateTaskList = function() {
    return $http({
      method: 'GET',
      url: '/api/fetchTasks'
    })
    .then(function(res) {
      return res.data;
    });
  };

  // Send new task list to API endpoint
  var sendTaskList = function(taskList) {
    return $http({
      method: 'POST',
      url: '/api/submitTasks',
      data: taskList
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    getTasks: getTasks,
    setTasks: setTasks,
    populateTaskList: populateTaskList,
    sendTaskList: sendTaskList
  };

});
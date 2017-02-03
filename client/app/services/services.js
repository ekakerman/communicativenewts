console.log('Services.js Loaded.');

angular.module('app.services', [])

.factory('Tasks', function ($http) {

  // User data to be populated on login
  var userData = {};

  // Array of all tasks to populate calendar view
  var allTasks = [];

  // Events array to be set and retrieved with helpers below
  var tasks = [];

  var setUserData = function(data) {
    userData = data;
  };

  var getUserData = function() {
    return userData;
  };

  // Helper to access tasks array
  var getTasks = function() {
    return tasks;
  };

  // Helper to set tasks array
  var setTasks = function(eventsList) {
    tasks = eventsList;
  };

  // Grab tasks from allTasks
  var populateTaskList = function() {
    return allTasks;
  };

  // Add tasks to allTasks
  var sendTaskList = function(taskList) {
    allTasks.concat(taskList);
  };

  return {
    setUserData: setUserData,
    getUserData: getUserData,
    getTasks: getTasks,
    setTasks: setTasks,
    populateTaskList: populateTaskList,
    sendTaskList: sendTaskList
  };

});
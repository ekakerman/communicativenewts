console.log('Services.js Loaded.');

angular.module('app.services', [])

.factory('Tasks', function ($http) {

  // User data to be populated on login
  var userData = {};

  // Array of all tasks to populate calendar view
  var allTasks = [];

  // Events array to be set and retrieved with helpers below
  var tasks = [];

  // Helper to set userData object
  var setUserData = function(data) {
    userData = data;
  };

  // Helper to access userData object
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
    allTasks = allTasks.concat(taskList);
  };

  // Authentication token for header of POST request
  var auth = "Bearer " + window.authResponse.access_token;

  // Send events to Google Calendar
  var sendToGoogle = function(event) {
    return $http({
      method: 'POST',
      url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth
      },
      data: event
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    setUserData: setUserData,
    getUserData: getUserData,
    getTasks: getTasks,
    setTasks: setTasks,
    populateTaskList: populateTaskList,
    sendTaskList: sendTaskList,
    sendToGoogle: sendToGoogle
  };

});
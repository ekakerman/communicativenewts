console.log('Services Loaded.');

angular.module('app.services', [])

.factory('Tasks', function ($http) {

  var events = [];

  var getTasks = function() {
    return events;
  };

  var setTasks = function(eventsList) {
    events = eventsList;
  };

  return {
    getTasks: getTasks,
    setTasks: setTasks
  };

});
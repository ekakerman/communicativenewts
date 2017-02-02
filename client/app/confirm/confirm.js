console.log('Confirm.js Loaded.');

angular.module('app.confirm', [])
  .controller('confirmCtrl', function($scope, $location, Tasks) {

    // Grab task list saved in Tasks factory
    $scope.getTasks = function() {
      // reset old events
      $scope.events = [];
      // get new task list
      $scope.events = Tasks.getTasks();
      console.log('Getting task list:', $scope.events);
    };

    $scope.getTasks();

    // Add events in list to calendar
    $scope.addToCalendar = function() {
      Tasks.sendTaskList($scope.events);
      $scope.calendarView();
    };

    $scope.calendarView = function() {
      $location.path('/calendar');
    };

  });
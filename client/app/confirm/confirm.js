console.log('Confirm.js Loaded.');

angular.module('app.confirm', [])
  .controller('confirmCtrl', function($scope, $location, Tasks, Algorithm) {

    // Grab saved user data
    $scope.userData = Tasks.getUserData();

    // Unsorted events array
    $scope.rawEvents = Tasks.getTasks();

    // Sort events by time
    $scope.sortSchedule = function() {
      return Algorithm.makeSchedule($scope.rawEvents);
    };

    // Grab task list saved in Tasks factory
    $scope.displaySchedule = function() {
      $scope.events = $scope.rawEvents;
      console.log('Getting task list:', $scope.events);

      // *** UNCOMMENT WHEN ALGORITHM CONNECTED ***

      // var sortedSchedule = $scope.sortSchedule();
      // $scope.events = Algorithm.displaySchedule(sortedSchedule);
    };

    $scope.displaySchedule();

    // Add events in list to calendar
    $scope.addToCalendar = function() {
      // Add to stored list in Tasks
      Tasks.sendTaskList($scope.events);
      $scope.redirect('/calendar');

      // *** UNCOMMENT WHEN ALGORITHM CONNECTED ***

      // var apiEvents = Algorithm.makeAPI($scope.sortSchedule(), $scope.userData);
      // apiEvents.forEach(function(event) {
      // SEND TO API
      // });

    };

    $scope.redirect = function(page) {
      $location.path(page);
    };

  });
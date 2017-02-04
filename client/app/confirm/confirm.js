console.log('Confirm.js Loaded.');

angular.module('app.confirm', [])
  .controller('confirmCtrl', function($scope, $location, Tasks, Algorithm) {

    // Grab saved user data
    $scope.userData = Tasks.getUserData();

    // Unsorted events array
    $scope.rawEvents = Tasks.getTasks();

    // Grab task list saved in Tasks factory
    $scope.displaySchedule = function() {

      // *** UNCOMMENT WHEN ALGORITHM CONNECTED ***

      console.log('Making Schedule', $scope.rawEvents);
      var sortedSchedule = Algorithm.makeSchedule($scope.rawEvents);
      console.log('Sorted Schedule:', sortedSchedule);
      $scope.events = Algorithm.displaySchedule(sortedSchedule);
      // $scope.events = $scope.rawEvents;
      console.log('Getting task list:', $scope.events);
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
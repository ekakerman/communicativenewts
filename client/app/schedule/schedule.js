console.log('made it to schedule.js');

angular.module('app.schedule', [])
  .controller('scheduleCtrl', function($scope, $location, Tasks) {

    // Options for 'Start Time/End Time' drop down selectors
    $scope.timeOptions = [

      {name: '12:00am'},
      {name: '1:00am'},
      {name: '2:00am'},
      {name: '3:00am'},
      {name: '4:00am'},
      {name: '5:00am'},
      {name: '6:00am'},
      {name: '7:00am'},
      {name: '8:00am'},
      {name: '9:00am'},
      {name: '10:00am'},
      {name: '11:00am'},
      {name: '12:00pm'},
      {name: '1:00pm'},
      {name: '2:00pm'},
      {name: '3:00pm'},
      {name: '4:00pm'},
      {name: '5:00pm'},
      {name: '6:00pm'},
      {name: '7:00pm'},
      {name: '8:00pm'},
      {name: '9:00pm'},
      {name: '10:00pm'},
      {name: '11:00pm'}

    ];

    // Options for 'Duration' drop down selector
    $scope.durationOptions = [

      {name: '30 min'},
      {name: '1 hr'},
      {name: '1 hr 30 min'},
      {name: '2 hr'},
      {name: '2 hr 30 min'},
      {name: '3 hr'},
      {name: '3 hr 30 min'},
      {name: '4 hr'},
      {name: '4 hr 30 min'},
      {name: '5 hr'},
      {name: '5 hr 30 min'},
      {name: '6 hr'}

    ];

    // Object to hold created task
    $scope.event = {};

    // Array of all task objects to be added
    $scope.events = [];

    // Adds current event to events array
    $scope.addTask = function() {
      console.log('Adding task:', $scope.event);
      $scope.events.push($scope.event);
      // Reset event
      $scope.event = {};
    };

    // Remove all form data
    $scope.resetForm = function() {
      $scope.event = {};
    };

    // Send events array to Confirm Schedule View
    $scope.makeSchedule = function() {
      Tasks.setTasks($scope.events);
      // Redirect to confirm calendar view
      $location.path('/confirm');
    };

  });
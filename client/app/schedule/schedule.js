console.log('Schedule.js Loaded.');

angular.module('app.schedule', ['ngSanitize'])
  .controller('scheduleCtrl', function($scope, $location, $sce, Tasks, Algorithm) {

    // Get user data from services.js
    $scope.userData = Tasks.getUserData();

    // Options for 'Start Time/End Time' drop down selectors
    $scope.timeOptions = [

      {opt: '12:00am', val: 0},
      {opt: '12:30am', val: 0.5},
      {opt: '1:00am', val: 1},
      {opt: '1:30am', val: 1.5},
      {opt: '2:00am', val: 2},
      {opt: '2:30am', val: 2.5},
      {opt: '3:00am', val: 3},
      {opt: '3:30am', val: 3.5},
      {opt: '4:00am', val: 4},
      {opt: '4:30am', val: 4.5},
      {opt: '5:00am', val: 5},
      {opt: '5:30am', val: 5.5},
      {opt: '6:00am', val: 6},
      {opt: '6:30am', val: 6.5},
      {opt: '7:00am', val: 7},
      {opt: '7:30am', val: 7.5},
      {opt: '8:00am', val: 8},
      {opt: '8:30am', val: 8.5},
      {opt: '9:00am', val: 9},
      {opt: '9:30am', val: 9.5},
      {opt: '10:00am', val: 10},
      {opt: '10:30am', val: 10.5},
      {opt: '11:00am', val: 11},
      {opt: '11:30am', val: 11.5},
      {opt: '12:00pm', val: 12},
      {opt: '12:30pm', val: 12.5},
      {opt: '1:00pm', val: 13},
      {opt: '1:30pm', val: 13.5},
      {opt: '2:00pm', val: 14},
      {opt: '2:30pm', val: 14.5},
      {opt: '3:00pm', val: 15},
      {opt: '3:30pm', val: 15.5},
      {opt: '4:00pm', val: 16},
      {opt: '4:30pm', val: 16.5},
      {opt: '5:00pm', val: 17},
      {opt: '5:30pm', val: 17.5},
      {opt: '6:00pm', val: 18},
      {opt: '6:30pm', val: 18.5},
      {opt: '7:00pm', val: 19},
      {opt: '7:30pm', val: 19.5},
      {opt: '8:00pm', val: 20},
      {opt: '8:30pm', val: 20.5},
      {opt: '9:00pm', val: 21},
      {opt: '9:30pm', val: 21.5},
      {opt: '10:00pm', val: 22},
      {opt: '10:30pm', val: 22.5},
      {opt: '11:00pm', val: 23},
      {opt: '11:30pm', val: 23.5}

    ];

    // Options for 'Duration' drop down selector
    $scope.durationOptions = [

      {opt: '0.5 hrs', val: 0.5},
      {opt: '1.0 hrs', val: 1},
      {opt: '1.5 hrs', val: 1.5},
      {opt: '2.0 hrs', val: 2},
      {opt: '2.5 hrs', val: 2.5},
      {opt: '3.0 hrs', val: 3},
      {opt: '3.5 hrs', val: 3.5},
      {opt: '4.0 hrs', val: 4},
      {opt: '4.5 hrs', val: 4.5},
      {opt: '5.0 hrs', val: 5},
      {opt: '5.5 hrs', val: 5.5},
      {opt: '6.0 hrs', val: 6},
      {opt: '6.5 hrs', val: 6.5},
      {opt: '7.0 hrs', val: 7},
      {opt: '7.5 hrs', val: 7.5},
      {opt: '8.0 hrs', val: 8},
      {opt: '8.5 hrs', val: 8.5},
      {opt: '9.0 hrs', val: 9},
      {opt: '9.5 hrs', val: 9.5},
      {opt: '10.0 hrs', val: 10},
      {opt: '10.5 hrs', val: 10.5},
      {opt: '11.0 hrs', val: 11},
      {opt: '11.5 hrs', val: 11.5},
      {opt: '12.0 hrs', val: 12}

    ];

    // Date selector
    $scope.date = null;

    // Object to hold created task
    $scope.event = {};

    // Array of all task objects to be added
    $scope.events = [];

    // Used for showing error message on invalid task
    $scope.invalidTimes = false;

    $scope.invalidSchedule = false;

    // Adds current event to events array
    $scope.addTask = function() {
      console.log('Adding task...');

      $scope.invalidTimes = false;
      var valid = Algorithm.checkEvent($scope.event);

      if (valid) {
        $scope.events.push($scope.event);
        console.log('Success:', $scope.event);
        $scope.event = {};
      } else {
        console.log('invalid event times');
        $scope.invalidTimes = true;
      }
    };

    // Remove all form data
    $scope.resetForm = function() {
      $scope.event = {};
    };

    // Adds ID property to events when making schedule
    $scope.addIdProp = function(taskList) {
      taskList.forEach(function(task, index) {
        task.id = index;
      });
    };

    // Send events array to Confirm Schedule View
    $scope.makeSchedule = function() {
      $scope.addIdProp($scope.events);
      $scope.addUserDate();

      if (Algorithm.makeSchedule($scope.events) === false) {
        // No Schedule can be created
        $scope.invalidSchedule = true;
      } else {
        Tasks.setTasks($scope.events);
        $location.path('/confirm');
      }
    };

    // Force iframe to use dynamically created link as trusted src
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    // Redirect app to specified page
    $scope.redirect = function(page) {
      $location.path(page);
    };

    // Set the date property on the userData object
    $scope.addUserDate = function() {
      var date = $scope.date.toISOString();
      var longDate = $scope.date.toUTCString();
      $scope.userData.date = date;
      $scope.userData.longDate = longDate;
      Tasks.setUserData($scope.userData);
      console.log('User Data Updated:', $scope.userData);
    };

    // source for iframe used in calendar.html
    $scope.calSource = "https://calendar.google.com/calendar/embed?showPrint=0&mode=AGENDA&src=" + $scope.userData.user + "%40gmail.com&ctz=" + $scope.userData.tz;

  });
console.log('Calendar.js Loaded.');

angular.module('app.calendar', ['ngSanitize'])
  .controller('calendarCtrl', function($scope, $sce, $location, Tasks) {

    // Use to store tasks from database
    $scope.tasks = [];

    // *** CURRENTLY HARDCODED ***
    // Move to Services.js
    // User settings retrieved at login
    $scope.userData = {
      user: 'communicativenewts',
      tz: 'America/New_York',
      offset: -5
    };

    Tasks.setUserData($scope.userData);

    // source for iframe used in calendar.html
    $scope.calSource = "https://calendar.google.com/calendar/embed?showPrint=0&mode=AGENDA&src=" + $scope.userData.user + "%40gmail.com&ctz=" + $scope.userData.tz;

    // Force iframe to use dynamically created link as trusted src
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    // Redirect to Scheduler View
    $scope.redirect = function(page) {
      $location.path(page);
    };

    // Get tasks saved in database
    $scope.populateTaskList = function() {
      $scope.tasks = Tasks.populateTaskList();
    };

    // Populate task list when app loads
    $scope.populateTaskList();

  });
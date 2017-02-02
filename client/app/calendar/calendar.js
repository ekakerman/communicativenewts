console.log('Calendar.js Loaded.');

angular.module('app.calendar', ['ngSanitize'])
  .controller('calendarCtrl', function($scope, $sce, $location, Tasks) {

    // User settings retrieved at login
    $scope.username = "communicativenewts";
    $scope.timezone = "America/New_York";

    // source for iframe used in calendar.html
    $scope.calSource = "https://calendar.google.com/calendar/embed?showPrint=0&mode=AGENDA&src=" + $scope.username + "%40gmail.com&ctz=" + $scope.timezone;

    // Use to store tasks from database
    $scope.tasks = null;

    // Get tasks saved in database
    $scope.populateTaskList = function() {
      $scope.tasks = Tasks.populateTaskList();
    };

    // Populate task list when app loads
    // $scope.populateTaskList();

    // Force iframe to use dynamically created link as trusted src
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    // Redirect to Scheduler View
    $scope.scheduleView = function() {
      $location.path('/schedule');
    };

  });
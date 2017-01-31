console.log('made it to calendar.js');

angular.module('app.calendar', ['ngSanitize'])
  .controller('calendarCtrl', function($scope, $sce) {

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.username = "autem.alex";
    $scope.timezone = "America/New_York";

    $scope.calSource = "https://calendar.google.com/calendar/embed?src=" + $scope.username + "%40gmail.com&ctz=" + $scope.timezone;

  });
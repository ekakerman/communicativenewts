console.log('made it to app.js');

angular.module('app', ['app.login', 'app.calendar', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/login/login.html',
        controller: 'loginCtrl'
      })
      .when('/calendar', {
        templateUrl: 'app/calendar/calendar.html',
        controller: 'calendarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
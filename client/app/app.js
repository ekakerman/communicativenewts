console.log('made it to app.js');

angular.module('app', ['app.login', 'app.calendar', 'app.schedule', 'app.confirm', 'app.services', 'ngRoute'])
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
      .when('/schedule', {
        templateUrl: 'app/schedule/schedule.html',
        controller: 'scheduleCtrl'
      })
      .when('/confirm', {
        templateUrl: 'app/confirm/confirm.html',
        controller: 'confirmCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
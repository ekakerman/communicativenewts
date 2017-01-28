console.log('made it to app.js');

angular.module('app', ['app.login', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/login/login.html',
        controller: 'loginCtrl'
      })
      // .when('/login', {
      //   templateUrl: 'client/app/login/login.html',
      //   controller: 'loginCtrl'
      // })
      .otherwise({
        redirectTo: '/login'
      });

  });
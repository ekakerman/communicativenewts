console.log('made it to login.js');
angular.module('app.login', [])
  .controller('loginCtrl', function($scope) {
    $scope.value = 'Ready to get started?  Sign in with google up here!';

  })
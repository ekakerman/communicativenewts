console.log('made it to confirm.js');

angular.module('app.confirm', [])
  .controller('confirmCtrl', function($scope, Tasks) {

    // Grab task list saved in Tasks factory
    $scope.getTasks = function() {
      // reset old events
      $scope.events = [];
      // get new task list
      $scope.events = Tasks.getTasks();
      console.log('Getting task list:', $scope.events);
    };

    $scope.getTasks();

  });
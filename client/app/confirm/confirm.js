console.log('Confirm.js Loaded.');

angular.module('app.confirm', [])
  .controller('confirmCtrl', function($scope, $location, Tasks, Algorithm) {

    // Grab saved user data
    $scope.userData = Tasks.getUserData();

    // Previously sorted events array
    $scope.sortedEvents = Tasks.getTasks();

    $scope.formatDate = function() {
      var date = $scope.userData.longDate;
      var dateIndex = date.indexOf(':');
      var formatted = date.slice(0, dateIndex - 3);
      return formatted;
    };

    // Grab task list saved in Tasks factory
    $scope.displaySchedule = function() {
      $scope.events = Algorithm.displaySchedule($scope.sortedEvents);
      $scope.date = $scope.formatDate();
      console.log('Getting task list:', $scope.events);
    };

    $scope.displaySchedule();

    // Add events in list to calendar
    $scope.addToCalendar = function() {

      $scope.events.forEach(function(event) {
        event.date = $scope.formatDate();
      });

      Tasks.sendTaskList($scope.events);
      console.log('Sent to Factory:', $scope.events);

      // *** UNCOMMENT WHEN ALGORITHM CONNECTED ***

      console.log('Sorted Schedule:', $scope.sortedEvents);
      console.log('User Data:', $scope.userData);

      var apiEvents = Algorithm.makeAPI($scope.sortedEvents, $scope.userData);

      // Send each event to the API
      apiEvents.forEach(function(event) {

        console.log('Sending event to Google:', event);

        // var request = gapi.client.calendar.events.insert({
        //   'calendarId': 'primary',
        //   'resource': event
        // });

        // request.execute(function(event) {
        //   console.log('Event Created:', event.htmlLink);
        // });
      });

      var testEvent = {
        "summary": "Sent from App!",
        "start": {
          "dateTime": "2017-02-07T01:30:00-07:00"
        },
        "end": {
          "dateTime": "2017-02-07T05:30:00-07:00"
        }
      };

      console.log('Actually sending this:', testEvent);

      Tasks.sendToGoogle(testEvent);

      $scope.redirect('/calendar');
    };

    $scope.redirect = function(page) {
      $location.path(page);
    };

  });
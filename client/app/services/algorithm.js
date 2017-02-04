console.log('Algorithm.js Loaded.');

angular.module('app.algorithm', [])

.factory('Algorithm', function () {

  var checkEvent = function(event) {
    if (event.endTime - event.startTime < event.duration) {
      return false;
    }
    return true;
  };


  var makeSchedule = function(events) {


    var makeDay = function(userData) {
      var day = [];
      for (var i = userData.dayStart; i <= userData.dayEnd; i += 0.5) {
        day[i * 2] = {
          timeBlock: i
        };
      }
      return day;
    };

    var checkDayLength = function(events, userData) {

      //check the total duration of all events
      var totalTime = events.reduce(function(sum, event) {
        sum += event.duration;
        return sum;
      }, 0);

      //sum the duration of the day
      var dayLength = userData.dayEnd - userData.dayStart;

      //make sure there's enough time in the day for all events
      return dayLength < totalTime;
    };

    var insertEvent = function(day, startTime, event) {
      for (var j = startTime * 2; j < (startTime + event.duration) * 2; j++) {
        if (day[j].event) {
          return false;
        } else {
          day[j].event = event;
        }
      }
      return day;
    };

    var removeEvent = function(day, event) {
      day = day.map(function(timeBlock, index, array) {
        if (timeBlock.event && timeBlock.event.id === event.id) {
          timeBlock.event = undefined;
        }
        return timeBlock;
      });
      return day;
    };

    var findSolution = function(events, userData, n, day) {

      //establish "n" and day if not provided
      if (n === undefined) {
        n = 0;
      }

      if (day === undefined) {
        day = makeDay(userData);
      }

      //base case: all events placed
      if (n === events.length) {
        return day;
      }

      //determine all of the valid places an event could start
      var earliestStart = Math.max(userData.dayStart, events[n].startTime);
      var latestStart = Math.min(userData.dayEnd, events[n].endTime) - events[n].duration;

       //iterate over every possible place an event could go
      for (var i = earliestStart; i <= latestStart; i+=0.5) {
        //place that event in its starting place
        var newDay = insertEvent(day, i, events[n]);
        if (newDay) {
          //that placement worked - on to the next!
          var result = findSolution(newDay, events, n + 1, userData);
          if (result) {
            //eject from recursion
            return result;
          }
        } else {
          //that placement didn't work - remove it & try again
          day = removeEvent(day, events[n]);
        }
      }


    };


  }

  //sample result of makeSchedule
  // var events = [
  //   {
  //     task: 'A',
  //     startTime: 9,
  //     endTime: 10
  //   },
  //   {
  //     task: 'B',
  //     startTime: 13,
  //     endTime: 15
  //   }
  // ];


  return {
    makeDay: makeDay,
    checkDayLength: checkDayLength,
    checkEachEvent: checkEachEvent,
    findSolution: findSolution
  };
})

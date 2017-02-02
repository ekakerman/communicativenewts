angular.module('app.factory', [])

.factory('Algorithm', function () {

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

  var checkEachEvent = function(events) {

    //make sure the events are all individually physically possible
    var validTimes = events.reduce(function(valid, event) {
      if (valid === false) {
        return false;
      } else if (event.endTime - event.startTime < event.duration){
        return false;
      } else if (event.startTime + event.duration > userData.dayEnd || event.endTime - event.duration < userData.dayStart) {
        return false;
      }
      return true;
    }, true);

    return validTimes;
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


  return {
    makeDay: makeDay,
    checkDayLength: checkDayLength,
    checkEachEvent: checkEachEvent
  };
})

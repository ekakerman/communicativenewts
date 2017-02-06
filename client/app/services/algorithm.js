console.log('Algorithm.js Loaded.');

angular.module('app.algorithm', [])

.factory('Algorithm', function () {

  //make sure each event is individually possible
  var checkEvent = function(event) {
    if (event.endTime - event.startTime < event.duration) {
      return false;
    }
    return true;
  };

  var makeSchedule = function(events) {

    //convert each numerical string to a number
    events.forEach(function(value, index, array) {
      value.startTime = +value.startTime;
      value.endTime = +value.endTime;
      value.duration = +value.duration;
    })

    //calculate time day starts by finding earliest start time
    var dayStart = events.reduce(function(earliest, event, index, array) {
      if (event.startTime < earliest) {
        return event.startTime;
      }
      return earliest;
    }, events[0].startTime);

    //calculate time day ends by finding latest end time
    var dayEnd = events.reduce(function(latest, event, index, array) {
      if (event.startTime > latest) {
        return event.endTime;
      }
      return latest;
    }, events[0].endTime);

    //use start and end times to make array representing the full day
    var makeDay = function(dayStart, dayEnd) {
      var day = [];
      //increase by .5 to account for half-hours
      for (var i = dayStart; i <= dayEnd; i += 0.5) {
        //each day is an object
        day[i * 2] = {
          timeBlock: i
        };
      }
      return day;
    };

    //check total time requirement of all events
    var checkDayLength = function(events) {

      //check the total duration of all events
      var totalTime = events.reduce(function(sum, event) {
        sum += event.duration;
        return sum;
      }, 0);

      //sum the duration of the day
      var dayLength = dayEnd - dayStart;

      //make sure there's enough time in the day for all events
      return dayLength > totalTime;
    };

    //insert a specific event in the day array
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

    //remove a specific event in the day array
    var removeEvent = function(day, event) {
      day = day.map(function(timeBlock, index, array) {
        if (timeBlock.event && timeBlock.event.id === event.id) {
          timeBlock.event = undefined;
        }
        return timeBlock;
      });
      return day;
    };

    var findSchedule = function(events, day, n) {

      //establish "n" if not provided
      if (n === undefined) {
        n = 0;
      }

      //establish day array if not provided
      if (day === undefined) {
        day = makeDay(dayStart, dayEnd);
      }

      //base case: all events placed
      if (n === events.length) {
        return day;
      }

      //determine all of the valid times an event could possibly start
      var earliestStart = events[n].startTime;
      var latestStart = events[n].endTime - events[n].duration;

      //iterate over every possible place an event could go
      for (var i = earliestStart; i <= latestStart; i += 0.5) {
        //place that event in its starting place
        var newDay = insertEvent(day, i, events[n]);
        if (newDay) {
          //that placement worked - on to the next!
          var result = findSchedule(events, newDay, n + 1);
          if (result) {
            //eject from recursion
            return result;
          }
        } else {
          //that placement didn't work - remove it & try again
          day = removeEvent(day, events[n]);
        }
      }
      //accept defeat
      return false;
    };

    //confirm that all of the events physically fit into the day
    var validLength = checkDayLength(events);
    if (!validLength) {
      return false;
    }

    //make the actual schedule
    var madeSchedule = findSchedule(events);

    //reformat schedule by removing empty slots
    madeSchedule = madeSchedule.filter(function(value, index, array) {
      if (!value || !value.event) {
        return false;
      }
      return true;
    });

    //reformat schedule by condensing multiple events, updating to accurate startTime & endTime
    madeSchedule = madeSchedule.reduce(function(schedule, value, index, array) {

      //first instance of an event - update startTime
      if (schedule.length === 0 || array[index - 1].event.id !== value.event.id) {
        value.event.startTime = value.timeBlock;
        value = value.event;
        schedule.push(value);
        return schedule;
      }

      //last instance of an event - update endTime
      if (!array[index + 1] || (array[index + 1] && array[index + 1].event.id !== value.event.id)) {
        schedule[schedule.length - 1].endTime = value.timeBlock + 0.5;
        return schedule;
      }

      return schedule;
    }, []);

    return madeSchedule;

    // sample result of the makeSchedule function:
    // madeSchedule = [
    //   { id: 0,
    //     task: 'A',
    //     startTime: 7,
    //     endTime: 8.5,
    //     duration: 1.5,
    //     priority: 'high' },
    //   { id: 1,
    //     task: 'B',
    //     startTime: 11,
    //     endTime: 14,
    //     duration: 3,
    //     priority: 'low' }
    // ];

  };

  //make a displayable version of the numerical schedule
  var displaySchedule = function(schedule) {

    //convert a numerical time to pretty time format
    var prettyTime = function(timeNum) {
      var data = {
        timeNum: timeNum
      };

      if (timeNum % 1 === 0) {
        data.minutes = ':00';
      } else {
        data.minutes = ':30';
      }

      if (timeNum < 1) {
        data.timeNum = timeNum + 12;
      }

      if (timeNum > 12.5) {
        data.timeNum = data.timeNum - 12;
        data.meridiem = ' pm';
      } else {
        data.meridiem = ' am';
      }

      return Math.floor(data.timeNum) + data.minutes + data.meridiem;
    };

    //convert each event to pretty time format
    schedule = schedule.map(function(event, index, array) {
      return {
        task: event.task,
        time: prettyTime(event.startTime) + ' - ' + prettyTime(event.endTime)
      };
    });

    return schedule;

    // sample result of the displaySchedule function:
    // prettySchedule = [
    //   { task: 'A',
    //     time: '7:00 am - 8:30 am' },
    //   { task: 'B',
    //     time: '11:00 am - 2:00 pm' }
    // ];

  };

  //make an API-able version of the numerical schedule
  var makeAPI = function(schedule, userData) {

    //convert a numerical time to a standard internet datetime
    var makeDateTime = function(timeNum) {
      var data = {};

      if (timeNum % 1 === 0) {
        data.minutes = ':00';
      } else {
        data.minutes = ':30';
      }

      timeNum = Math.floor(timeNum);
      if (timeNum < 10) {
        data.timeNum = '0' + timeNum;
      } else {
        data.timeNum = timeNum;
      }

      var today = new Date();
      var offset = today.getTimezoneOffset() / 60;
      userData.offset = offset;

      //the JS getTimezoneOffset method returns negative of difference between UTC and local time
      if (userData.offset < 0) {
        data.offsetSign = '+';
      } else {
        data.offsetSign = '-';
      }

      //account for fractional offsets
      if (userData.offset % 1 === 0) {
        data.offsetMinutes = ':00';
      } else {
        var minutes = (userData.offset - Math.floor(userData.offset)) * 60;
        data.offsetMinutes = ':' + minutes;
      }

      if (userData.offset < 10) {
        data.offsetHour = '0' + Math.floor(userData.offset);
      } else {
        data.offsetHour = Math.floor(userData.offset);
      }

      return userData.date.slice(0, 10) + 'T' + data.timeNum + data.minutes + ':00' + data.offsetSign + data.offsetHour + data.offsetMinutes;
    };

    //convert each event to standard datetime format
    schedule = schedule.map(function(event, index, array) {
      return {
        summary: event.task,
        start: {
          dateTime: makeDateTime(event.startTime)
        },
        end:{
          dateTime: makeDateTime(event.endTime)
        }
      };
    });

    return schedule;

    // sample userData & result of the makeAPI function:
    // var userData = {
    //   offset: 7,
    //   date: '2018-05-28T00:00:00'
    // };
    // googleSchedule = [
    //   { task: 'A',
    //     time: '7:00 am - 8:30 am' },
    //   { task: 'B',
    //     time: '11:00 am - 2:00 pm' }
    // ];

    // scheduleAPI: [
    //   { summary: 'A',
    //     start: { dateTime: '2018-05-28T07:00:00-07:00' },
    //     end: { dateTime: '2018-05-28T08:30:00-07:00' }
    //   },
    //   { summary: 'B',
    //     start: { dateTime: '2018-05-28T11:00:00-07:00' },
    //     end: { dateTime: '2018-05-28T14:00:00-07:00' }
    //   }
    // ];

  };

  return {
    checkEvent: checkEvent,
    makeSchedule: makeSchedule,
    displaySchedule: displaySchedule,
    makeAPI: makeAPI
  };
})
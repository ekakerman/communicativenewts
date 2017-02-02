angular.module('app.factory', [])

.factory('Algorithm', function () {

  var makeDay = function(start, end) {
    var day = [];
    for (var i = userData.dayStart; i <= userData.dayEnd; i += 0.5) {
      day[i * 2] = {
        timeBlock: i
      };
    }
    return day;
  };



  return {
    makeDay: makeDay;

  };
})

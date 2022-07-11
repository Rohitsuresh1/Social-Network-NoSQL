const moment = require('moment');

module.exports = (time) => {
  var day = new moment(time);
  return day.format('MMMM Do YYYY, h:mm:ss a');
};
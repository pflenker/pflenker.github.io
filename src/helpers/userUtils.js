const { DateTime } = require('luxon'); 

function userComputed(data) {
  return {
    author: "Philipp Flenker",
    email: "hello@philippflenker.com",
    description: "thoughts on stuff, views on things",
    builtAt: new Date(),
    created: DateTime.fromISO(data["created-date"], { zone: "Europe/Berlin" }).toJSDate(),
    updated: DateTime.fromISO(data["updated-date"], { zone: "Europe/Berlin" }).toJSDate()
  };
}

exports.userComputed = userComputed;

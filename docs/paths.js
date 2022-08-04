const base = require('./base');
const doctors = require('./doctors');
const users = require('./users');
const appointments = require('./appointments.js');
module.exports = {
  "/verify": base["/verify"],
  "/logout": base["/logout"],
  "/doctors/": doctors["/doctors/"],
  "/doctors/login": doctors["/doctors/login"],
  "/doctors/all": doctors["/doctors/all"],
  "/users/": users["/users/"],
  "/users/login": users["/users/login/"],
  "/users/{id}": users["/users/{id}"],
  "/appointments/": appointments["/appointments/"],
  "/appointments/upcomings/{id}": appointments["/appointments/upcomings/{id}"],
  "/appointments/previous/{id}": appointments["/appointments/previous/{id}"],
  "/appointments/book/{id}": appointments["/appointments/book/{id}"]
}
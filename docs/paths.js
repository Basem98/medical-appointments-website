const base = require('./base');
const doctors = require('./doctors');
const users = require('./users');
const appointments = require('./appointments.js');
module.exports = {
  "/verify": base["/verify"],
  "/doctors/": doctors["/doctors/"],
  "/doctors/all": doctors["/doctors/all"],
  "/users/": users["/users/"],
  "/users/login": users["/users/login/"],
  "/users/{id}": users["/users/{id}"],
  "/appointments/": appointments["/appointments/"],
  "/appointments/upcomings/{id}": appointments["/appointments/upcomings/{id}"]
}
const base = require('./base');
const doctors = require('./doctors');
const users = require('./users');
const appointments = require('./appointments.js');
const admins = require('./admins');

module.exports = {
  /* ---------- Base Routes ---------- */
  "/verify": base["/verify"],
  "/logout": base["/logout"],
  /* ---------- Doctors Routes ---------- */
  "/doctors/": doctors["/doctors/"],
  "/doctors/login": doctors["/doctors/login"],
  "/doctors/all": doctors["/doctors/all"],
  /* ---------- Users Routes ---------- */
  "/users/": users["/users/"],
  "/users/login": users["/users/login/"],
  "/users/{id}": users["/users/{id}"],
  /* ---------- Appointments Routes ---------- */
  "/appointments/": appointments["/appointments/"],
  "/appointments/upcomings/{id}": appointments["/appointments/upcomings/{id}"],
  "/appointments/previous/{id}": appointments["/appointments/previous/{id}"],
  "/appointments/book/{id}": appointments["/appointments/book/{id}"],
  /* ---------- Admins Routes ---------- */
  "/admins/": admins["/admins/"],
  "/admins/login": admins["/admins/login"],
  "/admins/doctors/all": admins["/admins/doctors/all"],
  "/admins/doctors": admins["/admins/doctors"],
  "/admins/doctors/accept/{id}": admins["/admins/doctors/accept/{id}"],
  "/admins/doctors/delete/{id}": admins["/admins/doctors/delete/{id}"],
  "/admins/users/all": admins["/admins/users/all"],
  "/admins/users/delete/{id}": admins["/admins/users/delete/{id}"],
  "/admins/appointments/all": admins["/admins/appointments/all"],
  "/admins/logs": admins["/admins/logs"],
  "/admins/logs/errors": admins["/admins/logs/errors"],
}
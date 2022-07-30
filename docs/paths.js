const base = require('./base');
const doctors = require('./doctors');
const users = require('./users');

module.exports = {
  "/verify": base["/verify"],
  "/doctors/": doctors["/doctors/"],
  "/doctors/all": doctors["/doctors/all"],
  "/users/": users["/users/"],
  "/users/login": users["/users/login/"]
}
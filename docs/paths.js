const base = require('./base');
const doctors = require('./doctors');

module.exports = {
  "/verify": base["/verify"],
  "/doctors/": doctors["/doctors/"],
  "/doctors/all": doctors["/doctors/all"]
}
const base = require('./base');
const doctors = require('./doctors');

module.exports = {
  "/verify": base["/verify"],
  "/doctors/": doctors["/doctors/"]
}
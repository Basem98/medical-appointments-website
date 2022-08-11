const signUp = require('./signup.controller');
const logIn = require('./login.controller');
const getDoctorApplications = require('./applications.controller');
const getLogs = require('./logs.controller');

module.exports = {
  signUp,
  logIn,
  getDoctorApplications,
  getLogs
}
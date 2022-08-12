const signUp = require('./signup.controller');
const logIn = require('./login.controller');
const getDoctorApplications = require('./applications.controller');
const getLogs = require('./logs.controller');
const acceptDoctorsApplication = require('./accept.controller');

module.exports = {
  signUp,
  logIn,
  getDoctorApplications,
  getLogs,
  acceptDoctorsApplication
}
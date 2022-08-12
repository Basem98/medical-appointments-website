const signUp = require('./signup.controller');
const logIn = require('./login.controller');
const getDoctorApplications = require('./applications.controller');
const getLogs = require('./logs.controller');
const acceptDoctorsApplication = require('./accept.controller');
const deleteDoctor = require('../admin/deleteDoctor.controller');

module.exports = {
  signUp,
  logIn,
  getDoctorApplications,
  getLogs,
  acceptDoctorsApplication,
  deleteDoctor
}
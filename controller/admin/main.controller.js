const signUp = require('./signup.controller');
const logIn = require('./login.controller');
const getDoctorApplications = require('./applications.controller');
const { getLogs, deleteLogs } = require('./logs.controller');
const acceptDoctorsApplication = require('./accept.controller');
const deleteDoctor = require('../admin/deleteDoctor.controller');
const getAllDoctors = require('../admin/doctors.controller');
const getAllUsers = require('../admin/users.controller');

module.exports = {
  signUp,
  logIn,
  getDoctorApplications,
  getLogs,
  deleteLogs,
  acceptDoctorsApplication,
  deleteDoctor,
  getAllDoctors,
  getAllUsers
}
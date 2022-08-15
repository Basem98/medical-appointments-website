const signUp = require('./signup.controller');
const logIn = require('./login.controller');
const getDoctorApplications = require('./applications.controller');
const { getLogs, deleteLogs } = require('./logs.controller');
const acceptDoctorsApplication = require('./accept.controller');
const deleteDoctor = require('../admin/deleteDoctor.controller');
const getAllDoctors = require('../admin/doctors.controller');
const getAllUsers = require('../admin/users.controller');
const deleteUser = require('../admin/deleteUser.controller');
const getAllAppointments = require('../admin/appointments.controller');
const getUpcomingAppointments = require('../admin/upcomingAppointment.controller');
const getPreviousAppointments = require('../admin/prevAppointments.controller');
const deleteAppointment = require('../admin/deleteAppointment.controller');

module.exports = {
  signUp,
  logIn,
  getDoctorApplications,
  getLogs,
  deleteLogs,
  acceptDoctorsApplication,
  deleteDoctor,
  getAllDoctors,
  getAllUsers,
  deleteUser,
  getAllAppointments,
  getUpcomingAppointments,
  getPreviousAppointments,
  deleteAppointment
}
const express = require('express');
const adminRouter = express.Router();
const { signUp, logIn, getDoctorApplications, getLogs, acceptDoctorsApplication, deleteDoctor, getAllDoctors, deleteLogs, getAllUsers, deleteUser, getAllAppointments, getUpcomingAppointments, getPreviousAppointments, deleteAppointment, getAppointmentStatistics } = require('../controller/admin/main.controller');
const validationResult = require('../middleware/user/validation.middleware');
const validateAdminData = require('../middleware/admin/validation.middleware');
const protectAdminsRoute = require('../middleware/admin/auth.middleware');


/* ---------- An endpoint to register a new admin ---------- */
adminRouter.post('/', validateAdminData, validationResult, signUp);

/* ---------- An endpoint to log as admin in ---------- */
adminRouter.post('/login', validateAdminData.slice(1), validationResult, logIn);



/* -------------------- Operations on Doctors -------------------- */

/* ---------- An endpoint to get all doctors in the database by page ---------- */
adminRouter.get('/doctors/all', protectAdminsRoute, getAllDoctors);

/* ---------- An endpoint to get all non-accepted doctors' applications ---------- */
adminRouter.get('/doctors', protectAdminsRoute, getDoctorApplications);

/* ---------- An endpoint to accept a doctor's application ---------- */
adminRouter.put('/doctors/accept/:id', protectAdminsRoute, acceptDoctorsApplication);

/* ---------- An endpoint to reject a doctor's application | to delete a doctor ---------- */
adminRouter.delete('/doctors/delete/:id', protectAdminsRoute, deleteDoctor);



/* -------------------- Operations on Users -------------------- */

/* ---------- An endpoint to get all users in the database by page ---------- */
adminRouter.get('/users/all', protectAdminsRoute, getAllUsers);

/* ---------- An endpoint to delete a user ---------- */
adminRouter.delete('/users/delete/:id', protectAdminsRoute, deleteUser);



/* -------------------- Operations on Logs -------------------- */

/* ---------- An endpoint to get all logs by page ---------- */
adminRouter.get('/logs', protectAdminsRoute, getLogs);

/* ---------- An endpoint to get only error logs by page ---------- */
adminRouter.get('/logs/errors', protectAdminsRoute, getLogs);

/* ---------- An endpoint to delete all logs ---------- */
adminRouter.delete('/logs', deleteLogs);



/* -------------------- Operations on Appointments -------------------- */

/* ---------- An endpoint to get all appointments ---------- */
adminRouter.get('/appointments/all', protectAdminsRoute, getAllAppointments);

/* ---------- An endpoint to get upcoming appointments ---------- */
adminRouter.get('/appointments/upcoming', protectAdminsRoute, getUpcomingAppointments);

/* ---------- An endpoint to get previous appointments ---------- */
adminRouter.get('/appointments/previous', protectAdminsRoute, getPreviousAppointments);

/* ---------- An endpoint to get delete an appointment ---------- */
adminRouter.delete('/appointments/delete/:id', protectAdminsRoute, deleteAppointment);

/* ---------- An endpoint to get statistics for the appointments ---------- */
adminRouter.get('/appointments/statistics', protectAdminsRoute, getAppointmentStatistics);

module.exports = adminRouter;
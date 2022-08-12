const express = require('express');
const adminRouter = express.Router();
const { signUp, logIn, getDoctorApplications, getLogs, acceptDoctorsApplication, deleteDoctor } = require('../controller/admin/main.controller');
const validationResult = require('../middleware/user/validation.middleware');
const validateAdminData = require('../middleware/admin/validation.middleware');
const protectAdminsRoute = require('../middleware/admin/auth.middleware');


/* ---------- An endpoint to register a new admin ---------- */
adminRouter.post('/', validateAdminData, validationResult, signUp);

/* ---------- An endpoint to log as admin in ---------- */
adminRouter.post('/login', validateAdminData.slice(1), validationResult, logIn);

/* ---------- An endpoint to get all non-accepted doctors' applications ---------- */
adminRouter.get('/doctors', protectAdminsRoute, getDoctorApplications);

/* ---------- An endpoint to get all logs by page ---------- */
adminRouter.get('/logs', protectAdminsRoute, getLogs);

/* ---------- An endpoint to accept a doctor's application ---------- */
adminRouter.put('/doctors/accept/:id', protectAdminsRoute, acceptDoctorsApplication);

/* ---------- An endpoint to accept a doctor's application ---------- */
adminRouter.delete('/doctors/delete/:id', protectAdminsRoute, deleteDoctor);

module.exports = adminRouter;
const express = require('express');
const adminRouter = express.Router();
const { signUp, logIn, getDoctorApplications } = require('../controller/admin/main.controller');
const validationResult = require('../middleware/user/validation.middleware');
const validateAdminData = require('../middleware/admin/validation.middleware');
const protectAdminsRoute = require('../middleware/admin/auth.middleware');


/* ---------- An endpoint to register a new admin ---------- */
adminRouter.post('/', validateAdminData, validationResult, signUp);

/* ---------- An endpoint to log as admin in ---------- */
adminRouter.post('/login', validateAdminData.slice(1), validationResult, logIn);

/* ---------- An endpoint to get all non-accepted doctors' applications ---------- */
adminRouter.get('/doctors', protectAdminsRoute, getDoctorApplications);

module.exports = adminRouter;
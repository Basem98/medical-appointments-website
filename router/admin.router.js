const express = require('express');
const adminRouter = express.Router();
const { signUp, logIn } = require('../controller/admin/main.controller');
const validationResult = require('../middleware/user/validation.middleware');
const validateAdminData = require('../middleware/admin/validation.middleware');



/* ---------- An endpoint to register a new admin ---------- */
adminRouter.post('/', validateAdminData, validationResult, signUp);

/* ---------- An endpoint to log as admin in ---------- */
adminRouter.post('/login', validateAdminData.slice(1), validationResult, logIn);


module.exports = adminRouter;
const express = require('express');
const doctorRouter = express.Router();
const { validateUserData } = require('../middleware/doctor/signup.middleware');
const validationResult = require('../middleware/user/validation.middleware');
const { signUp } = require('../controller/doctors/main.controller');
const {verifyEmail} = require('../middleware/verification.middleware');


doctorRouter.post('/', validateUserData(), validationResult, signUp, verifyEmail);

module.exports = doctorRouter;
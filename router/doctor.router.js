const express = require('express');
const doctorRouter = express.Router();
const { validateUserData } = require('../middleware/doctor/signup.middleware');
const validationResult = require('../middleware/user/validation.middleware');
const { signUp, getDoctorById, uploadImages } = require('../controller/doctors/main.controller');
const { verifyEmail } = require('../middleware/verification.middleware');
const { isAlreadyInDb } = require('../middleware/doctor/exists.middleware');
const multerUpload = require('../middleware/multer.middleware');
const bufferFileToString = require('../middleware/bufToString.middleware');
const { isEmailAlreadyInDb, isPhoneAlreadyInDb } = require('../controller/doctors/exists.controller');

doctorRouter.post('/', validateUserData(), validationResult, isAlreadyInDb, signUp, verifyEmail);
doctorRouter.post('/upload/images', multerUpload.array('images', 2), bufferFileToString, uploadImages);
doctorRouter.post('/validate/email', isEmailAlreadyInDb);
doctorRouter.post('/validate/phone', isPhoneAlreadyInDb);

doctorRouter.route('/:id').get(getDoctorById);

module.exports = doctorRouter;
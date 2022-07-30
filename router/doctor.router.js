const express = require('express');
const doctorRouter = express.Router();
const { validateUserData } = require('../middleware/doctor/signup.middleware');
const validationResult = require('../middleware/user/validation.middleware');
const { signUp, getDoctorById, uploadImages, getDoctorsByPage } = require('../controller/doctors/main.controller');
const { verifyEmail } = require('../middleware/verification.middleware');
const { isAlreadyInDb } = require('../middleware/doctor/exists.middleware');
const multerUpload = require('../middleware/multer.middleware');
const bufferFileToString = require('../middleware/bufToString.middleware');
const { isEmailAlreadyInDb, isPhoneAlreadyInDb } = require('../controller/doctors/exists.controller');


/* ---------- An endpoint to register new doctors ---------- */
doctorRouter.post('/', validateUserData(), validationResult, isAlreadyInDb, signUp, verifyEmail);

/* ---------- An endpoint to upload the new doctor's profile picture & professional license ---------- */
doctorRouter.post('/upload/images', multerUpload.array('images', 2), bufferFileToString, uploadImages);

/* ---------- An endpoint to validate whether the new doctor's email is duplicated or not ---------- */
doctorRouter.post('/validate/email', isEmailAlreadyInDb);

/* ---------- An endpoint to validate whether the new doctor's phone number is duplicated or not ---------- */
doctorRouter.post('/validate/phone', isPhoneAlreadyInDb);

/* ---------- An endpoint to get a list of doctors (with pagination based on page/limit queries) ---------- */
doctorRouter.get('/all', getDoctorsByPage);

/* ---------- An endpoint to get a specific doctor document by its id ---------- */
doctorRouter.route('/:id').get(getDoctorById);

module.exports = doctorRouter;
const express = require('express');
const doctorRouter = express.Router();
const { validateUserData } = require('../middleware/doctor/signup.middleware');
const validationResult = require('../middleware/user/validation.middleware');
const { signUp, login, getDoctorById, uploadImages, getDoctorsByPage, getTopRated, changeDoctorPassword } = require('../controller/doctors/main.controller');
const { generateVerificationToken, genSignUpEmailBody } = require('../middleware/verification.middleware');
const { isAlreadyInDb } = require('../middleware/doctor/exists.middleware');
const multerUpload = require('../middleware/multer.middleware');
const bufferFileToString = require('../middleware/bufToString.middleware');
const { isEmailAlreadyInDb, isPhoneAlreadyInDb } = require('../controller/doctors/exists.controller');
const { sendMail } = require('../controller/doctors/emails.controller');
const protectDoctorsRoute = require('../middleware/doctor/auth.middleware');


/* ---------- An endpoint to register new doctors ---------- */
doctorRouter.post('/', validateUserData(), validationResult, isAlreadyInDb, signUp, generateVerificationToken, genSignUpEmailBody, sendMail);

/* ---------- An endpoint to upload the new doctor's profile picture & professional license ---------- */
doctorRouter.post('/upload/images', multerUpload.array('images', 2), bufferFileToString, uploadImages);

/* ---------- An endpoint to validate whether the new doctor's email is duplicated or not ---------- */
doctorRouter.post('/validate/email', isEmailAlreadyInDb);

/* ---------- An endpoint to validate whether the new doctor's phone number is duplicated or not ---------- */
doctorRouter.post('/validate/phone', isPhoneAlreadyInDb);

/* ---------- An endpoint to get the top 3 rated doctors ---------- */
doctorRouter.get('/top', getTopRated);

/* ---------- An endpoint to get a list of doctors (with pagination based on page/limit queries) ---------- */
doctorRouter.get('/all', getDoctorsByPage);

/* ---------- An endpoint to sign in doctors ---------- */
doctorRouter.post('/login', login);

/* ---------- An endpoint to get a specific doctor document by its id ---------- */
doctorRouter.route('/:id').get(getDoctorById);

/* ---------- An endpoint to change doctor's password ---------- */
doctorRouter.route('/:id/change-password').patch(protectDoctorsRoute, changeDoctorPassword);


module.exports = doctorRouter;
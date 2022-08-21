const express = require('express');
const baseRouter = express.Router();
const userRouter = require('./user.router');
const doctorRouter = require('./doctor.router');
const adminRouter = require('./admin.router');
const appointmentRouter = require('./appointment.router');
const { verifyToken, logout, verifyBeforeForgetPassword, updatePassword, prepareBodyBeforeTokenRegen, authenticateCookie } = require('../controller/base.controller');
const { generateVerificationToken, genForgetPassEmailBody, genSignUpEmailBody } = require('../middleware/verification.middleware');
const { sendMail, sendUserEmail } = require('../controller/doctors/emails.controller');
const validateBeforeChangingPassword = require('../middleware/changePassword.middleware');
const validationResult = require('../middleware/user/validation.middleware');

/* ---------- An endpoint to verify the user's email ---------- */
baseRouter.put('/verify/:token', verifyToken);

/* ---------- An endpoint to logout users & delete their cookies ---------- */
baseRouter.get('/logout', logout);

/* ---------- An endpoint to request a verification token to change password ---------- */
baseRouter.post('/send-password-change', verifyBeforeForgetPassword, generateVerificationToken, genForgetPassEmailBody, sendMail);

/* ---------- An endpoint to resend a verification token ---------- */
baseRouter.post('/resend-verification', prepareBodyBeforeTokenRegen, generateVerificationToken, genSignUpEmailBody, sendMail);

/* ---------- An endpoint to change a doctor's password ---------- */
baseRouter.post('/change-password', validateBeforeChangingPassword, validationResult, updatePassword);

/* ---------- An endpoint to authenticate cookies ---------- */
baseRouter.get('/authenticate', authenticateCookie);

/* ---------- An endpoint to send the user's complaint to our email ---------- */
baseRouter.post('/contact', sendUserEmail)

module.exports = {
  baseRouter,
  userRouter,
  doctorRouter,
  adminRouter,
  appointmentRouter
}
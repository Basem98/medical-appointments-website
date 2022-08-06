const express = require('express');
const baseRouter = express.Router();
const userRouter = require('./user.router');
const doctorRouter = require('./doctor.router');
const adminRouter = require('./admin.router');
const appointmentRouter = require('./appointment.router');
const {verifyToken, logout, verifyBeforeForgetPassword} = require('../controller/base.controller');
const { generateVerificationToken, genForgetPassEmailBody } = require('../middleware/verification.middleware');
const { sendMail } = require('../controller/doctors/emails.controller');

/* ---------- An endpoint to verify the user's email ---------- */
baseRouter.put('/verify/:token', verifyToken);

/* ---------- An endpoint to logout users & delete their cookies ---------- */
baseRouter.get('/logout', logout);

/* ---------- An endpoint to logout users & delete their cookies ---------- */
baseRouter.post('/verify-old', verifyBeforeForgetPassword, generateVerificationToken, genForgetPassEmailBody, sendMail);


module.exports = {
  baseRouter,
  userRouter,
  doctorRouter,
  adminRouter,
  appointmentRouter
}
const express = require('express');
const baseRouter = express.Router();
const userRouter = require('./user.router');
const doctorRouter = require('./doctor.router');
const adminRouter = require('./admin.router');
const appointmentRouter = require('./appointment.router');
const {verifyToken, logout} = require('../controller/base.controller');

/* ---------- An endpoint to verify the user's email ---------- */
baseRouter.put('/verify', verifyToken);

/* ---------- An endpoint to logout users & delete their cookies ---------- */
baseRouter.get('/logout', logout);

module.exports = {
  baseRouter,
  userRouter,
  doctorRouter,
  adminRouter,
  appointmentRouter
}
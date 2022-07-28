const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require('../controller/appointment/addAppointment.controller');

appointmentRouter.route('/')
    .post(appointmentController.addAppointment)

module.exports = appointmentRouter;
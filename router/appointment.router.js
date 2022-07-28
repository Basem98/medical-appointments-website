const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require('../controller/appointment/main.controller');

appointmentRouter.route('/')
    .post(appointmentController.addAppointment)

appointmentRouter.route('/upcomings/:id')
    .get(appointmentController.getUpcomingsById);

module.exports = appointmentRouter;
const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require('../controller/appointment/main.controller');
const protectDoctorsRoute = require("../middleware/doctor/auth.middleware");
const generalAuthenticationMiddleware = require("../middleware/generalAuthentication.middleware");
const authorizationMiddleware = require("../middleware/user/authorization.middleware");

appointmentRouter.route('/')
    .post(protectDoctorsRoute, appointmentController.addAppointment)

appointmentRouter.route('/book/:id')
    .post(authorizationMiddleware, appointmentController.bookAppointment)

appointmentRouter.route('/upcomings/:id')
    .get(generalAuthenticationMiddleware, appointmentController.getUpcomings);

appointmentRouter.route('/previous/:id')
    .get(generalAuthenticationMiddleware, appointmentController.getPrevious);

appointmentRouter.route('/available')
    .get(protectDoctorsRoute, appointmentController.getAvailable);
    
appointmentRouter.put('/:id', protectDoctorsRoute, appointmentController.editAppointment);

appointmentRouter.put('/:id/cancel', generalAuthenticationMiddleware, appointmentController.cancelAppointment);

module.exports = appointmentRouter;
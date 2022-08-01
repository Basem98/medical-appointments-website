const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require('../controller/appointment/main.controller');
const authorizationMiddleware = require("../middleware/user/authorization.middleware");

appointmentRouter.route('/')
    .post(authorizationMiddleware, appointmentController.addAppointment)

appointmentRouter.route('/upcomings/:id')
    .get(authorizationMiddleware, appointmentController.getUpcomings);

appointmentRouter.route('/previous/:id')
    .get(authorizationMiddleware, appointmentController.getPrevious);

module.exports = appointmentRouter;
const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/users/main.controller');
const validationMiddleware = require('../middleware/validation.middleware');


userRouter.route('/')
    .post(userController.validateUserData(), validationMiddleware, userController.addUser)


module.exports = userRouter;
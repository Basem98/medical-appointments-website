const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/users/main.controller');
const authorizationMiddleware = require('../middleware/authorization.middleware');
const validationMiddleware = require('../middleware/validation.middleware');


userRouter.route('/')
    .post(userController.validateUserData(), validationMiddleware, userController.addUser)

userRouter.route('/login')
    .post(userController.loginUser)

userRouter.route('/:id')
    .get(authorizationMiddleware, userController.getUserById)

module.exports = userRouter;
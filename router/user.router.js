const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/users/main.controller');
const authorizationMiddleware = require('../middleware/user/authorization.middleware');
const validationMiddleware = require('../middleware/user/validation.middleware');


userRouter.route('/')
    .post(userController.validateUserData(), validationMiddleware, userController.addUser)

userRouter.route('/login')
    .post(userController.loginUser)

userRouter.route('/:id')
    .get(authorizationMiddleware, userController.getUserById)
    .delete(authorizationMiddleware, userController.deleteUserById);

module.exports = userRouter;
const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/users/main.controller');
const authorizationMiddleware = require('../middleware/user/authorization.middleware');
const checkDuplicate = require('../middleware/user/checkDuplicate.middleware');
const validationMiddleware = require('../middleware/user/validation.middleware');
const { verifyEmail } = require('../middleware/verification.middleware');


userRouter.route('/')
    .post(userController.validateUserData(), validationMiddleware,checkDuplicate, userController.addUser, verifyEmail)

userRouter.route('/login')
    .post(userController.loginUser)

userRouter.route('/:id')
    .get(authorizationMiddleware, userController.getUserById)
    .delete(authorizationMiddleware, userController.deleteUserById)
    .patch(authorizationMiddleware, userController.validateUserData(), validationMiddleware, userController.updateUserById)

module.exports = userRouter;
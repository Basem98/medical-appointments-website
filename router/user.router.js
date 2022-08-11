const express = require('express');
const { sendMail } = require('../controller/doctors/emails.controller');
const { changePassword } = require('../controller/users/changePassword');
const userRouter = express.Router();
const { addUser, getUserById, deleteUserById, loginUser, updateUserById, validateUserData } = require('../controller/users/main.controller');
const authorizationMiddleware = require('../middleware/user/authorization.middleware');
const checkDuplicate = require('../middleware/user/checkDuplicate.middleware');
const validationMiddleware = require('../middleware/user/validation.middleware');
const { generateVerificationToken, genSignUpEmailBody } = require('../middleware/verification.middleware');


userRouter.route('/')
    .post(validateUserData(), validationMiddleware, checkDuplicate, addUser, generateVerificationToken, genSignUpEmailBody, sendMail);

userRouter.route('/login')
    .post(loginUser)

userRouter.route('/:id')
    .get(authorizationMiddleware, getUserById)
    .delete(authorizationMiddleware, deleteUserById)
    .patch(authorizationMiddleware, validateUserData(), validationMiddleware, updateUserById)

userRouter.route('/:id/change-password')
    .patch(authorizationMiddleware, validateUserData(), validationMiddleware, changePassword)

module.exports = userRouter;
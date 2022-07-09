const { body } = require('express-validator');

module.exports.validateUserData = () => {
    return [
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('First Name length between 2 to 50 characters'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('Last Name length between 2 to 50 characters'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isStrongPassword().withMessage('Password is weak'),
        body('phoneNumber').isMobilePhone().withMessage('Invalid Phone Number')
    ];
}
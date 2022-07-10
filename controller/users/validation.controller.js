const { body } = require('express-validator');

module.exports.validateUserData = () => {
    return [
        body('firstName').optional().isLength({ min: 2, max: 50 }).withMessage('First Name length between 2 to 50 characters'),
        body('lastName').optional().isLength({ min: 2, max: 50 }).withMessage('Last Name length between 2 to 50 characters'),
        body('email').optional().isEmail().withMessage('Invalid Email'),
        body('password').optional().isStrongPassword().withMessage('Password is weak'),
        body('phoneNumber').optional().isMobilePhone().withMessage('Invalid Phone Number')
    ];
}
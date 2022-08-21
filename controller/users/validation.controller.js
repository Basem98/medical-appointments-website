const { body } = require('express-validator');

module.exports.validateUserData = () => {
    return [
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('First Name length between 2 to 50 characters'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('Last Name length between 2 to 50 characters'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password')
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage('Password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol'),
        body('phoneNumber').isMobilePhone('ar-EG').withMessage('Invalid Phone Number')
    ];
}

module.exports.validateUpdatedPassword = () => {
    return [
        body('password')
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage('Password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol')
    ];
}

module.exports.validateUserSettings = () => {
    return [
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('First Name length between 2 to 50 characters'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('Last Name length between 2 to 50 characters'),
        body('phoneNumber').isMobilePhone('ar-EG').withMessage('Invalid Phone Number')
    ];
}
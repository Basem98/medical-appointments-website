const { body } = require('express-validator');

const validateBeforeChangingPassword = [
  body('email').isEmail().withMessage('Invalid email'),
  body('newPassword')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol'),
    body('role').isString().isIn(['User', 'Doctor']).withMessage('The role should either be \"Doctor\" or \"User\" ')
];


module.exports = validateBeforeChangingPassword;
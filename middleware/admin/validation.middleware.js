const { body } = require('express-validator');

module.exports = [
  body('username').isLength({ min: 2, max: 50 }).withMessage('Username length must be between 2 to 50 characters'),
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
]
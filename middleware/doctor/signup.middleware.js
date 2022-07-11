const { body } = require('express-validator');

const experienceFieldKeys = ['title', 'workplace', 'location', 'startDate'];
const educationFieldKeys = ['degree', 'granter', 'issueDate'];
const certificationsFieldKeys = ['title', 'granter', 'issueDate'];
const clinicsFieldKeys = ['name', 'address', 'phone'];


/**
 * A custom validator that takes an array of objects
 * to check that all its elements are objects containing the required keys
 * @returns true if the validation succeeds, otherwise it throws an error
 * that's going to be caught by the middleware
 */
function doElementsContainKeys(arrInput = [{}], requiredKeys = [''], fieldName = '') {
  if (arrInput.length < 1) throw new Error('This field should not be an empty array');

  for(let i = 0; i < arrInput.length; i++)
    requiredKeys.forEach(key => {
      if (!arrInput[i].hasOwnProperty(key))
        throw new Error(`The ${fieldName} field must contain the ${key} property`);
    });

  return true;
}

/**
 * A validation middleware based on express-validator
 * @returns an array of validation functions that validate the request's body contents
 */
function validateUserData() {
    return [
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('First Name length must between 2 to 50 characters'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('Last Name length must between 2 to 50 characters'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        })
        .withMessage('Password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol'),
        body('phoneNumber').isMobilePhone('ar-EG').withMessage('Invalid Egyptian Phone Number'),
        body('specialization').exists().withMessage('Specialization field is missing'),
        body('experiences').isArray({ min: 1}).custom(inputValue => doElementsContainKeys(inputValue, experienceFieldKeys, 'experiences')),
        body('education').isArray({ min: 1}).custom(inputValue => doElementsContainKeys(inputValue, educationFieldKeys, 'education')),
        body('certifications').optional(true).isArray({ min: 1}).custom(inputValue => doElementsContainKeys(inputValue, certificationsFieldKeys, 'certifications')),
        body('clinics').isArray({ min: 1}).custom(inputValue => doElementsContainKeys(inputValue, clinicsFieldKeys, 'clinics'))
    ];
}

module.exports = {
  validateUserData
}
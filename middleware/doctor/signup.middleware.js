const { body } = require('express-validator');

const experienceFieldKeys = ['title', 'workplace', 'location', 'startDate'];
const educationFieldKeys = ['degree', 'granter', 'issueDate'];
const certificationsFieldKeys = ['title', 'granter', 'issueDate'];
const clinicsFieldKeys = ['name', 'address', 'phone'];
const addressKeys = ['city', 'country', 'governorate', 'buildingNo', 'streetName'];
const locationKeys = ['city', 'country'];
// const clinicPhoneKeys = ['mobile', 'landline'];

function validateClinicPhone(clinics) {
  clinics.forEach(clinic => {
    if (!clinic.phone.mobile.match(/^01[0125][0-9]{8}$/))
      throw new Error('The clinic\'s mobile number must be a valid Egyptian phone number');
    if (clinic.phone.landline && !clinic.phone.landline.match(/^0[1-9][0-9]{7,8}$/))
      throw new Error('The clinic\'s landline number must be a valid Egyptian landline with the governorate code');
  });
  return true;
}

/**
 * A custom validator that takes an array of objects
 * to check that all its elements are objects containing the required keys
 * @returns true if the validation succeeds, otherwise it throws an error
 * that's going to be caught by the middleware
 */
function doElementsContainKeys(arrInput = [{}], requiredKeys = [''], fieldName = '') {
  if (arrInput.length < 1) throw new Error('This field should not be an empty array');

  for (let i = 0; i < arrInput.length; i++)
    requiredKeys.forEach(key => {
      if (!arrInput[i].hasOwnProperty(key))
        throw new Error(`The ${fieldName} field must contain the ${key} property`);
    });

  return true;
}

/**
 * A custom validator that takes an object which is a subdocument
 * to check that it contains all the required keys it should have
 * @returns true if the validation succeeds, otherwise it throws an error
 * that's going to be caught by the middleware
 */
function doesFieldContainKeys(arrInput = [{}], requiredKeys = [''], subFieldName = '') {
  for (let i = 0; i < arrInput.length; i++) {
    requiredKeys.forEach(key => {
      if (!arrInput[i][subFieldName].hasOwnProperty(key))
        throw new Error(`The ${subFieldName} field must contain the ${key} property`);
    });
  }

  return true
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
    body('experiences').isArray({ min: 1 }).custom(inputValue => doElementsContainKeys(inputValue, experienceFieldKeys, 'experiences'))
      .custom(inputValue => doesFieldContainKeys(inputValue, locationKeys, 'location')),
    body('education').isArray({ min: 1 }).custom(inputValue => doElementsContainKeys(inputValue, educationFieldKeys, 'education')),
    body('certifications').optional(true).isArray({ min: 1 }).custom(inputValue => doElementsContainKeys(inputValue, certificationsFieldKeys, 'certifications')),
    body('clinics').isArray({ min: 1 }).custom(inputValue => doElementsContainKeys(inputValue, clinicsFieldKeys, 'clinics'))
      .custom(inputValue => doesFieldContainKeys(inputValue, addressKeys, 'address'))
      .custom(inputValue => validateClinicPhone(inputValue))
  ];
}

module.exports = {
  validateUserData
}
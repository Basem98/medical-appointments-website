const signUp = require('./signup.controller');
const getDoctorById = require('./getDoctorById.controller');
const { uploadImages } = require('./files.controller');
const getDoctorsByPage = require('./pagination.controller');

module.exports = {
  signUp,
  getDoctorById,
  uploadImages,
  getDoctorsByPage
}
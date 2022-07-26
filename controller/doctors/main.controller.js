const signUp = require('./signup.controller');
const getDoctorById = require('./getDoctorById.controller');
const {uploadImages} = require('./files.controller');

module.exports = {
  signUp,
  getDoctorById,
  uploadImages
}
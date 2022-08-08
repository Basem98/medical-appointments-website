const signUp = require('./signup.controller');
const getDoctorById = require('./getDoctorById.controller');
const { uploadImages } = require('./files.controller');
const getDoctorsByPage = require('./pagination.controller');
const login = require('./signin.controller');
const getTopRated = require('./topRated.controller');

module.exports = {
  signUp,
  login,
  getDoctorById,
  uploadImages,
  getDoctorsByPage,
  getTopRated
}
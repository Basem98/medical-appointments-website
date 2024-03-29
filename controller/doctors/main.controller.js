const signUp = require('./signup.controller');
const getDoctorById = require('./getDoctorById.controller');
const { uploadImages } = require('./files.controller');
const getDoctorsByPage = require('./pagination.controller');
const login = require('./signin.controller');
const getTopRated = require('./topRated.controller');
const changeDoctorPassword = require('./changeDoctorPassword.controller');
const getPatients = require('./getPatients.controller');
const calculateRating = require('./rate.controller');

module.exports = {
  signUp,
  login,
  getDoctorById,
  uploadImages,
  getDoctorsByPage,
  getTopRated,
  changeDoctorPassword,
  getPatients,
  calculateRating
}
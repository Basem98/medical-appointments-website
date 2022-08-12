const Doctor = require('../../model/doctor.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("../../config/envConfig");
const {generateCookie} = require('../../middleware/helpers/cookie.helper');


const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const doctorData = await Doctor.findOne({ email });
    let signInErr = new Error();
    /* Check if a doctor exists with this email in the database */
    if (!doctorData) {
      signInErr.statusCode = 404
      signInErr.message = 'Incorrect email or password';
      throw signInErr;
    }
    /* Check if the password is accurate */
    const isPasswordAccurate = await bcrypt.compare(password, doctorData.password);
    if (!isPasswordAccurate) {
      signInErr.statusCode = 404
      signInErr.message = 'Incorrect email or password';
      throw signInErr;
    }
    doctorData.password = null;
    /* Generate a JWT access token */
    const cookie = generateCookie({ id: doctorData._id, role: 'Doctor' }, config.AUTH.DOCTOR_SECRET, rememberMe, next);
    /* Send a response to client to confirm the signing in success and set the cookie */
    res
      .status(200)
      .cookie('accessToken', cookie.accessToken, cookie.cookieOptions)
      .cookie('role', 'Doctor', cookie.cookieOptions)
      .json({ message: 'You are now signed in successfully', data: doctorData });
  } catch (err) {
  next(err);
}
}

module.exports = login;
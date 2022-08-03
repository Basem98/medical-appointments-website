const Doctor = require('../../model/doctor.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("../../config/envConfig");


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
    const tokenIdentity = { id: doctorData._id, role: 'Doctor' };
    const tokenOptions = { expiresIn: 3600 };
    tokenOptions.expiresIn = rememberMe ? (30 * 24 * 60 * 60) : tokenOptions.expiresIn;
    const accessToken = jwt.sign(tokenIdentity, config.AUTH.DOCTOR_SECRET, tokenOptions);
    /* Send a response to client to confirm the signing in success and set the cookie */
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        // Turn the maxAge number into milliseconds (specific to Express)
        maxAge: tokenOptions.expiresIn * 1000,
        secure: true,
        httpOnly: true
      })
      .json({ message: 'You are now signed in successfully', data: doctorData });
  } catch (err) {
    next(err);
  }
}

module.exports = login;
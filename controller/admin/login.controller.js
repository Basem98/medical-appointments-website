const Admin = require('../../model/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/envConfig');
const { generateCookie } = require('../../middleware/helpers/cookie.helper');


const logIn = async (req, res, next) => {
  try {
    const adminData = await Admin.findOne({ email: req.body.email });
    if (!adminData) {
      const err = new Error('Wrong email or password');
      err.statusCode = 404;
      throw err;
    }
    const isPasswordAccurate = await bcrypt.compare(req.body.password, adminData.password);
    if (!isPasswordAccurate) {
      const err = new Error('Wrong email or password');
      err.statusCode = 404;
      throw err;
    }
    adminData.password = null;
    /* Generate a JWT access token */
    const cookie = generateCookie({ id: adminData._id, role: 'Admin' }, config.AUTH.ADMIN_SECRET, false, next);
    /* Send a response to client to confirm the signing in success and set the cookie */
    res
      .status(200)
      .cookie('accessToken', cookie.accessToken, cookie.cookieOptions)
      .cookie('role', 'Admin', cookie.cookieOptions)
      .json({ message: 'You are now signed in successfully', data: adminData });

  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = logIn;
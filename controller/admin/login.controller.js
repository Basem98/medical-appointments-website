const Admin = require('../../model/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/envConfig');

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
    const tokenIdentity = { id: adminData._id, role: 'Admin' };
    const tokenOptions = { expiresIn: 3600 };
    const accessToken = jwt.sign(tokenIdentity, config.AUTH.ADMIN_SECRET, tokenOptions);
    /* Send a response to client to confirm the signing in success and set the cookie */
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        // Turn the maxAge number into milliseconds (specific to Express)
        maxAge: tokenOptions.expiresIn * 1000,
        secure: true,
        httpOnly: true
      })
      .json({ message: 'You are now signed in successfully', data: adminData });

  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = logIn;
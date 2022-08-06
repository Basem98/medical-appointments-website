const Doctor = require('../model/doctor.model');
const User = require('../model/user.model');
const Token = require('../model/token.model');

const customErr = { msg: '' };
customErr.toString = function () { return this.msg }

async function verifyToken(req, res, next) {
  try {
    const tokenData = await Token.findOne({ token: req.params.token });
    if (!tokenData) {
      customErr.msg = 'This token does not exist or it has expired';
      customErr.statusCode = 404;
      return next(customErr);
    }
    let modelToUse = tokenData.userRole == 'User' ? User : Doctor;
    const tokenUser = await modelToUse.findById(tokenData.userId);
    if (!tokenUser) {
      customErr.msg = 'Invalid token data';
      customErr.statusCode = 404;
      return next(customErr);
    }

    tokenUser.isVerified = true;
    await tokenUser.save();
    await Token.findByIdAndDelete(tokenData._id);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}

function logout(req, res, next) {
  try {
    res
      .cookie('accessToken', null, {
        maxAge: 0,
        secure: true,
        httpOnly: true
      })
      .status(200)
      .json({ message: 'Signed out successfully' });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function verifyBeforeForgetPassword(req, res, next) {
  try {
    const { email, role } = req.body;
    const modelToUse = role === 'User' ? User : Doctor;
    const data = await modelToUse.findOne({ email });
    if (!data) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    delete data.password;
    req.body = data;
    req.body.id = data._id;
    req.body.role = role;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = {
  verifyToken,
  logout,
  verifyBeforeForgetPassword
}
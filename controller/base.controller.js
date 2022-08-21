const bcrypt = require('bcrypt');
const Doctor = require('../model/doctor.model');
const User = require('../model/user.model');
const Token = require('../model/token.model');
const { verifyAuthHttpCookie } = require('../middleware/helpers/cookie.helper');
const envConfig = require('../config/envConfig');
const Admin = require('../model/admin.model');

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
    res.status(200).json({ message: 'Email verified successfully', data: { email: tokenUser.email, role: tokenData.userRole } });
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
        sameSite: 'None',
        httpOnly: true
      })
      .cookie('role', null, {
        maxAge: 0,
        secure: true,
        sameSite: 'None',
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


async function prepareBodyBeforeTokenRegen(req, res, next) {
  try {
    const { id, role } = req.body;
    const modelToUse = role === 'User' ? User : Doctor;
    const data = await modelToUse.findById(id);
    console.log(data)
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


async function updatePassword(req, res, next) {
  try {
    const { email, role, oldPassword, newPassword } = req.body;
    const modelToUse = role === 'User' ? User : Doctor;
    const data = await modelToUse.findOne({ email });
    if (!data) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    if (!(await bcrypt.compare(oldPassword, data.password))) {
      const err = new Error('Wrong password');
      err.statusCode = 403;
      throw err;
    }
    data.password = newPassword;
    await data.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function authenticateCookie(req, res, next) {
  try {
    const accessToken = req.cookies['accessToken'];
    const role = req.cookies['role'];
    if (!accessToken || !role) {
      const err = new Error('Unauthorized action');
      err.statusCode = 401;
      throw err;
    }
    const { secret, model } = role === 'User' ? { secret: envConfig.AUTH.USER_SECRET, model: User }
      : role === 'Doctor' ? { secret: envConfig.AUTH.DOCTOR_SECRET, model: Doctor }
        : { secret: envConfig.AUTH.ADMIN_SECRET, model: Admin };
    const cookieData = await verifyAuthHttpCookie(accessToken, role, secret, model, next);

    if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
      res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
      res.cookie('role', role, cookieData.tokenCookieOptions);
    }
    cookieData.data.password = null;
    res.status(200).json({ data: cookieData.data, role: role });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


module.exports = {
  verifyToken,
  logout,
  verifyBeforeForgetPassword,
  prepareBodyBeforeTokenRegen,
  updatePassword,
  authenticateCookie
}
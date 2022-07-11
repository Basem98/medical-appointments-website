const Doctor = require('../model/doctor.model');
const User = require('../model/user.model');
const Admin = require('../model/admin.model');
const Token = require('../model/token.model');

const customErr = {msg: ''};
customErr.toString = function() {return this.msg}

async function verifyToken(req, res, next) {
  try {
    const tokenData = await Token.findOne({token: req.query.token, userId: req.query.id});
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
    res.status(200).json({message: 'Email verified successfully'});
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}


module.exports = {
  verifyToken
}
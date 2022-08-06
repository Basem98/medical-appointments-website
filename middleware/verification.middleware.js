const Token = require('../model/token.model');
const envConfig = require('../config/envConfig');

async function generateVerificationToken(req, res, next) {
  try {
    const tokenData = new Token({ userId: req.body.id, userRole: req.body.role });
    await tokenData.save();
    req.body.token = tokenData.token;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function genSignUpEmailBody(req, res, next) {
  try {
    req.emailText = `
Hello ${req.body.firstName},

You registered an account on MAW! We'd like to welcome you on our platform! Before being able to use your account you need to verify that this is your email address by going to this link: ${envConfig.APP.BASE_URL}/verify/${req.body.token}
Kind Regards, MAW`;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function genForgetPassEmailBody(req, res, next) {
  try {
    req.emailText = `
Hello ${req.body.firstName},

You are requesting to change your password! For your protection, we just need you to verify that this is your email by going to this link: ${envConfig.APP.ALLOWED_ORIGIN}/forgotpassword/${req.body.token}
Kind Regards, MAW`;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

module.exports = {
  generateVerificationToken,
  genSignUpEmailBody,
  genForgetPassEmailBody
}
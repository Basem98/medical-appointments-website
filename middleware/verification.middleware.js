const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../config/envConfig');
const Token = require('../model/token.model');


function sendVerificationEmail(email, firstName, id, token) {
  const emailTransporter = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    service: config.EMAIL.SERVICE,
    secure: false,
    auth: {
      user: config.EMAIL.USER,
      pass: config.EMAIL.PASS
    },
    tls: {
      rejectUnauthorized: false,
      requestCert: false
    }
  });

  return emailTransporter.sendMail({
    from: `${config.EMAIL.USER}@yahoo.com`,
    to: email,
    subject: `Email verification for your MAW account`,
    text: `
Hello ${firstName},

You registered an account on MAW! We'd like to welcome you on our platform! Before being able to use your account you need to verify that this is your email address by clicking here: ${config.APP.BASE_URL}/verify?id=${id}&token=${token}

Kind Regards, MAW`
  });
}

function genVerificationToken(id, role) {
  const tokenData = new Token({
    userId: id,
    userRole: role
  });
  return tokenData.save();
}

async function verifyEmail(req, res, next) {
  try {
    const tokenData = await genVerificationToken(req.body.id, req.body.role);
    if (!tokenData)
      throw new Error("Couldn't generate verification token");

    sendVerificationEmail(req.body.email, req.body.firstName, req.body.id, tokenData.token);
    res.status(201).json({ message: 'Document added to database successfully. Check email for verification' });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}

module.exports = {
  verifyEmail
}
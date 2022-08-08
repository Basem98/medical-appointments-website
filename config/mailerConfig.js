const nodemailer = require('nodemailer');
const config = require('./envConfig');

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

module.exports = { emailTransporter };
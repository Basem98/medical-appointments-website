const envConfig = require('../../config/envConfig');
const { emailTransporter } = require('../../config/mailerConfig');

/**
 * This function depends on the data passed from the middleware through the req object.
 * There must be a req.body object with the user data, including the id,
 * and most importantly, a req.emailText object that has the email's body to send
 */
async function sendMail(req, res, next) {
  try {
    const emailBody = {
      from: `${envConfig.EMAIL.USER}@${envConfig.EMAIL.AT}`,
      to: req.body.email,
      subject: 'Email verification for your MAW account',
      text: req.emailText
    }
    emailTransporter.sendMail(emailBody);
    res.status(200).json({ message: 'An email has been sent to the user\'s email', id: req.body.id });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function sendUserEmail(req, res, next) {
  try {
    const emailBody = {
      from: `${envConfig.EMAIL.USER}@${envConfig.EMAIL.AT}`,
      to: 'basem.mostafa98@hotmail.com',
      subject: req.body.subject,
      text: `
An email from ${req.body.username},
${req.body.emailText}


Sender email: ${req.body.email}
`
    }
    emailTransporter.sendMail(emailBody);
    res.status(200).json({ message: 'An email has been sent to our customer support email'});
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

module.exports = {
  sendMail,
  sendUserEmail
}
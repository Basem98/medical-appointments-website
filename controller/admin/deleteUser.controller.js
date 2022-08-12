const { emailTransporter } = require('../../config/mailerConfig');
const User = require('../../model/user.model');
const envConfig = require('../../config/envConfig');

const deleteUser = async (req, res, next) => {
  try {
    const userData = await User.findById(req.params.id);
    const emailText = `
Hello, ${userData.firstName} ${userData.lastName},
We're sad to inform you that your data has been deleted from our database. You can try to join the platform by registering a new account, as long as you are not banned.
Kind regards, MAW.
    `;
    const emailBody = {
      from: `${envConfig.EMAIL.USER}@${envConfig.EMAIL.AT}`,
      to: userData.email,
      subject: 'Email verification for your MAW account',
      text: emailText
    }
    emailTransporter.sendMail(emailBody);
    const deleteUser = await User.deleteOne({ _id: req.params.id });
    console.log(deleteUser)
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = deleteUser;
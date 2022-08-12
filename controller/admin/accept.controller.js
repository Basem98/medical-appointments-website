const { emailTransporter } = require('../../config/mailerConfig');
const Doctor = require('../../model/doctor.model');
const envConfig = require('../../config/envConfig');


const acceptDoctorsApplication = async (req, res, next) => {
  try {
    const doctorData = await Doctor.findById(req.params.id);
    if (!doctorData) {
      const err = new Error('Doctor not found');
      err.statusCode = 404;
      throw err;
    }
    doctorData.isAccepted = true;
    const emailText = `
Hello, Dr. ${doctorData.firstName} ${doctorData.lastName},
We are glad to inform you that your application to join MAW has been accepted! Congratulations, now you can use your account to add appointments so that users can book appointments with you.
Kind regards, MAW.
`;
    const emailBody = {
      from: `${envConfig.EMAIL.USER}@${envConfig.EMAIL.AT}`,
      to: doctorData.email,
      subject: 'Email verification for your MAW account',
      text: emailText
    }
    emailTransporter.sendMail(emailBody);
    await doctorData.save();
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = acceptDoctorsApplication;
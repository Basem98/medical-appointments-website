const { emailTransporter } = require('../../config/mailerConfig');
const Doctor = require('../../model/doctor.model');
const envConfig = require('../../config/envConfig');

const deleteDoctor = async (req, res, next) => {
  try {
    const doctorData = await Doctor.findById(req.params.id);
    const emailText = `
Hello, Dr. ${doctorData.firstName} ${doctorData.lastName},
We're sad to inform you that your application to join MAW as a doctor has been rejected, and your data has been deleted from our database. You can try to join the platform by submitting a new application.
Kind regards, MAW.
    `;
    const emailBody = {
      from: `${envConfig.EMAIL.USER}@${envConfig.EMAIL.AT}`,
      to: doctorData.email,
      subject: 'Email verification for your MAW account',
      text: emailText
    }
    emailTransporter.sendMail(emailBody);
    const deleteDoctor = await Doctor.deleteOne({ _id: req.params.id });
    console.log(deleteDoctor)
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = deleteDoctor;
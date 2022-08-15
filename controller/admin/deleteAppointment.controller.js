const Appointment = require('../../model/appointment.model');
const Doctor = require('../../model/doctor.model');
const User = require('../../model/user.model');


const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      const err = new Error('Appointment not found');
      err.statusCode = 404;
      throw err;
    }
    if (appointment.user) {
      const user = await User.findById(appointment.user);
      user.appointments = user.appointments.filter(appId => String(appId).toString() !== id);
      await user.save();
    }
    const doctor = await Doctor.findById(appointment.doctor);
    doctor.appointments = doctor.appointments.filter(app => String(app._id).toString() !== id);
    await doctor.save();

    await appointment.deleteOne({ _id: id });
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = deleteAppointment;
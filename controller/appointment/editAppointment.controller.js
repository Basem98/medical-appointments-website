const Appointment = require('../../model/appointment.model');
const Doctor = require('../../model/doctor.model');

const editAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      const err = new Error('Appointment not found');
      err.statusCode = 404;
      throw err;
    }
    if (appointment.doctor.toString() != req.body.id.toString()) {
      console.log(appointment.doctor, req.body.id)
      const err = new Error("You don't have access to edit this appointment.");
      err.statusCode = 401;
      throw err;
    }
    if (appointment.state !== 'booked') {
      appointment.date = req.body.date ? new Date(req.body.date) : appointment.date;
      appointment.time.hour = req.body.time?.hour ? req.body.time?.hour : appointment.time.hour;
      appointment.time.minute = req.body.time?.minute ? req.body.time?.minute : appointment.time.minute;
      appointment.time.duration = req.body.time?.duration ? req.body.time?.duration : appointment.time.duration;
    }
    appointment.info.prescription = req.body.info?.prescription ? [...appointment.info.prescription, ...req.body.info?.prescription] : appointment.info.prescription;
    appointment.info.diagnosis = req.body.info?.diagnosis ? req.body.info?.diagnosis : appointment.info.diagnosis;
    appointment.state = req.body.state && req.body.state !== 'booked' ? req.body.state : appointment.state;
    const doctor = await Doctor.findById(appointment.doctor);
    doctor.appointments = doctor.appointments.map(appointmentObject => {
      let newAppointment = { ...appointmentObject };
      if (appointmentObject._id.toString() == appointment._id.toString()) {
        newAppointment.date = appointment.date;
      }
      return newAppointment;
    })
    await appointment.save();
    await doctor.save();
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = { editAppointment };
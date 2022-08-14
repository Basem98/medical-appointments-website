const Appointment = require('../../model/appointment.model');


const getAllAppointments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const appointments = await Appointment
    .find()
    .sort({date: 1})
    .skip(page * limit)
    .limit(limit)
    .populate('user', '-password')
    .populate('doctor', '-password');
    
    if (!appointments || appointments.length < 1) {
      const err = new Error('No appointments found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: appointments });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getAllAppointments;
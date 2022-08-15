const Appointments = require('../../model/appointment.model');


const getPreviousAppointments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const previousAppointments = await Appointments
      .find({ date: { $lt: new Date() } })
      .sort({ date: 1 })
      .skip(page * limit)
      .limit(limit);
    if (previousAppointments.length < 1) {
      const err = new Error('No previous appointments found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: previousAppointments });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


module.exports = getPreviousAppointments;
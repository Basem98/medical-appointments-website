const Appointments = require('../../model/appointment.model');


const getUpcomingAppointments = async (req, res, next) => {
  try {
    const upcomingAppointments = await Appointments.find({ date: { $gte: new Date() } });
    if (upcomingAppointments.length < 1) {
      const err = new Error('No upcoming appointments found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: upcomingAppointments });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


module.exports = getUpcomingAppointments;
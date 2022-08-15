const Appointments = require('../../model/appointment.model');


const getAppointmentStatistics = async (req, res, next) => {
  try {
    const statistics = {
      numberOfAppointments: await Appointments.find().count(),
      numberOfAvailableAppointments: await Appointments.find({ state: 'available' }).count(),
      numberOfBookedAppointments: await Appointments.find({ state: 'booked' }).count(),
      numberOfFinishedAppointments: await Appointments.find({ state: 'finished' }).count(),
      numberOfCanceledAppointments: await Appointments.find({ state: 'canceled' }).count()
    }
    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getAppointmentStatistics;
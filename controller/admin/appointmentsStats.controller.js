const Appointments = require('../../model/appointment.model');


const getAppointmentStatistics = async (req, res, next) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    dateFrom = isNaN(new Date(dateFrom)) ?
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 5) : new Date(dateFrom);
    dateTo = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 7);

    const statistics = {
      numberOfAppointments: await Appointments.find({ date: { $gte: dateFrom, $lt: dateTo } }).count(),
      numberOfAvailableAppointments: await Appointments.find(
        { state: 'available', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      numberOfBookedAppointments: await Appointments.find(
        { state: 'booked', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      numberOfFinishedAppointments: await Appointments.find(
        { state: 'finished', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      numberOfCanceledAppointments: await Appointments.find(
        { state: 'canceled', date: { $gte: dateFrom, $lt: dateTo } }).count()
    }
    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getAppointmentStatistics;
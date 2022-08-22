const Appointments = require('../../model/appointment.model');
const doctorModel = require('../../model/doctor.model');

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']


const getAppointmentStatistics = async (req, res, next) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    dateFrom = isNaN(new Date(dateFrom)) ?
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 6) : new Date(dateFrom);
    dateTo = isNaN(new Date(dateTo)) ? new Date(3000, 11, 30) : new Date(dateTo);

    const statistics = {
      available: await Appointments.find(
        { state: 'available', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      booked: await Appointments.find(
        { state: 'booked', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      finished: await Appointments.find(
        { state: 'finished', date: { $gte: dateFrom, $lt: dateTo } }).count(),
      canceled: await Appointments.find(
        { state: 'canceled', date: { $gte: dateFrom, $lt: dateTo } }).count()
    }
    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


const getAppointmentsNumPerDay = async (req, res, next) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    dateFrom = isNaN(new Date(dateFrom)) ?
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 6) : new Date(dateFrom);

    let statistics = {};
    for (let i = 0; i < 7; i++) {
      statistics[`${weekDays[dateFrom.getDay()]}`]
        = await Appointments.find({
          date: {
            $gte: dateFrom,
            $lt: new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 1)
          }
        }).count();
      dateFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 1);
    }
    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


const getAppointmentsCostPerDay = async (req, res, next) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    dateFrom = isNaN(new Date(dateFrom)) ?
      new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate()) - 6) : new Date(dateFrom);
    dateTo = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 7);

    const result = await Appointments.aggregate([
      {
        $match: {
          date: {
            $gte: dateFrom,
            $lt: dateTo,
          },
          state: 'finished'
        },
      },
      {
        $lookup: {
          from: doctorModel.collection.name,
          localField: 'doctor',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      {
        $unwind: '$doctor'
      },
      {
        $unwind: '$doctor.clinics'
      },
      {
        $group: {
          _id: '$date',
          income: { $sum: "$doctor.clinics.fees" }
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $addFields: {
          dayOfWeek: { $dayOfWeek: '$_id' }
        }
      }
    ]);

    let statistics = {};

    for (let i = 0; i < 7; i++) {
      let indexOfIncome;
      statistics[`${weekDays[dateFrom.getDay()]}`] = result.some((dateObj, index) => {
        let res = dateObj.dayOfWeek - 1 === dateFrom.getDay();
        if (res) {
          indexOfIncome = index;
        }
        return res;
      }) ? result[indexOfIncome].income : 0;
      dateFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 1);
    }
    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = {
  getAppointmentStatistics,
  getAppointmentsNumPerDay,
  getAppointmentsCostPerDay
};
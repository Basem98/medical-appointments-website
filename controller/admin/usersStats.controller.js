const User = require('../../model/user.model');
const Doctor = require('../../model/doctor.model');


const getUserStatistics = async (req, res, next) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    dateFrom = isNaN(new Date(dateFrom)) ? new Date(1970, 0, 01) : new Date(dateFrom);
    dateTo = isNaN(new Date(dateTo)) ? new Date(3000, 0, 01) : new Date(dateTo);

    const statistics = {
      doctors: await Doctor.find({ createdAt: { $gte: dateFrom, $lt: dateTo } }).count(),
      users: await User.find({ createdAt: { $gte: dateFrom, $lt: dateTo } }).count()
    }

    res.status(200).json({ data: statistics });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getUserStatistics;
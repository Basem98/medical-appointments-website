const Doctor = require('../../model/doctor.model');


const getTopRated = async (req, res, next) => {
  try {
    const topRatedDoctors = await Doctor.aggregate([
      {
        $project: { password: 0 }
      },
      {
        $sort: { rating: -1 }
      },
      {
        $limit: 3
      }
    ]);
    if (topRatedDoctors.length < 1) {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: topRatedDoctors });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = getTopRated;
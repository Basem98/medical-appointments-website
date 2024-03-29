const Doctor = require('../../model/doctor.model');


const getAllDoctors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const doctors = await Doctor.aggregate([
      {
        $project: { password: 0 }
      },
      {
        $sort: {
          rating: -1,
          _id: 1
        }
      },
      {
        $skip: page * limit
      },
      {
        $limit: limit
      }
    ]);

    if (doctors.length < 1) {
      const err = new Error('No doctors found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: doctors });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getAllDoctors;
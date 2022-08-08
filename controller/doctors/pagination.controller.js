const Doctor = require('../../model/doctor.model');

const getDoctorsByPage = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;
    let { specialization, governorate, dateFrom, dateTo, feesFrom, feesTo } = req.query;

    let filteringStage = [];
    if (specialization) {
      const filter = { $match: { specialization } };
      filteringStage.push(filter);
    }
    if (governorate) {
      const filter = { $match: { 'clinics.address.governorate': governorate } };
      filteringStage.push(filter);
    }
    if (dateFrom || dateTo) {
      const filter = { $match: { 'appointments.date': {} } };
      dateFrom = isNaN(new Date(dateFrom)) ? new Date(1970, 0, 01) : new Date(dateFrom);
      dateTo = isNaN(new Date(dateTo)) ? new Date(3000, 0, 01) : new Date(dateTo);
      if (dateFrom) filter.$match['appointments.date'].$gte = dateFrom;
      if (dateTo) filter.$match['appointments.date'].$lt = new Date(dateTo);
      filteringStage.push(filter);
    }
    if (feesFrom || feesTo) {
      const filter = { $match: { 'clinics.fees': {} } };
      if (feesFrom) filter.$match['clinics.fees'].$gte = parseInt(feesFrom) || 0;
      if (feesTo) filter.$match['clinics.fees'].$lt = parseInt(feesTo) || 100000;
      filteringStage.push(filter);
    }

    const doctors = await Doctor.aggregate([
      // 1. Don't send the professionalLicense image source along with the data
      {
        $project: { professionalLicense: 0, password: 0 },
      },
      // 2. Filter out documents based on the recieved query strings
      ...filteringStage,
      // 3. Sort the documents descendingly by the rating field
      {
        $sort: { rating: -1 }
      },
      // 4. Set the offset to the product of the page number and the limit
      {
        $skip: page * limit
      },
      // 5. Limit the number of returned documents based on the recieved limit query string
      {
        $limit: limit
      }
    ]);
    if (doctors.length > 0) {
      res.status(200).json({ doctors });
    } else {
      let pageNotFound = new Error("Page not found");
      pageNotFound.statusCode = 404;
      throw pageNotFound;
    }
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = getDoctorsByPage;
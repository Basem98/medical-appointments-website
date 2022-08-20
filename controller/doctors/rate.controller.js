const Doctor = require('../../model/doctor.model');


const calculateRating = async (req, res, next) => {
  try {
    const rating = parseFloat(req.body.rating);
    if (!rating || rating > 5) {
      const err = new Error('Invalid rating values');
      err.statusCode = 400;
      throw err;
    }
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      const err = new Error('Doctor not found');
      err.statusCode = 404;
      throw err;
    }
    /* Get the original sum of ratings */
    const originalRatingSum = doctor.rating * doctor.raters;
    /* Calculate the new average rating (the sum of ratings / the new number of raters) */
    doctor.raters += 1;
    doctor.rating = (originalRatingSum + rating) / (doctor.raters);
    await doctor.save();
    res.status(200).json({ rating: doctor.rating });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


module.exports = calculateRating;
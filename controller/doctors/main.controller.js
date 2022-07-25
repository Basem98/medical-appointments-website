const { default: mongoose } = require('mongoose');
const Doctor = require('../../model/doctor.model');


async function signUp(req, res, next) {
  try {
    const newDoctor = new Doctor(req.body);
    if (!newDoctor) {
      throw new Error('Failed to create a new document');
    }
    await newDoctor.save();
    req.body.id = newDoctor._id;
    req.body.role = 'Doctor';
    next();
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}


const getDoctorById = async (req, res, next) => {
  let doctorId = req.params.id;
  if (!mongoose.isValidObjectId(doctorId)) {
    return res.status(404).json({ message: 'Doctor is Not Found' });
  }
  await Doctor.findOne({ _id: doctorId })
    .then((data) => {
      if (data) {
        // Execluding password from the retrieved data
        data.password = undefined;
        return res.status(200).json({ message: data })
      }
      return res.status(404).json({ message: 'Doctor is Not Found' });
    })
    .catch(error => {
      console.log(error);
      error.statusCode = 500;
      next(error);
    })
}



module.exports = {
  signUp,
  getDoctorById,
}
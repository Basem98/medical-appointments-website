const { mongoose } = require('mongoose');
const Doctor = require('../../model/doctor.model');

const getDoctorById = async (req, res, next) => {
    let doctorId = req.params.id;
    if (!mongoose.isValidObjectId(doctorId)) {
        return res.status(404).json({ message: 'Doctor is Not Found' });
    }
    await Doctor.findOne({ _id: doctorId })
        .populate('appointments')
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

module.exports = getDoctorById;


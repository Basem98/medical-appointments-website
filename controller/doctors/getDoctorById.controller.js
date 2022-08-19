const mongoose = require('mongoose');
const Doctor = require('../../model/doctor.model');
const Appointment = require('../../model/appointment.model')

const getDoctorById = async (req, res, next) => {
    let doctorId = req.params.id;
    if (!mongoose.isValidObjectId(doctorId)) {
        return res.status(404).json({ message: 'Doctor is Not Found' });
    }
    await Doctor
        .aggregate([
            // 1. Only get doctors who have verified their email and been reviewed & accepted
            {
                $match: { _id: mongoose.Types.ObjectId(doctorId) }
            },
            // 2. Don't send the professionalLicense image source along with the data
            {
                $project: { professionalLicense: 0, password: 0 },
            },
            // 7. Populate the appointments array
            {
                $lookup: {
                    from: Appointment.collection.name,
                    as: 'appointments',
                    localField: 'appointments._id',
                    foreignField: '_id'
                }
            },
            // 8. Filter the appointments by their state (Use $addFields instead of $project to keep the other properties)
            {
                $addFields: {
                    'appointments':
                    {
                        $filter: {
                            input: '$appointments',
                            as: 'appointment',
                            cond: { $eq: ['$$appointment.state', 'available'] }
                        }
                    }
                }
            }
        ])
        .then((data) => {
            if (data) {
                // Execluding password from the retrieved data
                return res.status(200).json({ message: data[0] })
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


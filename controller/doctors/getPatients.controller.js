const Doctor = require('../../model/doctor.model');
const mongoose = require("mongoose");

const getPatients = async (req, res, next) => {
    const doctorId = req.doctor._id;
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'Doctor is Not Found' });
    }
    if (req.params.id.toString() != doctorId) {
        return res.status(401).json({ message: 'Unauthorized to get patients' });
    }
    try {
        console.log(req.params.id)
        const appointments = await Doctor.aggregate([
            {
                $match: { _id: doctorId }
            },
            {
                $lookup: {
                    from: 'appointments',
                    localField: 'appointments._id',
                    foreignField: '_id',
                    as: 'appointments'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField:'appointments.user',
                    foreignField: '_id',
                    as: 'patients'
                }
            },
            {
                $project: {
                    patients: 1
                }
            }
        ]);
        if (!appointments) {
            throw new Error('Doctor is not found');
        }
        return res.status(200).json({ message: appointments });
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }

}

module.exports = getPatients;
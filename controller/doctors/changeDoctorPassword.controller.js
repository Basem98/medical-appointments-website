const mongoose = require("mongoose");
const Docotor = require("../../model/doctor.model");
const bcrypt = require("bcrypt");

const changeDoctorPassword = async (req, res, next) => {
    const doctorId = req.doctor._id;
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'Doctor is Not Found' });
    }
    if (req.params.id.toString() != doctorId) {
        return res.status(401).json({ message: 'Unauthorized to change password' });
    }
    try {
        let doctorPassword = await Docotor.findById(doctorId, { password: 1 });
        bcrypt.compare(req.body.currentPassword, doctorPassword.password)
            .then(async (isCorrectPassword) => {
                if (!isCorrectPassword) {
                    return res.status(401).json({ message: 'Wrong password' });
                }
                doctorPassword.password = req.body.password;
                await doctorPassword.save();
                return res.status(200).json({ message: 'Password changed successfully!' });
            })
            .catch((error) => {
                error.statusCode = 500;
                next(error)
            })

    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}

module.exports = changeDoctorPassword;
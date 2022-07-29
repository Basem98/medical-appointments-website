const Appointment = require('../../model/appointment.model');
const User = require('../../model/user.model');
const Doctor = require('../../model/doctor.model');

const addAppointment = (req, res, next) => {
    let newAppointment = new Appointment(req.body);
    newAppointment.save()
        .then((response) => {
            let userId = response.time.userId;
            let doctorId = response.time.doctorId;

            User.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } })
                .then()
                .catch((error) => {
                    error.statusCode = 500;
                    next(error);
                });

            Doctor.findByIdAndUpdate(doctorId, { $push: { appointments: newAppointment._id } })
            .then()
            .catch((error) => {
                error.statusCode = 500;
                next(error);
            })

            return res.status(201).json({ message: `Appointment Saved Successfully at ${response.date}` })
        })
        .catch(error => {
            error.statusCode = 500;
            next(error);
        })
}

module.exports = { addAppointment }
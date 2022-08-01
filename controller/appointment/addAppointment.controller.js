const Appointment = require('../../model/appointment.model');
const User = require('../../model/user.model');
const Doctor = require('../../model/doctor.model');

const addAppointment = (req, res, next) => {
    if(req.body.role === 'user') {
        req.body.user = req.body.id;
    } else if (req.body.role === 'doctor') {
        req.body.doctor = req.body.id;
    }
    let newAppointment = new Appointment(req.body);

    newAppointment.save()
        .then((response) => {
            let user = response.user;
            let doctor = response.doctor;

            User.findByIdAndUpdate(user, { $push: { appointments: newAppointment._id } })
                .then()
                .catch((error) => {
                    error.statusCode = 500;
                    next(error);
                });

            Doctor.findByIdAndUpdate(doctor, { $push: { appointments: newAppointment._id } })
            .then()
            .catch((error) => {
                error.statusCode = 500;
                next(error);
            })

            return res.status(201).json({ message: `Appointment Saved Successfully at ${response.date}`, data: newAppointment})
        })
        .catch(error => {
            error.statusCode = 500;
            next(error);
        })
}

module.exports = { addAppointment }
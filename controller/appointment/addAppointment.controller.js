const Appointment = require('../../model/appointment.model');
const User = require('../../model/user.model');
const Doctor = require('../../model/doctor.model');

const addAppointment = async (req, res, next) => {
    try {
        const data = req.body;
        let newAppointment = new Appointment(data);
        let doctor = newAppointment.doctor;
        let doctorData = await Doctor.findById(doctor);
        const appointmentRef = { _id: newAppointment._id, date: newAppointment.date };
        doctorData.appointments.push(appointmentRef);
        await newAppointment.save();
        await doctorData.save();
        return res.status(201).json({ message: `Appointment Saved Successfully at ${newAppointment.date}`, data: newAppointment })
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
}

module.exports = { addAppointment }